"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Sparkles, UserCheck, Lock, Mail, User, BookOpen, Send, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LEAGUE_ROLES, LeagueRoleData } from "@/lib/leagueRoles";

interface LeagueRoleViewProps {
  currentRoleSlug: string;
}

export default function LeagueRoleView({ currentRoleSlug }: LeagueRoleViewProps) {
  const role = LEAGUE_ROLES[currentRoleSlug] || LEAGUE_ROLES.author;
  const [modalMode, setModalMode] = useState<"join" | "auth" | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const actionName = modalMode === "join" ? `Application for ${role.name}` : "Login credentials";
      setToastMessage(`${actionName} submitted successfully! Our editorial board will reach out shortly.`);
      setModalMode(null);
      setFullName("");
      setEmail("");
      setPortfolioLink("");
      setNotes("");

      setTimeout(() => {
        setToastMessage(null);
      }, 4000);
    }, 900);
  };

  return (
    <main className="min-h-screen bg-[#faf7fd] dark:bg-[#030806] text-[#1e1b24] dark:text-[#f2eee3] flex flex-col font-sans transition-colors duration-300">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#f3e8ff] dark:bg-[#0d2a1d] border border-[#9333ea] dark:border-[#d4b56a] text-[#581c87] dark:text-[#f2eee3] px-4 py-3 rounded shadow-2xl flex items-center gap-2.5 animate-bounce text-xs font-semibold">
          <Check className="w-4 h-4 text-[#9333ea] dark:text-[#d4b56a]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar with activeTab */}
      <Navbar activeTab="JOIN THE LEAGUE" />

      {/* Main Content Area */}
      <div className="flex-1 py-10 sm:py-14 lg:py-16">
        <div className="container-custom w-full space-y-12 sm:space-y-16 px-4 sm:px-6 md:px-8">

          {/* ========================================================= */}
          {/* TOP CARD: "Welcome To Board" (Day / Night Mode Perfect) */}
          {/* ========================================================= */}
          <div className="w-full relative rounded-2xl bg-white dark:bg-[#06150e] border border-[#e9e1f5] dark:border-[#183928] p-8 sm:p-12 md:p-16 text-center shadow-lg dark:shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden transition-colors duration-300">
            {/* Subtle inner border */}
            <div className="absolute inset-2.5 sm:inset-3 border border-[#9333ea]/15 dark:border-[#d4b56a]/15 rounded-xl pointer-events-none" />

            <div className="relative z-10 space-y-7 max-w-3xl mx-auto">
              {/* Heading: Purple in Day Mode, Gold in Night Mode */}
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#9333ea] dark:text-[#d4b56a] tracking-tight">
                Welcome To Board
              </h1>

              {/* 2 Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-1">
                {/* Button 1: JOIN THE LEAGUE OF... */}
                <button
                  onClick={() => setModalMode("join")}
                  className="w-full sm:w-auto min-h-[50px] px-8 sm:px-10 bg-[#9333ea] hover:bg-[#7e22ce] dark:bg-[#184a32] dark:hover:bg-[#206644] text-white dark:text-[#f2eee3] border border-[#7e22ce] dark:border-[#276643] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase rounded-xs inline-flex items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-0.5 shadow-lg cursor-pointer group"
                >
                  <span>JOIN THE LEAGUE OF {role.singularName.toUpperCase()}</span>
                  <ArrowRight className="w-4 h-4 text-white dark:text-[#d4b56a] transition-transform group-hover:translate-x-1" />
                </button>

                {/* Button 2: LOGIN/REGISTER -> links to /my-account */}
                <a
                  href="/my-account"
                  className="w-full sm:w-auto min-h-[50px] px-8 sm:px-10 bg-white hover:bg-[#faf5ff] dark:bg-[#07140c] dark:hover:bg-[#0d2618] text-[#9333ea] dark:text-[#f2eee3] border border-[#9333ea] dark:border-[#d4b56a]/60 dark:hover:border-[#d4b56a] text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase rounded-xs inline-flex items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-0.5 shadow-md cursor-pointer group"
                >
                  <span>LOGIN/REGISTER</span>
                  <ArrowRight className="w-4 h-4 text-[#9333ea] dark:text-[#d4b56a] transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* ROLE DESCRIPTION SECTION */}
          {/* ========================================================= */}
          <div className="w-full space-y-4">
            <div className="relative inline-block pb-1">
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#9333ea] dark:text-[#d4b56a] tracking-tight">
                {role.name}
              </h2>
              {/* Subtle underline line */}
              <div className="w-24 sm:w-32 h-[3px] bg-[#9333ea] dark:bg-[#d4b56a] mt-2 rounded-full" />
            </div>

            <p className="text-base sm:text-lg md:text-xl lg:text-[22px] text-[#374151] dark:text-[#dedacf] font-normal leading-[1.8] sm:leading-[1.9] font-serif pt-2 max-w-6xl">
              {role.description}
            </p>
          </div>

          {/* ========================================================= */}
          {/* "MEET OUR AUTHORS/SPEAKERS" SECTION */}
          {/* ========================================================= */}
          <div className="w-full pt-4 sm:pt-8 text-center space-y-4 pb-8 sm:pb-12">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#9333ea] dark:text-[#d4b56a] tracking-tight">
              Meet Our {role.pluralName}
            </h2>

            <p className="font-display italic text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#6b7280] dark:text-[#cfcac0] font-normal tracking-wide pt-2">
              Our panel of {role.pluralName} will be announced soon...
            </p>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL: Join The League / Login Register Interactive Dialog */}
      {/* ========================================================= */}
      {modalMode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setModalMode(null)}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar dark:bg-[#070f0b] bg-white border dark:border-[#d4b56a]/50 border-[#d8b4fe] p-6 sm:p-8 rounded-sm shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalMode(null)}
              className="absolute top-4 right-4 text-[#888b83] hover:text-[#f2eee3] p-1"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div>
              <span className="text-[9px] sm:text-[10px] tracking-[0.28em] font-bold text-[#d4b56a] uppercase block">
                {modalMode === "join" ? "EXCLUSIVE APPLICATION" : "PORTAL ACCESS"}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-medium dark:text-[#f2eee3] text-[#18181b] mt-1">
                {modalMode === "join"
                  ? `Join The League of ${role.name}`
                  : `Member Login & Registration`}
              </h3>
              <p className="text-xs text-[#888b83] mt-1">
                {modalMode === "join"
                  ? `Submit your profile to join our international network of esteemed ${role.pluralName.toLowerCase()}.`
                  : `Access your member dashboard, publishing royalty statements, and events.`}
              </p>
            </div>

            {/* Application / Login Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
              <div>
                <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#888b83] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#888b83] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full h-11 pl-10 pr-4 text-xs sm:text-sm dark:bg-[#030705] bg-[#faf7fd] border dark:border-[#f2eee3]/20 border-[#e9e1f5] rounded-xs text-[#f2eee3] dark:text-[#f2eee3] text-[#18181b] placeholder-[#666a64] focus:outline-none dark:focus:border-[#d4b56a] focus:border-[#9333ea]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#888b83] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#888b83] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eleanor@example.com"
                    className="w-full h-11 pl-10 pr-4 text-xs sm:text-sm dark:bg-[#030705] bg-[#faf7fd] border dark:border-[#f2eee3]/20 border-[#e9e1f5] rounded-xs text-[#f2eee3] dark:text-[#f2eee3] text-[#18181b] placeholder-[#666a64] focus:outline-none dark:focus:border-[#d4b56a] focus:border-[#9333ea]"
                  />
                </div>
              </div>

              {modalMode === "join" ? (
                <>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#888b83] mb-1.5">
                      Website / Portfolio / Book Link (Optional)
                    </label>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 text-[#888b83] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="url"
                        value={portfolioLink}
                        onChange={(e) => setPortfolioLink(e.target.value)}
                        placeholder="https://yourportfolio.com"
                        className="w-full h-11 pl-10 pr-4 text-xs sm:text-sm dark:bg-[#030705] bg-[#faf7fd] border dark:border-[#f2eee3]/20 border-[#e9e1f5] rounded-xs text-[#f2eee3] dark:text-[#f2eee3] text-[#18181b] placeholder-[#666a64] focus:outline-none dark:focus:border-[#d4b56a] focus:border-[#9333ea]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#888b83] mb-1.5">
                      Brief Bio or Introduction
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tell our editorial board about your recent work and achievements..."
                      className="w-full p-3 text-xs sm:text-sm dark:bg-[#030705] bg-[#faf7fd] border dark:border-[#f2eee3]/20 border-[#e9e1f5] rounded-xs text-[#f2eee3] dark:text-[#f2eee3] text-[#18181b] placeholder-[#666a64] focus:outline-none dark:focus:border-[#d4b56a] focus:border-[#9333ea]"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider uppercase text-[#888b83] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#888b83] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      className="w-full h-11 pl-10 pr-4 text-xs sm:text-sm dark:bg-[#030705] bg-[#faf7fd] border dark:border-[#f2eee3]/20 border-[#e9e1f5] rounded-xs text-[#f2eee3] dark:text-[#f2eee3] text-[#18181b] placeholder-[#666a64] focus:outline-none dark:focus:border-[#d4b56a] focus:border-[#9333ea]"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[46px] bg-[#184e34] hover:bg-[#206644] text-white text-xs font-bold tracking-[0.14em] uppercase transition-all rounded-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">PROCESSING...</span>
                ) : modalMode === "join" ? (
                  <>
                    <UserCheck className="w-4 h-4 text-[#d4b56a]" />
                    <span>SUBMIT APPLICATION</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#d4b56a]" />
                    <span>CONTINUE TO DASHBOARD</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}
