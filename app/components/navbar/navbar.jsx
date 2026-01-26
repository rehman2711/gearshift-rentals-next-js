"use client";

import Link from "next/link";
import MobileMenuToggle from "./mobile-menu-toggle";
import { Button } from "@/components/retroui/Button";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { WebNavbarItems } from "@/app/configs/web-nav";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();

  /* ---------------- ADMIN ROUTES ---------------- */
  const adminBase = "/login/admin";

  const isAdminRoute = path.startsWith(adminBase);

  const { data: session, status } = useSession();

  // console.log("Navbar session:", session.user.email);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur dark:bg-black/80 border-gray-200 dark:border-gray-700">
      <div className="container mx-auto max-w-6xl px-4 lg:px-0">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl text-black"
          >
            <span className="text-foreground font-brunoAce font-bold ">
              Gearshift
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            {WebNavbarItems.map((item) => {
              const isActive = path === item.href;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`relative text-base transition-all duration-300
                    ${
                      isActive
                        ? "after:absolute after:left-0 after:-bottom-2 after:h-[3px] after:w-full after:bg-yellow-400"
                        : "hover:after:absolute hover:after:left-0 hover:after:-bottom-2 hover:after:h-[3px] hover:after:w-full hover:after:bg-green-400"
                    }
                  `}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center space-x-4 md:hidden">
            <MobileMenuToggle />
            <ModeToggle />
          </div>

          {/* Desktop Login / Admin Status */}
          <div className="hidden lg:flex items-center space-x-3">
            {session?.user?.email ? (
              <Avatar>
                <AvatarImage src={session?.user?.image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-sm px-4 py-2 bg-green-400/80 border border-gray-300 rounded-md hover:bg-green-400/70 transition-all"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
