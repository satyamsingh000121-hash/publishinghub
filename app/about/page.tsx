"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AboutUsPage from "@/app/about-us/page";

export default function AboutPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/about-us");
  }, [router]);

  return <AboutUsPage />;
}
