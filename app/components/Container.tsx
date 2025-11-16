import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="px-8 py-6 mt-8 font-mono">{children}</div>;
};

export default Container;
