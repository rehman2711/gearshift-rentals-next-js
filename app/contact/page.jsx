"use client";
import React, { useEffect, useState } from "react";
import Container from "@/app/components/Container";
import {
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Phone,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Loader from "@/app/loader";

const Contact = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (showLoader) return <Loader />;

  return (
    <div className="pt-6 sm:pt-8">
      <Container>
        <div className="w-full mx-auto max-w-5xl">
          <div className="container mx-auto my-8 sm:my-10 py-6 sm:py-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10">
              {/* LEFT */}
              <div className="md:col-span-6 bg-white rounded-3xl shadow-lg p-5 sm:p-6 dark:bg-black/80">
                <h2 className="font-semibold text-xl sm:text-2xl">
                  Get In Touch
                </h2>
                <p className="text-sm sm:text-base mt-3 font-medium text-gray-700 dark:text-white sm:pr-10">
                  Have questions or feedback? Contact us — we are here to help!
                </p>

                <div className="flex flex-col gap-8 sm:gap-10 mt-8 sm:mt-10">
                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="bg-yellow-400/80 hover:bg-purple-400/90 p-2 rounded-lg">
                      <Mail className="text-white" />
                    </div>
                    <div>
                      <h5 className="text-sm sm:text-base font-semibold">
                        Email
                      </h5>
                      <span className="text-sm sm:text-base">
                        info@gearshift.com
                      </span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="bg-yellow-400/80 hover:bg-green-400/90 p-2 rounded-lg">
                      <Phone className="text-white " />
                    </div>
                    <div>
                      <h5 className="text-sm sm:text-base font-semibold">
                        Phone
                      </h5>
                      <span className="text-sm sm:text-base">
                        +91 9021100100
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT — FORM */}
              <div className="md:col-span-6 ">
                <form className="rounded-3xl shadow-lg bg-white dark:bg-black/80">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 sm:p-8">
                    {/* First Name */}
                    <div className="flex flex-col">
                      <Label className="font-semibold text-sm sm:text-base mb-2">
                        First Name
                      </Label>
                      <Input placeholder="First Name" />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col">
                      <Label className="font-semibold text-sm sm:text-base mb-2">
                        Last Name
                      </Label>
                      <Input placeholder="Last Name" />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <Label className="font-semibold text-sm sm:text-base mb-2">
                        Email Address
                      </Label>
                      <Input type="email" placeholder="Enter Email" />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                      <Label className="font-semibold text-sm sm:text-base mb-2">
                        Phone Number
                      </Label>
                      <Input placeholder="Enter Mobile Number" />
                    </div>

                    {/* Message */}
                    <div className="md:col-span-2 flex flex-col">
                      <Label className="font-semibold text-sm sm:text-base mb-2">
                        Message Here
                      </Label>
                      <Textarea placeholder="Enter Your Message Here" />
                    </div>

                    {/* FOOTER */}
                    <div className="md:col-span-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-4">
                      <Button className="bg-yellow-400/80 hover:bg-yellow-400/90 text-white w-full sm:w-auto">
                        Send Message
                      </Button>

                      <div className="flex gap-3 flex-wrap">
                        <Button className="bg-yellow-400 hover:bg-blue-400 text-white rounded-full">
                          <Twitter />
                        </Button>
                        <Button className="bg-yellow-400 hover:bg-pink-500 text-white rounded-full">
                          <Instagram />
                        </Button>
                        <Button className="bg-yellow-400 hover:bg-blue-500 text-white rounded-full">
                          <Facebook />
                        </Button>
                        <Button className="bg-yellow-400 hover:bg-green-400 text-white rounded-full">
                          <MessageCircle />
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
