import React from "react";
import LeagueRoleView from "@/components/league/LeagueRoleView";
import { LEAGUE_ROLES } from "@/lib/leagueRoles";

interface RolePageProps {
  params: Promise<{
    role: string;
  }>;
}

export async function generateMetadata({ params }: RolePageProps) {
  const resolvedParams = await params;
  const roleSlug = resolvedParams?.role?.toLowerCase() || "author";
  const roleData = LEAGUE_ROLES[roleSlug] || LEAGUE_ROLES.author;

  return {
    title: `Join The League - ${roleData.name} | The Publishing Hub`,
    description: roleData.description,
  };
}

export default async function LeagueRolePage({ params }: RolePageProps) {
  const resolvedParams = await params;
  const roleSlug = resolvedParams?.role?.toLowerCase() || "author";

  return <LeagueRoleView currentRoleSlug={roleSlug} />;
}
