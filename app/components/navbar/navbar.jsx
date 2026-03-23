"use client";

import Link from "next/link";
import MobileMenuToggle from "./mobile-menu-toggle";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { WebNavbarItems } from "@/app/configs/web-nav";
import { useAuth } from "@/contexts/authContext/page";
import { doSignOut, doPasswordReset } from "@/firebase/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();

  const { userLoggedIn, currentUser, loading } = useAuth();

  /* ---------------- ADMIN ROUTES ---------------- */
  const adminBase = "/login/admin";

  // const isAdminRoute = path.startsWith(adminBase);

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
            <div className="flex items-center space-x-3">
              {userLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {loading ? "User" : currentUser?.displayName}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel className="flex justify-between items-center px-4">
                        <span> My Account</span>{" "}
                        <span className="md:hidden">
                          {" "}
                          <ModeToggle />
                        </span>
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Username : {currentUser?.displayName}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Email : {currentUser?.email}
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    {/* <DropdownMenuSeparator /> */}
                    <div className="flex justify-between px-4 my-2">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="hover:bg-red-600/80 mx-2"
                          >
                            Logout
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              You want to logout from the application ,
                            </AlertDialogDescription>
                            <AlertDialogDescription>
                              You can login again , we save your progress .
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                doSignOut();
                              }}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                      <Button
                        variant="default"
                        className="bg-green-400 hover:bg-green-500/90"
                        size="sm"
                        onClick={() => {
                          doPasswordReset(currentUser?.email);
                          router.push("/");
                          toast.success("Password Link Sent On Email");
                        }}
                      >
                        Reset Password
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="outline" onClick={() => router.push("/login")}>
                  Login
                </Button>
              )}
            </div>{" "}
          </div>

          {/* Desktop Login / Admin Status */}
          <div className="hidden lg:flex items-center space-x-3">
            {userLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {currentUser?.displayName || `User`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="flex justify-between items-center px-4">
                      <span> My Account</span>{" "}
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        Username : {currentUser?.displayName}
                      </DropdownMenuItem>
                    <DropdownMenuItem>
                      Email : {currentUser?.email}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  {/* <DropdownMenuSeparator /> */}
                  <div className="flex justify-between px-4 my-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="hover:bg-red-600/80 mx-2"
                        >
                          Logout
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            You want to logout from the application ,
                          </AlertDialogDescription>
                          <AlertDialogDescription>
                            You can login again , we save your progress .
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              doSignOut();
                            }}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <Button
                      variant="default"
                      className="bg-green-400 hover:bg-green-500/90"
                      size="sm"
                      onClick={() => {
                        doPasswordReset(currentUser?.email);
                        router.push("/");
                        toast.success("Password Link Sent On Email");
                      }}
                    >
                      Reset Password
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" onClick={() => router.push("/login")}>
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
