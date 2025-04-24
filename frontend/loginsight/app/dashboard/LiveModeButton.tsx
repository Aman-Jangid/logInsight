"use client";

import dynamic from "next/dynamic";
import { CircleDot } from "lucide-react";
import { useState } from "react";

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import animationData from "../../public/animations/livemode.json";

const LiveModeButton = () => {
  const [isLive, setIsLive] = useState(false);

  return (
    <button
      onClick={() => setIsLive(!isLive)}
      className="relative w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center"
    >
      {isLive ? (
        <Lottie
          animationData={animationData}
          loop
          className="absolute w-10 h-10"
        />
      ) : (
        <CircleDot size={24} className="text-gray-400" />
      )}
    </button>
  );
};

export default LiveModeButton;
