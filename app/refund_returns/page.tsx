"use client";

import React from "react";
import { FileText, Mail, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RefundReturnsPage() {
  return (
    <main className="min-h-screen bg-[#faf7fd] dark:bg-[#030806] text-[#1e1b24] dark:text-[#f2eee3] flex flex-col font-sans transition-colors duration-300">
      {/* Navbar without announcement banner */}
      <Navbar showAnnouncement={false} />

      {/* Header Banner Section (Exact Match to User Screenshot) */}
      <div className="border-b border-[#e9e1f5] dark:border-[#f2eee3]/10 bg-[#fbf9f4] dark:bg-[#06150e] py-8 sm:py-12 transition-colors duration-300">
        <div className="container-custom max-w-5xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 sm:px-6">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-[#1e1b24] dark:text-[#d4b56a] tracking-tight">
            Refund and Returns Policy
          </h1>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-serif italic text-[#71717a] dark:text-[#888b83]">
            <a href="/" className="hover:text-[#9333ea] hover:dark:text-[#d4b56a] transition-colors">
              Home
            </a>
            <span>/</span>
            <span className="text-[#9333ea] dark:text-[#d4b56a] font-normal not-italic">
              Refund and Returns Policy
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 py-12 sm:py-16 lg:py-20">
        <div className="container-custom max-w-4xl space-y-12 sm:space-y-16 px-4 sm:px-6">

          {/* ========================================================= */}
          {/* MAIN TITLE & INTRO: Privacy Policy (Exact Match to Image) */}
          {/* ========================================================= */}
          <div className="space-y-4">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-normal text-[#1e1b24] dark:text-[#d4b56a] tracking-tight">
              Privacy Policy
            </h2>
            <p className="text-xs sm:text-sm text-[#71717a] dark:text-[#888b83] font-serif italic">
              Last updated: October 26, 2024
            </p>

            <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif pt-2">
              This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
            </p>

            <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
              We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the{" "}
              <a
                href="https://www.termsfeed.com/privacy-policy-generator/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9333ea] dark:text-[#d4b56a] font-medium hover:underline"
              >
                Privacy Policy Generator
              </a>
              .
            </p>
          </div>

          {/* ========================================================= */}
          {/* SECTION 1: Interpretation and Definitions */}
          {/* ========================================================= */}
          <div className="space-y-6">
            <h3 className="font-display text-3xl sm:text-4xl md:text-[38px] font-normal text-[#1e1b24] dark:text-[#d4b56a] tracking-tight">
              Interpretation and Definitions
            </h3>

            {/* Sub-heading: Interpretation */}
            <div className="space-y-3 pt-2">
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1e1b24] dark:text-[#f2eee3] tracking-tight">
                Interpretation
              </h3>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>
            </div>

            {/* Sub-heading: Definitions */}
            <div className="space-y-4 pt-4">
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1e1b24] dark:text-[#f2eee3] tracking-tight">
                Definitions
              </h3>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                For the purposes of this Privacy Policy:
              </p>

              {/* Definitions List */}
              <ul className="space-y-3.5 pt-2 text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] font-serif leading-[1.8]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">Account</strong> means a unique account created for You to access our Service or parts of our Service.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where “control” means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">Company</strong> (referred to as either “the Company”, “We”, “Us” or “Our” in this Agreement) refers to Geecon, Row House 20, Golden Nest , Phase III , Mira-Bhayandar Road , Bhayandar East , Thane-401105..
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website, containing the details of Your browsing history on that website among its many uses.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">Country</strong> refers to: Maharashtra, India
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">Personal Data</strong> is any information that relates to an identified or identifiable individual.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">Service</strong> refers to the Website.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">Third-party Social Media Service</strong> refers to any website or any social network website through which a User can log in or create an account to use the Service.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">Website</strong> refers to The publishing hub, accessible from{" "}
                    <a
                      href="https://thepublishinghub.co.uk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9333ea] dark:text-[#d4b56a] underline font-sans"
                    >
                      https://thepublishinghub.co.uk/
                    </a>
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full h-px bg-[#e9e1f5] dark:bg-[#f2eee3]/10" />

          {/* ========================================================= */}
          {/* SECTION 2: Collecting and Using Your Personal Data */}
          {/* ========================================================= */}
          <div className="space-y-8">
            <h2 className="font-display text-3xl sm:text-4xl md:text-[40px] font-normal text-[#9333ea] dark:text-[#d4b56a] tracking-tight">
              Collecting and Using Your Personal Data
            </h2>

            {/* Sub-heading: Types of Data Collected */}
            <div className="space-y-6 pt-2">
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1e1b24] dark:text-[#f2eee3] tracking-tight">
                Types of Data Collected
              </h3>

              {/* Personal Data */}
              <div className="space-y-3 pt-2">
                <h4 className="font-display text-xl sm:text-2xl font-medium text-[#1e1b24] dark:text-[#f2eee3]">
                  Personal Data
                </h4>
                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                  While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                </p>

                <ul className="space-y-2 pt-1 text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] font-serif">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a]" />
                    <span>Email address</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a]" />
                    <span>Address, State, Province, ZIP/Postal code, City</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a]" />
                    <span>Usage Data</span>
                  </li>
                </ul>
              </div>

              {/* Usage Data */}
              <div className="space-y-3 pt-4">
                <h4 className="font-display text-xl sm:text-2xl font-medium text-[#1e1b24] dark:text-[#f2eee3]">
                  Usage Data
                </h4>
                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                  Usage Data is collected automatically when using the Service.
                </p>
                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                  Usage Data may include information such as Your Device’s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                </p>
                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                  When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                </p>
                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                  We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.
                </p>
              </div>

              {/* Information from Third-Party Social Media Services */}
              <div className="space-y-3 pt-4">
                <h4 className="font-display text-xl sm:text-2xl font-medium text-[#1e1b24] dark:text-[#f2eee3]">
                  Information from Third-Party Social Media Services
                </h4>
                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                  The Company allows You to create an account and log in to use the Service through the following Third-party Social Media Services:
                </p>

                <ul className="space-y-2 pt-1 text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] font-serif">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a]" />
                    <span>Google</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a]" />
                    <span>Facebook</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a]" />
                    <span>Instagram</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a]" />
                    <span>Twitter</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a]" />
                    <span>LinkedIn</span>
                  </li>
                </ul>

                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif pt-2">
                  If You decide to register through or otherwise grant us access to a Third-Party Social Media Service, We may collect Personal data that is already associated with Your Third-Party Social Media Service’s account, such as Your name, Your email address, Your activities or Your contact list associated with that account.
                </p>
                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                  You may also have the option of sharing additional information with the Company through Your Third-Party Social Media Service’s account. If You choose to provide such information and Personal Data, during registration or otherwise, You are giving the Company permission to use, share, and store it in a manner consistent with this Privacy Policy.
                </p>
              </div>

              {/* Tracking Technologies and Cookies */}
              <div className="space-y-4 pt-4">
                <h4 className="font-display text-xl sm:text-2xl font-medium text-[#1e1b24] dark:text-[#f2eee3]">
                  Tracking Technologies and Cookies
                </h4>
                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                  We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service. The technologies We use may include:
                </p>

                <ul className="space-y-3 pt-2 text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] font-serif leading-[1.8]">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">Cookies or Browser Cookies.</strong> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">Web Beacons.</strong> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).
                    </span>
                  </li>
                </ul>

                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif pt-2">
                  Cookies can be “Persistent” or “Session” Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. You can learn more about cookies on{" "}
                  <a
                    href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9333ea] dark:text-[#d4b56a] font-medium hover:underline"
                  >
                    TermsFeed website
                  </a>{" "}
                  article.
                </p>

                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                  We use both Session and Persistent Cookies for the purposes set out below:
                </p>

                {/* Specific Cookie Types (Necessary, Notice, Functionality) */}
                <div className="space-y-5 pt-2 pl-2 sm:pl-4">
                  {/* Necessary / Essential Cookies */}
                  <div className="space-y-2 border-l-2 border-[#9333ea]/50 dark:border-[#d4b56a]/50 pl-4 py-1">
                    <p className="font-bold text-sm sm:text-base text-[#1e1b24] dark:text-[#f2eee3]">
                      Necessary / Essential Cookies
                    </p>
                    <p className="text-xs sm:text-sm text-[#4b5563] dark:text-[#b4b1a8]">
                      Type: Session Cookies
                    </p>
                    <p className="text-xs sm:text-sm text-[#4b5563] dark:text-[#b4b1a8]">
                      Administered by: Us
                    </p>
                    <p className="text-xs sm:text-sm text-[#374151] dark:text-[#d0cdc4] leading-relaxed">
                      Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
                    </p>
                  </div>

                  {/* Cookies Policy / Notice Acceptance Cookies */}
                  <div className="space-y-2 border-l-2 border-[#9333ea]/50 dark:border-[#d4b56a]/50 pl-4 py-1">
                    <p className="font-bold text-sm sm:text-base text-[#1e1b24] dark:text-[#f2eee3]">
                      Cookies Policy / Notice Acceptance Cookies
                    </p>
                    <p className="text-xs sm:text-sm text-[#4b5563] dark:text-[#b4b1a8]">
                      Type: Persistent Cookies
                    </p>
                    <p className="text-xs sm:text-sm text-[#4b5563] dark:text-[#b4b1a8]">
                      Administered by: Us
                    </p>
                    <p className="text-xs sm:text-sm text-[#374151] dark:text-[#d0cdc4] leading-relaxed">
                      Purpose: These Cookies identify if users have accepted the use of cookies on the Website.
                    </p>
                  </div>

                  {/* Functionality Cookies */}
                  <div className="space-y-2 border-l-2 border-[#9333ea]/50 dark:border-[#d4b56a]/50 pl-4 py-1">
                    <p className="font-bold text-sm sm:text-base text-[#1e1b24] dark:text-[#f2eee3]">
                      Functionality Cookies
                    </p>
                    <p className="text-xs sm:text-sm text-[#4b5563] dark:text-[#b4b1a8]">
                      Type: Persistent Cookies
                    </p>
                    <p className="text-xs sm:text-sm text-[#4b5563] dark:text-[#b4b1a8]">
                      Administered by: Us
                    </p>
                    <p className="text-xs sm:text-sm text-[#374151] dark:text-[#d0cdc4] leading-relaxed">
                      Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.
                    </p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif pt-2">
                  For more information about the cookies we use and your choices regarding cookies, please visit our Cookies Policy or the Cookies section of our Privacy Policy.
                </p>
              </div>
            </div>

            {/* Sub-heading: Use of Your Personal Data */}
            <div className="space-y-4 pt-6">
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1e1b24] dark:text-[#f2eee3] tracking-tight">
                Use of Your Personal Data
              </h3>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                The Company may use Personal Data for the following purposes:
              </p>

              <ul className="space-y-3 pt-2 text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] font-serif leading-[1.8]">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">To provide and maintain our Service</strong>, including to monitor the usage of our Service.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application’s push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">To manage Your requests:</strong> To attend and manage Your requests to Us.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                  <span>
                    <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">For other purposes:</strong> We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.
                  </span>
                </li>
              </ul>

              {/* Sharing Information Situations */}
              <div className="space-y-3 pt-6">
                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                  We may share Your personal information in the following situations:
                </p>

                <ul className="space-y-3 pt-1 text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] font-serif leading-[1.8]">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a Third-Party Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You and view Your profile.
                    </span>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a] mt-2.5 flex-shrink-0" />
                    <span>
                      <strong className="font-bold text-[#1e1b24] dark:text-[#f2eee3]">With Your consent:</strong> We may disclose Your personal information for any other purpose with Your consent.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sub-heading: Retention of Your Personal Data */}
            <div className="space-y-4 pt-6">
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1e1b24] dark:text-[#f2eee3] tracking-tight">
                Retention of Your Personal Data
              </h3>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                 The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
              </p>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
              </p>
            </div>

            {/* Sub-heading: Transfer of Your Personal Data */}
            <div className="space-y-4 pt-6">
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1e1b24] dark:text-[#f2eee3] tracking-tight">
                Transfer of Your Personal Data
              </h3>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                Your information, including Personal Data, is processed at the Company’s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.
              </p>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.
              </p>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.
              </p>
            </div>

            {/* Sub-heading: Delete Your Personal Data */}
            <div className="space-y-4 pt-6">
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1e1b24] dark:text-[#f2eee3] tracking-tight">
                Delete Your Personal Data
              </h3>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.
              </p>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                Our Service may give You the ability to delete certain information about You from within the Service.
              </p>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                You may update, amend, or delete Your information at any time by signing in to Your Account, if you have one, and visiting the account settings section that allows you to manage Your personal information. You may also contact Us to request access to, correct, or delete any personal information that You have provided to Us.
              </p>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.
              </p>
            </div>

            {/* Sub-heading: Disclosure of Your Personal Data */}
            <div className="space-y-6 pt-6">
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1e1b24] dark:text-[#f2eee3] tracking-tight">
                Disclosure of Your Personal Data
              </h3>

              {/* Business Transactions */}
              <div className="space-y-2">
                <h4 className="font-display text-xl sm:text-2xl font-medium text-[#1e1b24] dark:text-[#f2eee3]">
                  Business Transactions
                </h4>
                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                  If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
                </p>
              </div>

              {/* Law enforcement */}
              <div className="space-y-2 pt-2">
                <h4 className="font-display text-xl sm:text-2xl font-medium text-[#1e1b24] dark:text-[#f2eee3]">
                  Law enforcement
                </h4>
                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                  Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).
                </p>
              </div>

              {/* Other legal requirements */}
              <div className="space-y-3 pt-2">
                <h4 className="font-display text-xl sm:text-2xl font-medium text-[#1e1b24] dark:text-[#f2eee3]">
                  Other legal requirements
                </h4>
                <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                  The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:
                </p>
                <ul className="space-y-2 pt-1 text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] font-serif">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a]" />
                    <span>Comply with a legal obligation</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a]" />
                    <span>Protect and defend the rights or property of the Company</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a]" />
                    <span>Prevent or investigate possible wrongdoing in connection with the Service</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a]" />
                    <span>Protect the personal safety of Users of the Service or the public</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a]" />
                    <span>Protect against legal liability</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sub-heading: Security of Your Personal Data */}
            <div className="space-y-4 pt-6">
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1e1b24] dark:text-[#f2eee3] tracking-tight">
                Security of Your Personal Data
              </h3>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
              </p>
            </div>

            {/* Sub-heading: Children's Privacy */}
            <div className="space-y-4 pt-6">
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1e1b24] dark:text-[#f2eee3] tracking-tight">
                Children’s Privacy
              </h3>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.
              </p>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent’s consent before We collect and use that information.
              </p>
            </div>

            {/* Sub-heading: Links to Other Websites */}
            <div className="space-y-4 pt-6">
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1e1b24] dark:text-[#f2eee3] tracking-tight">
                Links to Other Websites
              </h3>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party’s site. We strongly advise You to review the Privacy Policy of every site You visit.
              </p>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
              </p>
            </div>

            {/* Sub-heading: Changes to this Privacy Policy */}
            <div className="space-y-4 pt-6">
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1e1b24] dark:text-[#f2eee3] tracking-tight">
                Changes to this Privacy Policy
              </h3>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.
              </p>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the “Last updated” date at the top of this Privacy Policy.
              </p>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </div>

            {/* Sub-heading: Contact Us */}
            <div className="space-y-4 pt-6">
              <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#1e1b24] dark:text-[#f2eee3] tracking-tight">
                Contact Us
              </h3>
              <p className="text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] leading-[1.8] font-serif">
                If you have any questions about this Privacy Policy, You can contact us:
              </p>

              <ul className="space-y-2.5 pt-2 text-sm sm:text-base text-[#374151] dark:text-[#d0cdc4] font-serif">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a]" />
                  <span>
                    By email:{" "}
                    <a
                      href="mailto:hello@thepublishinghub.co.uk"
                      className="text-[#9333ea] dark:text-[#d4b56a] font-medium hover:underline font-sans"
                    >
                      hello@thepublishinghub.co.uk
                    </a>
                  </span>
                </li>

                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9333ea] dark:bg-[#d4b56a]" />
                  <span>
                    By visiting this page on our website:{" "}
                    <a
                      href="https://thepublishinghub.co.uk/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#9333ea] dark:text-[#d4b56a] font-medium hover:underline font-sans"
                    >
                      https://thepublishinghub.co.uk/
                    </a>
                  </span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
