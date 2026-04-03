import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="min-h-screen bg-[#f9f6f2] dark:bg-[#111] pt-24 pb-16 flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2C2C] dark:text-white mb-3">
          Thank You!
        </h1>
        <p className="text-lg text-[#2C2C2C]/70 dark:text-white/70 mb-2">
          Your order has been placed successfully.
        </p>

        {orderId && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C4935A]/10 text-[#C4935A] text-sm font-medium mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Order #{orderId.slice(0, 8)}
          </div>
        )}

        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg shadow-black/5 p-8 mb-8">
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A] flex-shrink-0 mt-0.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <p className="text-sm font-medium text-[#2C2C2C] dark:text-white">Confirmation Email</p>
                <p className="text-sm text-[#2C2C2C]/60 dark:text-white/60">A confirmation email with your order details has been sent to your inbox.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A] flex-shrink-0 mt-0.5">
                <rect x="1" y="3" width="15" height="13" rx="2" ry="2"/>
                <path d="M16 8h4l3 3v5h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <div>
                <p className="text-sm font-medium text-[#2C2C2C] dark:text-white">Free Shipping</p>
                <p className="text-sm text-[#2C2C2C]/60 dark:text-white/60">Your books will be carefully packaged and shipped within 2-3 business days.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#C4935A] flex-shrink-0 mt-0.5">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <p className="text-sm font-medium text-[#2C2C2C] dark:text-white">Happy Reading</p>
                <p className="text-sm text-[#2C2C2C]/60 dark:text-white/60">Thank you for supporting independent publishing and extraordinary voices.</p>
              </div>
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#C4935A] hover:bg-[#B38349] text-white font-medium rounded-lg transition-all hover:shadow-lg hover:shadow-[#C4935A]/25"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M12 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Continue Browsing
        </Link>
      </div>
    </div>
  );
}
