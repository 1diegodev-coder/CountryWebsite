"use client";

import dynamic from "next/dynamic";
import React from "react";

// Real component used in production
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

const GlobeWrapper = React.forwardRef((props: any, ref: any) => {
  return <Globe {...props} ref={ref} />;
});

GlobeWrapper.displayName = "GlobeWrapper";

export default GlobeWrapper;
