"use client";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

const WebhookTrigger = () => {
  const fetchCarsData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/all-cars`,
      );
      console.log("Cars data:", response.data);
    } catch (error) {
      console.error("Error fetching cars data:", error);
    }
  };

  useEffect(() => {
    fetchCarsData();
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-custom-enter" : "animate-custom-leave"
          } font-sans max-w-lg w-full bg-white border border-gray-200 shadow-sm rounded-md pointer-events-auto flex`}
        >
          {/* Icon */}
          <div className="px-3 pt-3 text-red-600 text-sm">⏳</div>

          {/* Message */}
          <div className="flex-1 py-2 pr-3">
            <p className="text-sm font-bold text-gray-900">
              Initializing API
            </p>

            <p className="text-sm text-gray-600 leading-snug line-clamp-3">
              Please wait while the API initializes via the webhook. Free-tier
              deployments may take up to one minute to respond.
            </p>
          </div>

          {/* Dismiss */}
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-2 mx-2 text-xs font-medium text-gray-500 hover:text-gray-700 self-start my-auto hover:bg-red-200 hover:text-red-700 hover:underline underline-offset-2 rounded-md"
          >
            Dismiss
          </button>
        </div>
      ),
      { duration: 12000 },
    );
  }, []);

  return <></>;
};

export default WebhookTrigger;
