"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useAuth } from "../../contexts/authContext/page";
import { doCreateUserWithEmailAndPassword } from "../../firebase/auth";

import { updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.config"; // make sure this exists

const Register = () => {
  const router = useRouter();
  const { userLoggedIn } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // ---------- redirect ----------
  useEffect(() => {
    if (userLoggedIn) {
      router.replace("/");
    }
  }, [userLoggedIn, router]);

  // ---------- error mapper ----------
  const getErrorMessage = (err) => {
    if (!err?.code) return "Something went wrong";

    switch (err.code) {
      case "auth/email-already-in-use":
        return "Email already registered";
      case "auth/invalid-email":
        return "Invalid email";
      case "auth/weak-password":
        return "Password should be at least 6 characters";
      default:
        return "Registration failed";
    }
  };

  // ---------- submit ----------
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (loading) return;

      setErrorMessage("");

      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        return;
      }

      try {
        setLoading(true);

        const res = await doCreateUserWithEmailAndPassword(
          email.trim(),
          password.trim()
        );

        // ✅ set displayName after signup
        await updateProfile(auth.currentUser, {
          displayName: username.trim(),
        });

        router.replace("/");
      } catch (err) {
        setErrorMessage(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    },
    [email, password, confirmPassword, username, loading, router]
  );

  return (
    <main
      className="
        w-full min-h-screen flex items-center justify-center
        bg-gray-100 dark:bg-black
        transition-colors duration-300
      "
    >
      <div
        className="
          w-96 p-6 rounded-xl border shadow-xl space-y-5
          bg-white text-gray-800 border-gray-200
          dark:bg-black dark:text-gray-100 dark:border-gray-700
        "
      >
        <h3 className="text-xl font-semibold text-center">
          Create Account
        </h3>

        <form onSubmit={onSubmit} className="space-y-4">

          {/* Username */}
          <div>
            <Label className="text-sm font-semibold mb-2">
              Username
            </Label>

            <Input
              type="text"
              required
              disabled={loading}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <Label className="text-sm font-semibold mb-2">
              Email
            </Label>

            <Input
              type="email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <Label className="text-sm font-semibold mb-2">
              Password
            </Label>

            <Input
              type="password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <Label className="text-sm font-semibold mb-2">
              Confirm Password
            </Label>

            <Input
              type="password"
              required
              disabled={loading}
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm font-medium">
              {errorMessage}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="
              w-full py-2 rounded-lg text-white font-medium
              bg-indigo-600 hover:bg-indigo-700
              disabled:bg-gray-400
              transition
            "
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;