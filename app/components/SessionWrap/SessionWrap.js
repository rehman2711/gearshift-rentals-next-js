"use client";
import { SessionProvider } from "next-auth/react";

import React from "react";

const SessionWrap = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionWrap;