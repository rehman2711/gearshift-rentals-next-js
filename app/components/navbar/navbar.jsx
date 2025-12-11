"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";
import { Button } from "@/components/retroui/Button";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();

  console.log("Current path:", path);

  const topNavItems = [
    { title: "Models", href: "/models" },
    { title: "Gallary", href: "/gallary" },
    { title: "About", href: "/about" },
    { title: "Contacts", href: "/contact" },
    { title: "Book_Now", href: "/book_now" },
  ];

  return (
    <nav className="sticky top-0 right-0 z-10 w-full border-b bg-background z-100">
      <div className="container mx-auto max-w-6xl px-4 lg:px-0">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl text-black"
          >
            <Settings />
            <span className=" text-foreground">Gearshift</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            {topNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-base  hover:underline decoration-yellow-400 underline-offset-8 decoration-2 transition-all duration-300 focus:decoration-red-400"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-4 md:hidden">
            <HamburgerMenu />
          </div>

          {/* Desktop Login Button */}
          <div className="hidden lg:flex items-center space-x-3">
            {path !== "/login" &&
              path !== "/login/admin" &&
              path !== "/login/admin/dashboard" &&
              path !== "/login/admin/form" &&
              path !== "/login/admin/manage_data" &&
              path !== "/login/admin/view_bookings" && (
                <Button
                  variant="outline"
                  size="sm"
                  className=" text-sm px-4 py-2 bg-yellow-400 border border-gray-300 rounded-md hover:bg-yellow-300 transition-all"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  Login as Admin
                </Button>
              )}
            {(path === "/login/admin" ||
              path === "/login/admin/dashboard" ||
              path === "/login/admin/form" ||
              path === "/login/admin/manage_data" ||
              path === "/login/admin/view_bookings") && (
              <div className="hidden lg:flex items-center space-x-3">
                {
                  <Button
                    variant="outline"
                    size="sm"
                    className=" text-sm px-4 py-2 bg-green-400 border border-gray-300 rounded-md hover:bg-green-500 transition-all"
                  >
                    You logged in as admin
                  </Button>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
