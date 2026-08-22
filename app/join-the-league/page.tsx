import React from "react";
import LeagueRoleView from "@/components/league/LeagueRoleView";

export const metadata = {
  title: "Join The League | The Publishing Hub",
  description:
    "Join our prestigious international league of Authors, Publishers, Distributors, Literary Agents, Speakers, Thought Leaders, and Printers.",
};

export default function JoinTheLeaguePage() {
  return <LeagueRoleView currentRoleSlug="author" />;
}
