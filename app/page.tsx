"use client";

import dynamic from "next/dynamic";
import ChatSidebar from "../components/ChatSidebar";

const Canvas = dynamic(() => import("../components/Canvas"), { ssr: false });

export default function Home() {
  return (
    <main className="flex h-screen w-screen overflow-hidden">
      <div className="flex-1 relative">
        <Canvas />
      </div>
      <ChatSidebar />
    </main>
  );
}
