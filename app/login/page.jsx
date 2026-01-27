"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/app/loader";
import { signIn, signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showLoader) return <Loader />;

  const handleLogin = (e) => {
    e.preventDefault();

    // ADMIN CHECK
    if (username === "admin" && password === "admin") {
      signOut({ redirect: false });
      router.push("/login/admin");
      toast.success("Admin login detected. Redirecting...", { duration: 4000 });

      return;
    }

    console.log("Login attempted:", username, password);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center lg:justify-between py-16 sm:py-20 gap-12 lg:gap-20">
        {/* RIGHT IMAGE (DESKTOP ONLY) */}
        <div className="flex-1 hidden lg:flex justify-end">
          <div
            className="w-[750px] xl:w-[850px] h-[420px] xl:h-[450px] rounded-2xl bg-cover bg-center shadow-2xl"
            style={{ backgroundImage: "url('/login-car.jpg')" }}
          />
        </div>

        {/* LOGIN FORM */}
        <div className="flex-1 max-w-md w-full space-y-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-black dark:text-white">
            Welcome Back
          </h1>

          <p className="text-neutral-600 text-base sm:text-lg -mt-3 dark:text-white">
            Login to continue your journey.
          </p>

          {/* GOOGLE LOGIN */}
          <Button
            className="w-full py-4 sm:py-5 bg-neutral-900 border border-neutral-700 rounded-xl flex items-center justify-center gap-3 hover:bg-neutral-800 transition"
            onClick={() => {
              signIn("google", { callbackUrl: "/" });
            }}
          >
            <img src="/google-color.svg" className="w-5 h-5" />
            <span className="text-white text-sm sm:text-base">
              Continue with Google
            </span>
          </Button>

          {/* OR */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-800 dark:bg-white" />
            <span className="text-neutral-600 text-sm dark:text-white">or</span>
            <div className="h-px flex-1 bg-neutral-800 dark:bg-white" />
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-4 sm:py-5 bg- dark:bg-black/60 border border-neutral-700 rounded-xl outline-none text-black dark:text-white"
            />

            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-4 sm:py-5 bg-transparent dark:bg-black/60 border border-neutral-700 rounded-xl outline-none text-black dark:text-white"
            />

            <div className="text-right">
              <Button
                type="button"
                className="text-white hover:text-white text-sm hover:bg-green-500 hover:underline underline-offset-4 bg-green-400 dark:hover:bg-green-500/80 rounded"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot password ?
              </Button>
            </div>

            <Button
              type="submit"
              className="w-full bg-yellow-300/80 text-black hover:bg-yellow-300/70"
            >
              Login
            </Button>
          </form>

          <p className="text-neutral-600 text-sm pt-4 text-center sm:text-left dark:text-white">
            Don’t have an account?{" "}
            <button
              onClick={() => router.refresh()}
              className="text-black underline-offset-4 hover:underline decoration-yellow-500"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
