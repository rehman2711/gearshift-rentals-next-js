"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "@/firebase/auth";

import { useAuth } from "@/contexts/authContext/page";

const Login = () => {
  const router = useRouter();
  const { userLoggedIn, currentUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  // set cookie function
  const setTokenCookie = (token) => {
    document.cookie = `token=${token}; path=/`;
  };

  // ---------- redirect ----------
  useEffect(() => {
    if (userLoggedIn) {
      router.replace("/");
      console.log(currentUser);
    }
  }, [userLoggedIn, router]);

  // ---------- error mapper ----------
  const getErrorMessage = (err) => {
    if (!err?.code) return "Something went wrong";

    switch (err.code) {
      case "auth/invalid-email":
        return "Invalid email";
      case "auth/user-not-found":
        return "User not found";
      case "auth/wrong-password":
        return "Wrong password";
      default:
        return "Login failed";
    }
  };

  // ---------- email login ----------
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (loading || googleLoading) return;

      setErrorMessage("");

      try {
        setLoading(true);

        await doSignInWithEmailAndPassword(email.trim(), password.trim());

        // ✅ get token
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const token = await user.getIdToken();

          setTokenCookie(token);
        }

        router.replace("/");
      } catch (err) {
        setErrorMessage(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    },
    [email, password, loading, googleLoading, router],
  );

  // ---------- google ----------
  const onGoogleSignIn = useCallback(
    async (e) => {
      e.preventDefault();

      if (loading || googleLoading) return;

      setErrorMessage("");

      try {
        setGoogleLoading(true);

        await doSignInWithGoogle();

        // get token by google login
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const token = await user.getIdToken();

          setTokenCookie(token);
        }

        router.replace("/");
      } catch (err) {
        setErrorMessage(getErrorMessage(err));
      } finally {
        setGoogleLoading(false);
      }
    },
    [loading, googleLoading, router],
  );

  return (
    <main
      className="
        w-full min-h-screen flex items-center justify-center
        bg-gray-100 dark:bg-black
      "
    >
      <div
        className="
          w-96 p-6 rounded-xl border shadow-xl space-y-5
          bg-white text-gray-800 border-gray-200
          dark:bg-black dark:text-gray-100 dark:border-gray-700
        "
      >
        <h3 className="text-xl font-semibold text-center">Welcome Back</h3>

        {/* form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label className="text-sm font-semibold mb-2">Email</Label>
            <Input
              type="email"
              required
              disabled={loading || googleLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label className="text-sm font-semibold mb-2">Password</Label>
            <Input
              type="password"
              required
              disabled={loading || googleLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm">{errorMessage}</div>
          )}

          <Button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full"
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link href="/register">
            {" "}
            <span className="hover:underline underline-offset-4">Sign up</span>
          </Link>
        </p>

        <div className="flex items-center gap-2">
          <div className="flex-1 border-b" />
          <span>OR</span>
          <div className="flex-1 border-b" />
        </div>

        <Button
          onClick={onGoogleSignIn}
          disabled={loading || googleLoading}
          className="w-full"
        >
          {googleLoading ? "Signing in..." : "Continue with Google"}
        </Button>
      </div>
    </main>
  );
};

export default Login;
