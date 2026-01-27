"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/loader";

const NotifyMe = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Notification requested for:", email);
    setSubmitted(true);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen px-4 py-8 dark:bg-black/50 dark:text-white"
      style={{
        background: `
          repeating-linear-gradient(
            45deg,
            rgba(16, 185, 129, 0.06) 0,
            rgba(16, 185, 129, 0.06) 1px,
            transparent 1px,
            transparent 20px
          ),
          repeating-linear-gradient(
            -45deg,
            rgba(6, 182, 212, 0.06) 0,
            rgba(6, 182, 212, 0.06) 1px,
            transparent 10px,
            transparent 15px
          ),
          radial-gradient(ellipse 120% 80% at 70% 20%, rgba(16, 185, 129, 0.14), transparent 50%),
          radial-gradient(ellipse 100% 60% at 30% 10%, rgba(6, 182, 212, 0.16), transparent 60%),
          radial-gradient(ellipse 90% 70% at 50% 0%, rgba(56, 189, 248, 0.14), transparent 65%),
          radial-gradient(ellipse 110% 50% at 80% 30%, rgba(34, 197, 94, 0.10), transparent 40%),
          rgb(254, 250, 250)
        `,
        backgroundSize: "40px 40px, 40px 40px, auto, auto, auto, auto, auto",
      }}
    >
      <div className="bg-white w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-2xl shadow-lg">
        <h2 className="text-center mb-2 font-bold text-xl sm:text-2xl">
          Stay Updated!
        </h2>

        {submitted ? (
          <div className="text-green-600 text-center mt-4 font-medium text-sm sm:text-base">
            Thank you! You’ll be notified soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-500 text-center mb-4 text-sm sm:text-base">
              Enter your email to be notified when new cars become available.
            </p>

            <input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
            />

            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
            >
              Notify Me
            </button>
          </form>
        )}

        {submitted && (
          <div className="text-center">
            <button
              onClick={() => router.push("/")}
              className="w-full bg-green-600 text-white py-2 rounded-lg mt-6 hover:bg-green-700 transition text-sm sm:text-base"
            >
              Go To Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotifyMe;
