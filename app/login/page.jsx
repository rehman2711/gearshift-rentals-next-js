"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loader from "@/app/loader";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <Loader />;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    // ADMIN CHECK
    if (username === "admin" && password === "admin") {
      router.push("/login/admin");
      return;
    }

    console.log("Login attempted:", username, password);
  };

  return (
    <div
      className="min-h-screen w-full bg-white text-white flex flex-col"
      style={{
        backgroundImage: `
          /* TOP — subtle pattern texture */
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 20px,
            rgba(75, 85, 99, 0.08) 20px,
            rgba(75, 85, 99, 0.08) 21px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 30px,
            rgba(107, 114, 128, 0.06) 30px,
            rgba(107, 114, 128, 0.06) 31px
          ),
          repeating-linear-gradient(
            60deg,
            transparent,
            transparent 40px,
            rgba(55, 65, 81, 0.05) 40px,
            rgba(55, 65, 81, 0.05) 41px
          ),
          repeating-linear-gradient(
            150deg,
            transparent,
            transparent 35px,
            rgba(31, 41, 55, 0.04) 35px,
            rgba(31, 41, 55, 0.04) 36px
          ),
      
          /* MIDDLE — soft color glow */
          radial-gradient(circle 600px at 0% 200px, #fef3c7, transparent),
          radial-gradient(circle 600px at 100% 200px, #fef3c7, transparent)
        `,
      }}
    >
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between py-20 gap-20">
        {/* RIGHT SIDE IMAGE */}
        <div className="flex-1 hidden lg:flex justify-end">
          <div
            className="w-[850px] h-[450px] rounded-2xl bg-cover bg-center shadow-2xl"
            style={{
              backgroundImage: "url('/login-car.jpg')",
            }}
          />
        </div>

        {/* LEFT SECTION */}
        <div className="flex-1 max-w-md space-y-8">
          <h1 className="text-4xl font-semibold text-black">Welcome Back</h1>

          <p className="text-neutral-600 text-lg -mt-3">
            Login to continue your journey.
          </p>

          {/* GOOGLE LOGIN */}
          <Button className="w-full py-5 bg-neutral-900 border border-neutral-700 rounded-xl flex items-center justify-center gap-3 hover:bg-neutral-800 transition">
            <img src="/google-color.svg" className="w-5 h-5" />
            <span className="text-white">Continue with Google</span>
          </Button>

          {/* OR */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-neutral-800" />
            <span className="text-neutral-600 text-sm">or</span>
            <div className="h-px flex-1 bg-neutral-800" />
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* USERNAME */}
            <Input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-5 bg-transparent border border-neutral-700 rounded-xl focus:border-1 !focus:ring-1 !ring-yellow-300 focus:ring-1 outline-none text-black"
            />

            {/* PASSWORD */}
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-5 bg-transparent border border-neutral-700 rounded-xl focus:border-1 !focus:ring-1 !ring-yellow-300  outline-none text-black"
            />

            <div className="text-right">
              <Button
                type="button"
                className="text-white hover:text-white text-sm"
                onClick={() => router.push("/forgot-password")}
              >
                Forgot password ?
              </Button>
            </div>

            {/* LOGIN BUTTON */}
            <Button
              type="submit"
              className="w-full bg-yellow-300/80 text-black hover:bg-yellow-300/70"
            >
              Login
            </Button>
          </form>

          <p className="text-neutral-600 text-sm pt-4">
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
