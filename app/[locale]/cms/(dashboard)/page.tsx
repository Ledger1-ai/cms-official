import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CheckCircle2 } from "lucide-react";
import Changelog from "./components/Changelog";
import DashboardGrid from "./components/DashboardGrid";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import DashboardHeader from "./components/DashboardHeader";
import { prismadb } from "@/lib/prisma";

import { getUnreadTicketCount } from "@/actions/cms/support-tickets";
// ... imports

export default async function CMSDashboardPage() {
  const session = await getServerSession(authOptions);

  // Fetch user's enabled modules
  let enabledModules: string[] = [];
  let isAdmin = false;
  let unreadSupportCount = 0;

  if (session?.user?.id) {
    const user = await prismadb.users.findUnique({
      where: { id: session.user.id },
      select: { cmsModules: true, is_admin: true, email: true },
    });

    // Super Admin and Admins get all modules
    if (user?.email === "admin@ledger1.ai" || user?.is_admin) {
      enabledModules = ["blog", "careers", "docs", "media", "integrations", "social", "footer", "settings", "dashboard", "activity", "support"];
      isAdmin = true;
      unreadSupportCount = await getUnreadTicketCount();
    } else {
      enabledModules = user?.cmsModules || [];
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <DashboardHeader userName={session?.user?.name?.split(" ")[0] || "Admin"} />

      {/* Status Banner removed (moved to sidebar) */}

      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch h-auto lg:h-[600px]">
          {/* Content Grid - Takes available width */}
          <div className="flex-1 h-full">
            <DashboardGrid enabledModules={enabledModules} isAdmin={isAdmin} unreadSupportCount={unreadSupportCount} />
          </div>

          {/* Activity Log - Side Panel - Matches height of grid explicitly */}
          <div className="w-full lg:w-96 flex flex-col h-[500px] lg:h-full">
            <Changelog />
          </div>
        </div>

        {/* Analytics Section - Only for Admins */}
        {isAdmin && (
          <div className="pt-4 border-t border-white/5">
            <AnalyticsDashboard />
          </div>
        )}
      </div>
    </div>
  );
}
