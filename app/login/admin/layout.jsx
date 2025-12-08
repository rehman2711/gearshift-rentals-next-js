"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Menu,
  X,
  FileEdit,
  Database,
  ClipboardList,
  LogOut,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* SIDEBAR */}
      <div
        className={`${
          open ? "w-60" : "w-20"
        } bg-white text-black transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <Link href="/login/admin">
            <h1 className={`text-xl font-extrabold ${!open && "hidden"}`}>
              Admin
            </h1>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className={`${!open && "mx-auto"} `}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* LINKS */}
        <nav className="flex-1 mt-3 space-y-1">
          <SidebarLink
            href="/login/admin/dashboard"
            label="Dashboard"
            open={open}
            icon={<LayoutDashboard size={20} />}
          />

          <SidebarLink
            href="/login/admin/form"
            label="Form"
            open={open}
            icon={<FileEdit size={20} />}
          />

          <SidebarLink
            href="/login/admin/manage_data"
            label="Manage Data"
            open={open}
            icon={<Database size={20} />}
          />

          <SidebarLink
            href="/login/admin/view_bookings"
            label="View Bookings"
            open={open}
            icon={<ClipboardList size={20} />}
          />
        </nav>

        {/* LOGOUT */}
        <div
          className="p-4 border-t border-gray-700 cursor-pointer hover:bg-red-600 transition flex items-center gap-3"
          onClick={handleLogout}
        >
          <LogOut size={22} />
          <span className={`${!open && "hidden"} text-md`}>Logout</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className={`flex-1 ${open ? "pl-8" : "ml-0"} p-6 bg-red-50`}>{children}</main>
    </div>
  );
}

/* COMPONENT - Sidebar link */
function SidebarLink({ href, label, open, icon }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 px-6 py-3 text-md hover:bg-black/15 transition duration-500 rounded-md active:bg-black/25"
    >
      {/* ICON always visible */}
      <span>{icon}</span>

      {/* LABEL hidden when collapsed */}
      <span className={`${!open && "hidden"}`}>{label}</span>
    </Link>
  );
}
