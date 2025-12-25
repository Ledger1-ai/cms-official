import Script from "next/script";
import { prismadb } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function AnalyticsScript() {
    const session = await getServerSession(authOptions);

    // In a real multi-tenant app, we might check the domain or specific organisation linked to the request.
    // For this "single user/team" CMS view, we'll check by the current user's ID or system defaults.
    // Ideally, this should be looking up a "System" config, but we stored it under the User in the setup.
    // We'll find the FIRST active GA4 connection for the current user.

    if (!session?.user) return null;

    const connection = await prismadb.appConnection.findFirst({
        where: {
            providerId: "google-analytics",
            userId: (session.user as any).id,
            isActive: true
        }
    });

    if (!connection || !connection.credentials) return null;

    const { measurementId } = connection.credentials as { measurementId?: string };

    if (!measurementId) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${measurementId}');
        `}
            </Script>
        </>
    );
}
