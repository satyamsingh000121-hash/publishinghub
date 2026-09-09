import React from "react";
import { Metadata } from "next";
import MeetTheAuthorManager from "@/components/admin/MeetTheAuthorManager";

export const metadata: Metadata = {
  title: "Meet The Author Manager | Admin | PublishingHub",
  description: "Manage the author profile, quote, and showcase books displayed on product detail pages.",
};

export default function AdminMeetTheAuthorPage() {
  return <MeetTheAuthorManager />;
}
