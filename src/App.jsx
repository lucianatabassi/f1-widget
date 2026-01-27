import { useState } from "react";
import { Carrusel } from "./components/Carrusel";

export default function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950">
      <div className="w-[880px] h-[520px] bg-linear-to-r from-[#151515] via-[#1C1B1B] to-[#222121] rounded-[32px] overflow-hidden border border-zinc-800 shadow-2xl">
        <Carrusel />
      </div>
    </div>
  );
}
