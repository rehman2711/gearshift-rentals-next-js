"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { useId } from "react";

import HamburgerMenu from "./HamburgerMenu";
import { Button } from "@/components/retroui/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/ui/revola";

export default function Navbar() {
  const id = useId();

  const topNavItems = [
    { title: "Models", href: "/models" },
    { title: "Gallary", href: "/gallary" },
    { title: "About", href: "/about" },
    { title: "Contacts", href: "/contact" },
    { title: "Inquiry", href: "/inquiry" },
  ];

  return (
    <nav className="sticky top-0 right-0 z-10 w-full border-b bg-background">
      <div className="container mx-auto max-w-6xl px-4 lg:px-0">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl text-black"
          >
            <Settings />
            <span className="font-mono text-foreground">Gearshift</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-10">
            {topNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-base font-mono hover:underline decoration-yellow-400 underline-offset-8 decoration-2 transition-all duration-300 focus:decoration-red-400"
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
            <ResponsiveDialog>
              <ResponsiveDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="font-mono text-sm px-4 py-2 bg-yellow-400 border border-gray-300 rounded-md hover:bg-yellow-300 transition-all"
                >
                  Login
                </Button>
              </ResponsiveDialogTrigger>

              <ResponsiveDialogContent className="sm:max-w-sm">
                <div className="p-6 space-y-5 overflow-y-auto">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className="flex size-11 items-center justify-center rounded-full border"
                      aria-hidden="true"
                    >
                      <svg
                        className="stroke-zinc-800 dark:stroke-zinc-100"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 32 32"
                        aria-hidden="true"
                      >
                        <circle
                          cx="16"
                          cy="16"
                          r="12"
                          fill="none"
                          strokeWidth="8"
                        />
                      </svg>
                    </div>
                    <ResponsiveDialogHeader className="sm:text-center">
                      <ResponsiveDialogTitle>
                        Welcome back
                      </ResponsiveDialogTitle>
                      <ResponsiveDialogDescription>
                        Enter your credentials to login to your account.
                      </ResponsiveDialogDescription>
                    </ResponsiveDialogHeader>
                  </div>

                  {/* Login Form */}
                  <form className="space-y-5">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${id}-email`}>Email</Label>
                        <Input
                          required
                          type="email"
                          id={`${id}-email`}
                          placeholder="hi@yourcompany.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`${id}-password`}>Password</Label>
                        <Input
                          required
                          type="password"
                          id={`${id}-password`}
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Checkbox id={`${id}-remember`} />
                        <Label
                          htmlFor={`${id}-remember`}
                          className="font-normal text-muted-foreground"
                        >
                          Remember me
                        </Label>
                      </div>
                      <a
                        className="text-sm underline hover:no-underline"
                        href="#"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <Button type="submit" className="w-full">
                      Sign in
                    </Button>
                  </form>

                  <div className="flex items-center gap-3 before:flex-1 before:h-px before:bg-border after:flex-1 after:h-px after:bg-border">
                    <span className="text-xs text-muted-foreground">Or</span>
                  </div>

                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                </div>
              </ResponsiveDialogContent>
            </ResponsiveDialog>
          </div>
        </div>
      </div>
    </nav>
  );
}
