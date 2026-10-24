"use client";

import { useState } from "react";
import { useCart } from "@/lib/cartContext";
import Link from "next/link";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalCount,
    lastAddedName,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<"cart" | "form" | "success">("cart");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    timeline: "Standard (2-4 weeks)",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCheckoutStep("success");
      clearCart();
    }, 900);
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setCheckoutStep("cart");
    }, 300);
  };

  return (
    <>
      {/* Toast Notification when item is added */}
      {lastAddedName && !isCartOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-neutral-900/95 px-4 py-3 shadow-2xl shadow-emerald-950/50 backdrop-blur-md animate-bounce">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="text-xs">
            <p className="font-semibold text-white">Added to Cart!</p>
            <p className="text-neutral-400 truncate max-w-[200px]">{lastAddedName}</p>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 rounded-lg bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-black hover:bg-emerald-400 transition-colors"
          >
            View Cart
          </button>
        </div>
      )}

      {/* Floating Cart Trigger Button (always visible on screen) */}
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        aria-label="Open Solution Cart"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 rounded-full border border-white/20 bg-neutral-900/90 px-4 py-3 text-white shadow-2xl shadow-black/80 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:shadow-cyan-500/20 active:scale-95 group"
      >
        <div className="relative">
          <svg className="h-5 w-5 text-neutral-300 group-hover:text-cyan-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {totalCount > 0 && (
            <span className="absolute -top-2 -right-2.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-1 text-[10px] font-black text-black">
              {totalCount}
            </span>
          )}
        </div>
        <span className="hidden sm:inline font-mono text-xs font-semibold text-neutral-200">
          Cart ({totalCount})
        </span>
        {totalCount > 0 && (
          <span className="hidden sm:inline font-mono text-xs text-cyan-400 font-bold border-l border-white/10 pl-2">
            ${subtotal.toLocaleString()}
          </span>
        )}
      </button>

      {/* Backdrop */}
      {isCartOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Cart Side Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 bg-neutral-950/95 p-6 shadow-2xl backdrop-blur-2xl transition-transform duration-300 sm:p-7 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                Solution &amp; Service Cart
                <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[11px] font-normal text-neutral-300">
                  {totalCount} {totalCount === 1 ? "item" : "items"}
                </span>
              </h3>
              <p className="text-xs text-neutral-400 font-mono">
                Interactive Engineering System Cart
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close cart drawer"
            className="rounded-lg p-2 text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto py-5 space-y-4">
          {checkoutStep === "cart" && (
            <>
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center py-12">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/5 text-neutral-500">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <h4 className="mt-4 font-semibold text-white">Your Cart is Empty</h4>
                  <p className="mt-2 text-xs text-neutral-400 max-w-xs leading-relaxed">
                    Explore the <strong>Sample Work</strong> section and click &ldquo;Add to Cart&rdquo; on any project module or e-commerce showcase item.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 rounded-xl bg-white/10 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
                  >
                    Browse Projects
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-neutral-900/60 p-3.5 transition-all hover:border-white/25 hover:bg-neutral-900/90"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] uppercase text-neutral-300">
                            {item.category}
                          </span>
                          {item.badge && (
                            <span className="font-mono text-[10px] text-cyan-400 font-semibold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <h4 className="mt-1 truncate text-xs font-semibold text-white">
                          {item.name}
                        </h4>
                        <div className="mt-1 font-mono text-xs text-cyan-400 font-medium">
                          ${item.price.toLocaleString()}
                          <span className="text-[10px] text-neutral-500 ml-1">
                            x {item.quantity} = ${(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center rounded-lg border border-white/15 bg-neutral-950 p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="flex h-6 w-6 items-center justify-center rounded text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-mono text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="flex h-6 w-6 items-center justify-center rounded text-neutral-400 hover:bg-white/10 hover:text-white transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-neutral-500 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-[11px] font-mono text-neutral-500 hover:text-red-400 underline transition-colors"
                    >
                      Clear entire cart
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {checkoutStep === "form" && (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3 text-xs text-cyan-300">
                🚀 Reviewing inquiry for <strong>{totalCount} selected solution(s)</strong> (${subtotal.toLocaleString()}). Fill in your contact info to submit a quote request.
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Target Timeline
                </label>
                <select
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                >
                  <option>Immediate / ASAP (1-2 weeks)</option>
                  <option>Standard (2-4 weeks)</option>
                  <option>Medium Term (1-2 months)</option>
                  <option>Flexible / Exploratory</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1">
                  Project Notes or Custom Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your tech stack, scope, or specific goals..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep("cart")}
                  className="flex-1 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-semibold text-white hover:bg-white/10"
                >
                  Back to Cart
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 py-2.5 text-xs font-bold text-black shadow-lg shadow-cyan-500/20 hover:scale-[1.02] disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Quote ($" + subtotal.toLocaleString() + ")"}
                </button>
              </div>
            </form>
          )}

          {checkoutStep === "success" && (
            <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="text-xl font-bold text-white">Order Inquiry Received!</h4>
              <p className="text-xs text-neutral-300 max-w-xs leading-relaxed">
                Thank you, <strong>{formData.name || "friend"}</strong>. Your solution inquiry has been logged. John will review your architecture specifications and reply to <strong>{formData.email}</strong> within 24 hours.
              </p>
              <div className="w-full rounded-xl border border-white/10 bg-neutral-900/60 p-4 text-left font-mono text-[11px] text-neutral-400 space-y-1">
                <div>Reference ID: <span className="text-white">ORD-{Date.now().toString().slice(-6)}</span></div>
                <div>Status: <span className="text-emerald-400 font-semibold">Queued for Review</span></div>
                <div>Expected Response: <span className="text-white">&lt; 24h</span></div>
              </div>
              <button
                onClick={handleClose}
                className="mt-4 rounded-xl bg-white px-6 py-2.5 text-xs font-bold text-black hover:bg-neutral-200 transition-colors"
              >
                Close &amp; Return to Portfolio
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer with Totals & Checkout Button */}
        {checkoutStep === "cart" && items.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-3">
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Selected Items:</span>
                <span className="text-white">{totalCount} modules</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Estimated Estimate:</span>
                <span className="text-white font-semibold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span>Total Budget:</span>
                <span className="text-cyan-400">${subtotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setCheckoutStep("form")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] hover:shadow-cyan-500/40 active:scale-[0.98]"
            >
              <span>Proceed to Solution Checkout</span>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
