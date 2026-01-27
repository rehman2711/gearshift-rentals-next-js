"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Menu,
  X,
  FileEdit,
  Database,
  ClipboardList,
  Check,
  LogOut,
} from "lucide-react";
import SidebarLink from "./sidebar-links";
import { signOut } from "next-auth/react";

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(true); // desktop collapse
  const [mobileOpen, setMobileOpen] = useState(false); // mobile drawer
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    signOut({ redirect: true, callbackUrl: "/login" });
  };
  return (
    <>
      <div className="min-h-screen relative">
        {/* TOP BAR (Mobile Only) */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 flex items-center px-4 md:hidden">
          <button onClick={() => setMobileOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="ml-4 font-bold text-lg">Admin</h1>
        </header>

        {/* MOBILE OVERLAY */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
          fixed top-0 md:top-16 left-0 z-40
          h-screen md:h-[calc(100vh-4rem)]
          bg-white text-black border-r
          transition-all duration-300
          flex flex-col dark:bg-black/90 dark:text-white 
          ${open ? "md:w-60" : "md:w-20"}
          ${
            mobileOpen
              ? "w-60 translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
        >
          {/* Sidebar Header */}
          <div
            className={`flex items-center justify-between p-4 border-b ${
              !open && "mx-auto"
            } `}
          >
            <div>
              {open && (
                <>
                  <Link href="/login/admin">
                    <h1
                      className={`text-xl font-extrabold ${
                        !open && "hidden md:block"
                      }`}
                    >
                      Admin
                    </h1>
                  </Link>
                </>
              )}
            </div>
            <div>
              {/* Desktop toggle */}
              <button
                onClick={() => setOpen(!open)}
                className="hidden md:block"
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>

              {/* Mobile close */}
              <button
                onClick={() => setMobileOpen(false)}
                className="md:hidden"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 mt-2 space-y-1 px-2">
            <SidebarLink
              href="/login/admin/dashboard"
              label="Dashboard"
              icon={<LayoutDashboard size={20} />}
              open={open}
              pathname={pathname}
              onClick={() => setMobileOpen(false)}
            />

            <SidebarLink
              href="/login/admin/form"
              label="Form"
              icon={<FileEdit size={20} />}
              open={open}
              pathname={pathname}
              onClick={() => setMobileOpen(false)}
            />

            <SidebarLink
              href="/login/admin/manage_data"
              label="Manage Data"
              icon={<Database size={20} />}
              open={open}
              pathname={pathname}
              onClick={() => setMobileOpen(false)}
            />

            <SidebarLink
              href="/login/admin/view_bookings"
              label="View Bookings"
              icon={<ClipboardList size={20} />}
              open={open}
              pathname={pathname}
              onClick={() => setMobileOpen(false)}
            />

            <SidebarLink
              href="/login/admin/completed_bookings"
              label="Approved Bookings"
              icon={<Check size={20} />}
              open={open}
              pathname={pathname}
              onClick={() => setMobileOpen(false)}
            />
          </nav>

          {/* Logout */}
          <div
            onClick={handleLogout}
            className="p-4 border-t cursor-pointer hover:bg-red-600 hover:text-white transition flex items-center gap-3"
          >
            {!open ? (
              <LogOut size={20} />
            ) : (
              <>
                <LogOut size={20} />{" "}
                <span className={`${!open && "hidden md:inline"}`}>Logout</span>
              </>
            )}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main
          className={`
          pt-20 md:pt-8 px-6
          transition-all duration-300
          ${open ? "md:ml-60" : "md:ml-20"}
        `}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Sidebar;
