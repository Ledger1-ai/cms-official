"use client";

import { useEffect } from "react";
// We use a client component wrapper for Intercom often because it needs window access, 
// but we can pass the appId from a server parent. 
// Actually, let's make this a Server Component that renders the Script, similar to GA.
// But Intercom often requires a user hash for security if logged in.
// For "Visitor" mode, just the App ID is enough.

import Script from "next/script";

interface IntercomScriptProps {
    appId: string;
}

export function IntercomScript({ appId }: IntercomScriptProps) {
    return (
        <Script id="intercom-settings" strategy="afterInteractive">
            {`
        window.intercomSettings = {
          api_base: "https://api-iam.intercom.io",
          app_id: "${appId}"
        };
      `}
            {`
        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/${appId}';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(document.readyState==='complete'){l();}else{if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}}})();
      `}
        </Script>
    );
}
