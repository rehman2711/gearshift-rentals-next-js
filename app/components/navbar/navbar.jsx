"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, GithubIcon, MoonIcon, SunIcon } from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";
import { Button } from "@/components/retroui/Button";
import { Text } from "@/components/retroui/Text";

export default function Navbar() {
  // ✅ Correct structure
  const topNavItems = [
    {
      title: "Our Fleets",
      href: "/ourfleets",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contacts",
      href: "/contact",
    },
    {
      title: "Inquiry",
      href: "/inquiry",
    },
  ];

  return (
    <nav className="sticky z-1 top-0 right-0 w-full border-b-2 bg-background">
      <div className="container max-w-6xl px-4 lg:px-0 mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="shrink-0">
            <a
              href="/"
              className="text-black font-head text-2xl flex items-end"
            >
              <Image
                src="/logo.png"
                alt="retro ui logo"
                className="mr-2"
                height={30}
                width={30}
              />
              <div className="text-foreground">Gearshift</div>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-10">
            {topNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="hover:underline decoration-yellow-400 underline-offset-8 decoration-2 text-[15px] transition-all"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 lg:hidden">
            <Link
              href="https://github.com/Logging-Stuff/retroui"
              target="_blank"
              rel="noopener noreferrer"
            ></Link>
            <HamburgerMenu />
          </div>

          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/"
              // target="_blank"
            >
              <Button
                variant="outline"
                size="sm"
                className="bg-yellow-400 border border-3 border-gray-300 rounded-md"
              >
                Rent Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
