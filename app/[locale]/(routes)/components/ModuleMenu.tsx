"use client";

import React, { useEffect, useState } from "react";
import ProjectModuleMenu from "./menu-items/Projects";
import SecondBrainModuleMenu from "./menu-items/SecondBrain";
import InvoicesModuleMenu from "./menu-items/Invoices";
import DocumentsModuleMenu from "./menu-items/Documents";
import ChatGPTModuleMenu from "./menu-items/ChatGPT";
import EmployeesModuleMenu from "./menu-items/Employees";
import DataboxModuleMenu from "./menu-items/Databoxes";
import AdministrationMenu from "./menu-items/Administration";
import PartnerMenu from "./menu-items/Partner";
import DashboardMenu from "./menu-items/Dashboard";
import EmailsModuleMenu from "./menu-items/Emails";
import { cn } from "@/lib/utils";
import { Menu, MoreHorizontal, X, Home, ServerIcon, Mail, FileCheck } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  modules: any;
  dict: any;
  features: string[];
  isPartnerAdmin: boolean;
};

const AnyMenu = Menu as any;

const ModuleMenu = ({ modules, dict, features, isPartnerAdmin }: Props) => {
  // Desktop state: default to compact (false)
  const [open, setOpen] = useState(false);
  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  const hasFeature = (feature: string) => features.includes("all") || features.includes(feature);

  useEffect(() => {
    setIsMounted(true);
    try {
      // Respect user preference for desktop expansion if they toggled it before
      const persisted = localStorage.getItem("sidebar-open");
      if (persisted !== null) {
        setOpen(persisted === "true");
      } else {
        // Default to compact
        setOpen(false);
      }
    } catch (_) { }
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (!isMounted) {
    return null;
  }

  const renderMenuItems = (isMobileDrawer = false) => (
    <>
      <DashboardMenu open={isMobileDrawer || open} title={dict.ModuleMenu.dashboard} />
      {modules.find(
        (menuItem: any) => menuItem.name === "projects" && menuItem.enabled
      ) && hasFeature("projects") ? (
        <ProjectModuleMenu open={isMobileDrawer || open} title={dict.ModuleMenu.projects} />
      ) : null}
      {modules.find(
        (menuItem: any) => menuItem.name === "emails" && menuItem.enabled
      ) && hasFeature("emails") ? (
        <EmailsModuleMenu open={isMobileDrawer || open} title={dict.ModuleMenu.emails} />
      ) : null}
      {modules.find(
        (menuItem: any) => menuItem.name === "employee" && menuItem.enabled
      ) && hasFeature("employee") ? (
        <EmployeesModuleMenu open={isMobileDrawer || open} />
      ) : null}
      {modules.find(
        (menuItem: any) => menuItem.name === "invoice" && menuItem.enabled
      ) && hasFeature("invoices") ? (
        <InvoicesModuleMenu open={isMobileDrawer || open} title={dict.ModuleMenu.invoices} />
      ) : null}
      {modules.find(
        (menuItem: any) => menuItem.name === "documents" && menuItem.enabled
      ) && hasFeature("documents") ? (
        <DocumentsModuleMenu
          open={isMobileDrawer || open}
          title={dict.ModuleMenu.documents}
        />
      ) : null}
      {modules.find(
        (menuItem: any) => menuItem.name === "databox" && menuItem.enabled
      ) && hasFeature("databox") ? (
        <DataboxModuleMenu open={isMobileDrawer || open} />
      ) : null}
      {modules.find(
        (menuItem: any) => menuItem.name === "openai" && menuItem.enabled
      ) && hasFeature("openai") ? (
        <ChatGPTModuleMenu open={isMobileDrawer || open} />
      ) : null}
      <AdministrationMenu open={isMobileDrawer || open} title={dict.ModuleMenu.settings} />
      {isPartnerAdmin && <PartnerMenu open={isMobileDrawer || open} />}
    </>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex flex-col h-screen border-r bg-white/60 backdrop-blur-md relative group">
        <div
          className={` ${open ? "w-72" : "w-20"
            }  h-full p-3 pt-6 relative duration-300 sidebar flex flex-col`}
          data-open={open ? "true" : "false"}
        >
          {/* Header / Logo Area */}
          <div className={`flex items-center ${open ? "justify-between px-2" : "justify-center"} mb-6`}>
            {/* Logo Logic */}
            <div className="relative flex items-center justify-center w-full">
              {open ? (
                <NextImage
                  src="/logo.png"
                  alt="App logo"
                  width={120}
                  height={32}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <div className="relative">
                  <NextImage
                    src="/BasaltCMS.png"
                    alt="Logo Icon"
                    width={32}
                    height={32}
                    className="h-8 w-8 object-contain"
                  />
                  {/* Green Dot for System Status */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
                </div>
              )}
            </div>
          </div>

          <div id="app-sidebar" className="flex-1 overflow-y-auto sidebar-list no-scrollbar">
            {renderMenuItems(false)}
          </div>

          <div className={`mt-auto pt-4 flex justify-center ${open ? "" : "items-center"}`}>
            <span className="microtext text-gray-400">
              {open ? `v${process.env.NEXT_PUBLIC_APP_VERSION}` : "v" + process.env.NEXT_PUBLIC_APP_VERSION?.split('.')[0]}
            </span>
          </div>
        </div>

        {/* Circular Toggle Tab - Visible on Group Hover */}
        <button
          onClick={() => {
            const nextState = !open;
            setOpen(nextState);
            localStorage.setItem("sidebar-open", String(nextState));
          }}
          className="absolute -right-3 top-12 z-40 h-6 w-6 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Toggle Sidebar"
        >
          {/* Arrow Icon */}
          {open ? (
            <div className="h-4 w-4 text-gray-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </div>
          ) : (
            <div className="h-4 w-4 text-gray-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </div>
          )}
        </button>
      </div>

      {/* MOBILE BOTTOM NAVBAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-t border-gray-200 z-50 flex justify-around items-center px-4 pb-safe">

        {/* Dashboard */}
        <Link href="/dashboard" className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-primary transition-colors">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        {/* Projects (if enabled) */}
        {modules.find((m: any) => m.name === "projects" && m.enabled) && hasFeature("projects") && (
          <Link href="/projects" className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-primary transition-colors">
            <ServerIcon className="w-6 h-6" />
            <span className="text-[10px] font-medium">Projects</span>
          </Link>
        )}

        {/* Invoices (if enabled) - Primary Action? Maybe center it? 
            Let's put invoices or Emails.
        */}
        {modules.find((m: any) => m.name === "emails" && m.enabled) && hasFeature("emails") && (
          <Link href="/emails" className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-primary transition-colors">
            <Mail className="w-6 h-6" />
            <span className="text-[10px] font-medium">Emails</span>
          </Link>
        )}

        {/* More Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 p-2 text-gray-500 hover:text-primary transition-colors"
        >
          <div className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full">
            <MoreHorizontal className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-medium">Menu</span>
        </button>
      </div>

      {/* MOBILE DRAWER (Second Layer) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-8">
              <NextImage
                src="/logo.png"
                alt="App logo"
                width={140}
                height={40}
                className="h-8 w-auto object-contain"
              />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 border border-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {renderMenuItems(true)}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
              v{process.env.NEXT_PUBLIC_APP_VERSION}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModuleMenu;
