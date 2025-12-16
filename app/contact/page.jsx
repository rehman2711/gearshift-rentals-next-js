"use client"
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
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import Loader from "@/app/loader";

const Contact = () => {
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
  return (
    <>
    <div className="pt-8">
      <Container>
        <div className="h-screen w-full mx-auto max-w-5xl">
          <div className="container mx-auto my-10 py-10 px-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              {/* Left Section */}
              <div className="md:col-span-6 bg-white rounded-3xl shadow-lg p-6">
                  <h2 className="font-semibold text-2xl">Get In Touch</h2>
                  <p className="text-base pr-10 mt-3 font-medium text-gray-700">
                    Have questions or feedback? Contact us — we are here to
                    help!
                  </p>

                <div className="flex flex-col gap-10 mt-10">
                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="bg-yellow-400 p-2 rounded-lg">
                      <Mail className="text-white" />
                    </div>
                    <div>
                      <h5 className="text-base font-semibold">Email</h5>
                      <span className="text-base">info@gearshift.com</span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="bg-yellow-400 p-2 rounded-lg">
                      <Phone className="text-white" />
                    </div>
                    <div>
                      <h5 className="text-base font-semibold">Phone</h5>
                      <span className="text-base">+91 9021100158</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section — Form */}
              <div className="md:col-span-6">
                <form className="rounded-3xl shadow-lg bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                    {/* First Name */}
                    <div className="flex flex-col">
                      <Label className="font-semibold text-base mb-2">
                        First Name
                      </Label>
                      <Input
                        type="text"
                        placeholder="First Name"
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col">
                      <Label className="font-semibold text-base mb-2">
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        placeholder="Last Name"
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                      <Label className="font-semibold text-base mb-2">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        placeholder="Enter Email"
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col">
                      <Label className="font-semibold text-base mb-2">
                        Phone Number
                      </Label>
                      <Input
                        type="text"
                        placeholder="Enter Mobile Number"
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      />
                    </div>

                    {/* Message */}
                    <div className="col-span-2 flex flex-col">
                      <Label className="font-semibold text-base mb-2">
                        Message Here
                      </Label>
                      <Textarea placeholder="Enter Your Message Here"></Textarea>
                    </div>

                    {/* Footer Buttons */}
                    <div className="col-span-2 flex justify-between items-center mt-4">
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        Send Message
                      </Button>

                      <div className="flex gap-3">
                        <Button className="bg-yellow-400 text-white px-5 py-3 rounded-full cursor-pointer">
                          <Twitter />{" "}
                        </Button>
                        <Button className="bg-yellow-400 text-white px-5 py-3 rounded-full cursor-pointer">
                          <Instagram />{" "}
                        </Button>
                        <Button className="bg-yellow-400 text-white px-5 py-3 rounded-full cursor-pointer">
                          <Facebook />{" "}
                        </Button>
                        <Button className="bg-yellow-400 text-white px-5 py-3 rounded-full cursor-pointer">
                          <MessageCircle />{" "}
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
    </>
  );
};

export default Contact;
