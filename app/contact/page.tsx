"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import ContactUsPage from "@/app/contact-us/page";

export default function ContactPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/contact-us");
  }, [router]);

  return <ContactUsPage />;
}
