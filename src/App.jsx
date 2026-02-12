import { useState } from "react";
import { Carrusel } from "./components/Carrusel";

export default function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950">
     <div className="
  relative
  w-[920px] h-[520px]
  rounded-[32px]
  overflow-hidden
  border border-white/10
  shadow-[0_40px_120px_rgba(0,0,0,0.9)]
  bg-[radial-gradient(140%_120%_at_75%_30%,rgba(255,255,255,0.08)_0%,transparent_55%),linear-gradient(145deg,#050505,#0e0e0e_45%,#1b1b1b)]
">


        <Carrusel />
      </div>
    </div>
  );
}
