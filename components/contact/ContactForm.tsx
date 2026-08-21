"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Send } from "lucide-react";

interface ContactFormProps {
  onSuccessToast?: (msg: string) => void;
}

export default function ContactForm({ onSuccessToast }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate API network call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      onSuccessToast?.("Your message has been sent successfully! Our team will reply shortly.");

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setIsSent(false);
      }, 5000);
    }, 800);
  };

  return (
    <div className="space-y-8 sm:space-y-10 max-w-4xl mx-auto">
      {/* Section Heading matching reference */}
      <div className="text-center space-y-3">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium dark:text-[#d4b56a] text-[#9333ea] tracking-tight">
          Send A Message
        </h2>
        {/* Subtle gold line accent */}
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#d4b56a] to-transparent mx-auto" />
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1: Name and Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Name"
              className="w-full px-5 py-4 text-xs sm:text-sm dark:bg-[#060c08] bg-white border dark:border-[#f2eee3]/15 border-[#e9e1f5] rounded-xs dark:text-[#f2eee3] text-[#18181b] placeholder-italic dark:placeholder-[#666a64] placeholder-[#a1a1aa] font-serif focus:outline-none dark:focus:border-[#d4b56a] focus:border-[#9333ea] transition-colors shadow-xs"
            />
          </div>

          <div>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
              className="w-full px-5 py-4 text-xs sm:text-sm dark:bg-[#060c08] bg-white border dark:border-[#f2eee3]/15 border-[#e9e1f5] rounded-xs dark:text-[#f2eee3] text-[#18181b] placeholder-italic dark:placeholder-[#666a64] placeholder-[#a1a1aa] font-serif focus:outline-none dark:focus:border-[#d4b56a] focus:border-[#9333ea] transition-colors shadow-xs"
            />
          </div>
        </div>

        {/* Row 2: Message Textarea */}
        <div>
          <textarea
            required
            rows={6}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Message"
            className="w-full px-5 py-4 text-xs sm:text-sm dark:bg-[#060c08] bg-white border dark:border-[#f2eee3]/15 border-[#e9e1f5] rounded-xs dark:text-[#f2eee3] text-[#18181b] placeholder-italic dark:placeholder-[#666a64] placeholder-[#a1a1aa] font-serif focus:outline-none dark:focus:border-[#d4b56a] focus:border-[#9333ea] transition-colors shadow-xs resize-y"
          />
        </div>

        {/* Submit Button matching reference */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 sm:px-10 py-3.5 dark:bg-[#185238] bg-[#9333ea] hover:bg-[#7e22ce] dark:hover:bg-[#236b4a] text-white text-xs font-bold tracking-[0.16em] uppercase rounded-xs transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 disabled:opacity-50"
          >
            <span>{isSubmitting ? "SENDING..." : isSent ? "SENT!" : "SUBMIT"}</span>
            {isSent ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </form>
    </div>
  );
}
