import React from "react";
import NextImage from "next/image";

const Footer = async () => {
  return (
    <footer className="glass rounded-lg flex flex-row h-8 justify-end items-center w-full text-xs text-gray-500 p-5">
      <div className="hidden md:flex pr-5">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">v{process.env.NEXT_PUBLIC_APP_VERSION}</span>
          <NextImage src="/logo.png" alt="BasaltCMS logo" width={100} height={24} className="h-6 w-auto object-contain" />
        </div>
      </div>
      <div className="hidden md:flex space-x-2 pr-2">
        {/* powered by Basalt.ai */}
        {/* <span className="bg-black rounded-md text-white px-1 mx-1">
          {nextVersion.substring(1, 7) || process.env.NEXT_PUBLIC_NEXT_VERSION}
        </span> */}
        {/* <Link href={"https://ui.shadcn.com/"}>
          <span className="rounded-md mr-2">shadcnUI</span>
        </Link> */}
      </div>
    </footer>
  );
};

export default Footer;
