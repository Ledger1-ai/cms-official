export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="landing-page-wrapper">
            {/* 
        This layout isolates the landing pages.
        You can add global landing page navbars or footers here if desired.
      */}
            {children}
        </div>
    );
}
