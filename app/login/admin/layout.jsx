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

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `
          radial-gradient(circle 600px at 0% 200px, #fef3c7, transparent),
          radial-gradient(circle 600px at 100% 200px, #fef3c7, transparent)
        `,
      }}
    >
      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-16 left-0 z-20
          h-[calc(100vh-4rem)]
          ${open ? "w-60" : "w-20"}
          bg-white text-black
          transition-all duration-300
          flex flex-col
          border-r
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <Link href="/login/admin">
            <h1 className={`text-xl font-extrabold ${!open && "hidden"}`}>
              Admin
            </h1>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className={`${!open && "mx-auto"}`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 mt-2 space-y-1 mx-auto`}>
          <SidebarLink
            href="/login/admin/dashboard"
            label="Dashboard"
            icon={<LayoutDashboard size={20} />}
            open={open}
            pathname={pathname}
          />

          <SidebarLink
            href="/login/admin/form"
            label="Form"
            icon={<FileEdit size={20} />}
            open={open}
            pathname={pathname}
          />

          <SidebarLink
            href="/login/admin/manage_data"
            label="Manage Data"
            icon={<Database size={20} />}
            open={open}
            pathname={pathname}
          />

          <SidebarLink
            href="/login/admin/view_bookings"
            label="View Bookings"
            icon={<ClipboardList size={20} />}
            open={open}
            pathname={pathname}
          />

          <SidebarLink
            href="/login/admin/completed_bookings"
            label="Approved Bookings"
            icon={<Check size={20} />}
            open={open}
            pathname={pathname}
          />
        </nav>

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="
            p-4 border-t cursor-pointer
            hover:bg-red-600 hover:text-white
            transition flex items-center gap-3
          "
        >
          <LogOut size={20} />
          <span className={`${!open && "hidden"}`}>Logout</span>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main
        className={`
          px-6 py-8
          transition-all duration-300
          ${open ? "ml-63 me-4" : "ml-20"}
        `}
      >
        {children}
      </main>
    </div>
  );
}

/* ---------------- Sidebar Link Component ---------------- */

function SidebarLink({ href, label, icon, open, pathname }) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        flex items-center gap-4 px-6 py-3 text-sm rounded-md transition
        ${
          isActive
            ? "bg-yellow-400/20 text-yellow-700 font-semibold"
            : "text-gray-700 hover:bg-black/10"
        }
      `}
    >
      <span>{icon}</span>
      <span className={`${!open && "hidden"}`}>{label}</span>
    </Link>
  );
}
