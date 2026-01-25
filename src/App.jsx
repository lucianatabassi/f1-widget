import { useState } from "react";
import { Carrusel } from "./components/Carrusel";

export default function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950">
      <div className="w-[880px] h-[520px] bg-black rounded-[32px] overflow-hidden border border-zinc-800 shadow-2xl">
        <Carrusel />
      </div>
    </div>
  );
}
