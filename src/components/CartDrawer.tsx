import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { items, isCartOpen, closeCart, removeFromCart, updateQuantity, itemCount, subtotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white dark:bg-[#1a1a1a] shadow-2xl transform transition-transform duration-500 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#C4935A]/15">
          <div className="flex items-center gap-3">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A]">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="font-serif text-xl font-bold text-[#2C2C2C] dark:text-white">
              Your Cart
            </h2>
            {itemCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#C4935A]/10 text-[#C4935A] text-xs font-semibold">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full hover:bg-black/5 dark:hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#2C2C2C] dark:text-white">
              <path d="M14 4L4 14M4 4l10 10" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Banner */}
        <div className="px-6 py-3 bg-[#C4935A]/5 border-b border-[#C4935A]/10">
          <div className="flex items-center gap-2 text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A]">
              <rect x="1" y="3" width="15" height="13" rx="2" ry="2"/>
              <path d="M16 8h4l3 3v5h-7V8z"/>
              <circle cx="5.5" cy="18.5" r="2.5"/>
              <circle cx="18.5" cy="18.5" r="2.5"/>
            </svg>
            <span className="text-[#C4935A] font-medium">Free Shipping</span>
            <span className="text-[#2C2C2C]/50 dark:text-white/50">on all orders</span>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4" style={{ maxHeight: 'calc(100vh - 280px)' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#C4935A]/25 mb-4">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 6h18" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="font-serif text-lg text-[#2C2C2C]/60 dark:text-white/60 mb-2">Your cart is empty</p>
              <p className="text-sm text-[#2C2C2C]/40 dark:text-white/40 mb-6">Browse our catalog to find your next great read.</p>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 bg-[#C4935A] hover:bg-[#B38349] text-white text-sm font-medium rounded-md transition-all"
              >
                Continue Browsing
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.product_id}-${item.variant_id || ''}`}
                  className="flex gap-4 p-3 rounded-xl bg-[#f9f6f2] dark:bg-white/5 group"
                >
                  {/* Image */}
                  {item.image && (
                    <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-semibold text-[#2C2C2C] dark:text-white text-sm leading-tight truncate">
                      {item.name}
                    </h4>
                    {item.author && (
                      <p className="text-xs text-[#2C2C2C]/50 dark:text-white/50 mt-0.5">{item.author}</p>
                    )}
                    {item.variant_title && (
                      <p className="text-xs text-[#C4935A] mt-0.5">{item.variant_title}</p>
                    )}
                    <p className="text-sm font-semibold text-[#C4935A] mt-2">
                      ${(item.price / 100).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-0 border border-[#C4935A]/20 rounded-md overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1, item.variant_id)}
                          className="w-8 h-8 flex items-center justify-center text-[#2C2C2C]/60 dark:text-white/60 hover:bg-[#C4935A]/10 hover:text-[#C4935A] transition-colors"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14" strokeLinecap="round"/>
                          </svg>
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-[#2C2C2C] dark:text-white bg-white dark:bg-[#1a1a1a]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1, item.variant_id)}
                          className="w-8 h-8 flex items-center justify-center text-[#2C2C2C]/60 dark:text-white/60 hover:bg-[#C4935A]/10 hover:text-[#C4935A] transition-colors"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product_id, item.variant_id)}
                        className="p-1.5 rounded-md text-[#2C2C2C]/30 dark:text-white/30 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M10 11v6M14 11v6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 border-t border-[#C4935A]/15 bg-white dark:bg-[#1a1a1a] px-6 py-5">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#2C2C2C]/60 dark:text-white/60">Subtotal</span>
                <span className="font-semibold text-[#2C2C2C] dark:text-white">${(subtotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#2C2C2C]/60 dark:text-white/60">Shipping</span>
                <span className="text-[#C4935A] font-medium">Free</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-[#C4935A]/10">
                <span className="font-semibold text-[#2C2C2C] dark:text-white">Estimated Total</span>
                <span className="font-bold text-lg text-[#C4935A]">${(subtotal / 100).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-[#C4935A] hover:bg-[#B38349] text-white font-medium tracking-wide rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-[#C4935A]/25 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button
              onClick={closeCart}
              className="w-full mt-2 py-2.5 text-[#2C2C2C]/60 dark:text-white/60 hover:text-[#C4935A] text-sm font-medium transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
