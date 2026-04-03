import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';

const STRIPE_ACCOUNT_ID = 'STRIPE_ACCOUNT_ID';
const stripePromise = STRIPE_ACCOUNT_ID && STRIPE_ACCOUNT_ID !== 'STRIPE_ACCOUNT_ID'
  ? loadStripe('pk_live_51OJhJBHdGQpsHqInIzu7c6PzGPSH0yImD4xfpofvxvFZs0VFhPRXZCyEgYkkhOtBOXFWvssYASs851mflwQvjnrl00T6DbUwWZ', { stripeAccount: STRIPE_ACCOUNT_ID })
  : null;

const SHIPPING_RULES = "Free shipping on all orders";
const PROJECT_ID = 'ukbflmuelwzsffijwqcr';

function PaymentForm({ onSuccess }: { onSuccess: (pi: any) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');

    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (submitError) {
      setError(submitError.message || 'Payment failed');
      setLoading(false);
    } else if (paymentIntent?.status === 'succeeded') {
      onSuccess(paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full mt-6 py-4 bg-[#C4935A] hover:bg-[#B38349] text-white font-semibold tracking-wide rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Processing Payment...
          </>
        ) : (
          'Complete Purchase'
        )}
      </button>
    </form>
  );
}

type ShippingAddress = {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME',
  'MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI',
  'SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [clientSecret, setClientSecret] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [tax, setTax] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '', email: '', address: '', city: '', state: '', zip: '', country: 'US',
  });
  const [errors, setErrors] = useState<Partial<ShippingAddress>>({});

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && step === 'shipping') {
      navigate('/');
    }
  }, [items, navigate, step]);

  const total = subtotal + shippingCost + tax;

  const validateShipping = (): boolean => {
    const e: Partial<ShippingAddress> = {};
    if (!shippingAddress.name.trim()) e.name = 'Required';
    if (!shippingAddress.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingAddress.email)) e.email = 'Invalid email';
    if (!shippingAddress.address.trim()) e.address = 'Required';
    if (!shippingAddress.city.trim()) e.city = 'Required';
    if (!shippingAddress.state.trim()) e.state = 'Required';
    if (!shippingAddress.zip.trim()) e.zip = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const calculateTax = async (state: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('calculate-tax', {
        body: { state, subtotal },
      });
      if (data?.success) {
        setTax(data.taxCents);
        setTaxRate(data.taxRate);
      }
    } catch (err) {
      console.error('Tax calc error:', err);
    }
  };

  const handleStateChange = (state: string) => {
    setShippingAddress(prev => ({ ...prev, state }));
    if (state) calculateTax(state);
  };

  const handleContinueToPayment = async () => {
    if (!validateShipping()) return;

    // Calculate shipping
    try {
      const { data } = await supabase.functions.invoke('calculate-shipping', {
        body: {
          cartItems: items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
          shippingRules: SHIPPING_RULES,
          subtotal,
        },
      });
      if (data?.success) setShippingCost(data.shippingCents);
    } catch (err) {
      console.error('Shipping calc error:', err);
    }

    // Ensure tax is calculated
    if (!tax && shippingAddress.state) {
      await calculateTax(shippingAddress.state);
    }

    // Create payment intent
    const orderTotal = subtotal + shippingCost + tax;
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: { amount: orderTotal > 0 ? orderTotal : subtotal, currency: 'usd' },
      });
      if (error) {
        setPaymentError('Unable to initialize payment. Please try again.');
        setStep('payment');
        return;
      }
      if (data?.clientSecret) {
        setClientSecret(data.clientSecret);
        setStep('payment');
      } else {
        setPaymentError('Unable to initialize payment. Please try again.');
        setStep('payment');
      }
    } catch (err) {
      setPaymentError('Unable to initialize payment. Please try again.');
      setStep('payment');
    }
  };

  const handlePaymentSuccess = async (paymentIntent: any) => {
    try {
      // Create or find customer
      const { data: customer } = await supabase
        .from('ecom_customers')
        .upsert({ email: shippingAddress.email, name: shippingAddress.name }, { onConflict: 'email' })
        .select('id')
        .single();

      // Create order
      const { data: order } = await supabase
        .from('ecom_orders')
        .insert({
          customer_id: customer?.id,
          status: 'paid',
          subtotal,
          tax,
          shipping: shippingCost,
          total,
          shipping_address: shippingAddress,
          stripe_payment_intent_id: paymentIntent.id,
        })
        .select('id')
        .single();

      if (order) {
        const orderItems = items.map(item => ({
          order_id: order.id,
          product_id: item.product_id,
          variant_id: item.variant_id || null,
          product_name: item.name,
          variant_title: item.variant_title || null,
          sku: item.sku || null,
          quantity: item.quantity,
          unit_price: item.price,
          total: item.price * item.quantity,
        }));
        await supabase.from('ecom_order_items').insert(orderItems);

        // Send confirmation email
        try {
          const { data: orderItemsData } = await supabase
            .from('ecom_order_items')
            .select('*')
            .eq('order_id', order.id);

          await fetch(`https://famous.ai/api/ecommerce/${PROJECT_ID}/send-confirmation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: order.id,
              customerEmail: shippingAddress.email,
              customerName: shippingAddress.name,
              orderItems: orderItemsData || orderItems,
              subtotal,
              shipping: shippingCost,
              tax,
              total,
              shippingAddress,
            }),
          });
        } catch (emailErr) {
          console.error('Email send error:', emailErr);
        }

        clearCart();
        navigate(`/order-confirmation?orderId=${order.id}`);
      }
    } catch (err) {
      console.error('Order creation error:', err);
      clearCart();
      navigate('/order-confirmation');
    }
  };

  const handleFieldChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  if (items.length === 0 && step === 'shipping') return null;

  return (
    <div className="min-h-screen bg-[#f9f6f2] dark:bg-[#111] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link to="/" className="text-[#C4935A] hover:text-[#B38349] text-sm font-medium flex items-center gap-1 mb-2 transition-colors">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Store
            </Link>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2C2C] dark:text-white">Checkout</h1>
          </div>
          {/* Steps */}
          <div className="hidden sm:flex items-center gap-3">
            <div className={`flex items-center gap-2 text-sm font-medium ${step === 'shipping' ? 'text-[#C4935A]' : 'text-[#2C2C2C]/40 dark:text-white/40'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 'shipping' ? 'bg-[#C4935A] text-white' : 'bg-[#C4935A]/20 text-[#C4935A]'}`}>1</span>
              Shipping
            </div>
            <div className="w-8 h-px bg-[#C4935A]/20" />
            <div className={`flex items-center gap-2 text-sm font-medium ${step === 'payment' ? 'text-[#C4935A]' : 'text-[#2C2C2C]/40 dark:text-white/40'}`}>
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step === 'payment' ? 'bg-[#C4935A] text-white' : 'bg-[#C4935A]/10 text-[#C4935A]/50'}`}>2</span>
              Payment
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Main Form */}
          <div className="lg:col-span-3">
            {step === 'shipping' ? (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg shadow-black/5 p-6 md:p-8">
                <h2 className="font-serif text-xl font-bold text-[#2C2C2C] dark:text-white mb-6">Shipping Information</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] dark:text-white mb-1.5">Full Name</label>
                      <input type="text" value={shippingAddress.name} onChange={(e) => handleFieldChange('name', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border bg-transparent text-[#2C2C2C] dark:text-white placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-1 text-sm ${errors.name ? 'border-red-400 focus:ring-red-400/30' : 'border-[#C4935A]/20 focus:border-[#C4935A] focus:ring-[#C4935A]/30'}`}
                        placeholder="John Doe" />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] dark:text-white mb-1.5">Email Address</label>
                      <input type="email" value={shippingAddress.email} onChange={(e) => handleFieldChange('email', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border bg-transparent text-[#2C2C2C] dark:text-white placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-1 text-sm ${errors.email ? 'border-red-400 focus:ring-red-400/30' : 'border-[#C4935A]/20 focus:border-[#C4935A] focus:ring-[#C4935A]/30'}`}
                        placeholder="john@example.com" />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2C2C2C] dark:text-white mb-1.5">Street Address</label>
                    <input type="text" value={shippingAddress.address} onChange={(e) => handleFieldChange('address', e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border bg-transparent text-[#2C2C2C] dark:text-white placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-1 text-sm ${errors.address ? 'border-red-400 focus:ring-red-400/30' : 'border-[#C4935A]/20 focus:border-[#C4935A] focus:ring-[#C4935A]/30'}`}
                      placeholder="123 Main Street" />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] dark:text-white mb-1.5">City</label>
                      <input type="text" value={shippingAddress.city} onChange={(e) => handleFieldChange('city', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border bg-transparent text-[#2C2C2C] dark:text-white placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-1 text-sm ${errors.city ? 'border-red-400 focus:ring-red-400/30' : 'border-[#C4935A]/20 focus:border-[#C4935A] focus:ring-[#C4935A]/30'}`}
                        placeholder="New York" />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] dark:text-white mb-1.5">State</label>
                      <select value={shippingAddress.state} onChange={(e) => handleStateChange(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border bg-transparent text-[#2C2C2C] dark:text-white focus:outline-none focus:ring-1 text-sm ${errors.state ? 'border-red-400 focus:ring-red-400/30' : 'border-[#C4935A]/20 focus:border-[#C4935A] focus:ring-[#C4935A]/30'}`}>
                        <option value="">Select</option>
                        {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2C2C2C] dark:text-white mb-1.5">ZIP Code</label>
                      <input type="text" value={shippingAddress.zip} onChange={(e) => handleFieldChange('zip', e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border bg-transparent text-[#2C2C2C] dark:text-white placeholder:text-[#2C2C2C]/40 focus:outline-none focus:ring-1 text-sm ${errors.zip ? 'border-red-400 focus:ring-red-400/30' : 'border-[#C4935A]/20 focus:border-[#C4935A] focus:ring-[#C4935A]/30'}`}
                        placeholder="10001" />
                      {errors.zip && <p className="text-red-500 text-xs mt-1">{errors.zip}</p>}
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleContinueToPayment}
                  className="w-full mt-8 py-4 bg-[#C4935A] hover:bg-[#B38349] text-white font-semibold tracking-wide rounded-lg transition-all hover:shadow-lg hover:shadow-[#C4935A]/25 flex items-center justify-center gap-2"
                >
                  Continue to Payment
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ) : (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg shadow-black/5 p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-xl font-bold text-[#2C2C2C] dark:text-white">Payment</h2>
                  <button onClick={() => setStep('shipping')} className="text-[#C4935A] hover:text-[#B38349] text-sm font-medium flex items-center gap-1 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Edit Shipping
                  </button>
                </div>

                {/* Shipping summary */}
                <div className="mb-6 p-4 rounded-lg bg-[#f9f6f2] dark:bg-white/5 text-sm">
                  <p className="font-medium text-[#2C2C2C] dark:text-white">{shippingAddress.name}</p>
                  <p className="text-[#2C2C2C]/60 dark:text-white/60">{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}</p>
                  <p className="text-[#2C2C2C]/60 dark:text-white/60">{shippingAddress.email}</p>
                </div>

                {/* Stripe Payment */}
                {!stripePromise ? (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-5 rounded-xl">
                    <div className="flex items-start gap-3">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-600 flex-shrink-0 mt-0.5">
                        <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
                      </svg>
                      <div>
                        <p className="font-medium text-amber-800 dark:text-amber-200">Payment processing is being set up</p>
                        <p className="text-sm text-amber-700/70 dark:text-amber-300/70 mt-1">Our payment system is currently being configured. Please check back shortly.</p>
                      </div>
                    </div>
                  </div>
                ) : paymentError ? (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-5 rounded-xl">
                    <p className="text-red-800 dark:text-red-200 font-medium">{paymentError}</p>
                    <button onClick={() => { setStep('shipping'); setPaymentError(''); }} className="mt-2 text-red-600 text-sm underline">Try again</button>
                  </div>
                ) : clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe', variables: { colorPrimary: '#C4935A' } } }}>
                    <PaymentForm onSuccess={handlePaymentSuccess} />
                  </Elements>
                ) : (
                  <div className="flex items-center justify-center py-12">
                    <svg className="animate-spin h-8 w-8 text-[#C4935A]" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    <span className="ml-3 text-[#2C2C2C]/60 dark:text-white/60">Loading payment form...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg shadow-black/5 p-6 sticky top-28">
              <h3 className="font-serif text-lg font-bold text-[#2C2C2C] dark:text-white mb-5">Order Summary</h3>

              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product_id}-${item.variant_id || ''}`} className="flex gap-3">
                    {item.image && (
                      <div className="w-14 h-20 rounded-md overflow-hidden flex-shrink-0 bg-[#f5f0eb]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-[#2C2C2C] dark:text-white truncate">{item.name}</p>
                      {item.author && <p className="text-xs text-[#2C2C2C]/50 dark:text-white/50">{item.author}</p>}
                      <p className="text-xs text-[#2C2C2C]/50 dark:text-white/50 mt-1">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-[#2C2C2C] dark:text-white whitespace-nowrap">
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#C4935A]/10 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#2C2C2C]/60 dark:text-white/60">Subtotal</span>
                  <span className="text-[#2C2C2C] dark:text-white">${(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#2C2C2C]/60 dark:text-white/60">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#2C2C2C]/60 dark:text-white/60">
                    Tax {taxRate > 0 && `(${taxRate}%)`}
                  </span>
                  <span className="text-[#2C2C2C] dark:text-white">${(tax / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#C4935A]/10">
                  <span className="font-bold text-[#2C2C2C] dark:text-white">Total</span>
                  <span className="font-bold text-xl text-[#C4935A]">${(total / 100).toFixed(2)}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-6 pt-5 border-t border-[#C4935A]/10 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#2C2C2C]/50 dark:text-white/50">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                  </svg>
                  Secure 256-bit SSL encryption
                </div>
                <div className="flex items-center gap-2 text-xs text-[#2C2C2C]/50 dark:text-white/50">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  30-day money-back guarantee
                </div>
                <div className="flex items-center gap-2 text-xs text-[#2C2C2C]/50 dark:text-white/50">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#C4935A]">
                    <rect x="1" y="3" width="15" height="13" rx="2" ry="2"/><path d="M16 8h4l3 3v5h-7V8z"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                  Free shipping on all orders
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
