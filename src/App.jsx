import { useState } from "react";
import { Carrusel } from "./components/Carrusel";

export default function App() {
  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950">
      <div
        className="
        relative
        w-[920px] h-[520px]
        rounded-[32px]
        shadow-[0_40px_120px_rgba(0,0,0,0.9)]
        
        /* El p-[1px] empuja el contenido hacia adentro, creando el grosor del borde */
        p-[1px] 
        
        bg-[linear-gradient(120deg,#000000_0%,#1D1717_66%,#580000_100%)]
      "
      >
        <div
          className="
          relative 
          w-full h-full 
          
          /* Restamos 1px al redondeo (32 - 1 = 31) para que encaje perfecto en las esquinas */
          rounded-[31px] 
          overflow-hidden
          
          /* Este es el fondo oscuro rojizo que diseñaste para tu tarjeta */
          bg-[linear-gradient(120deg,#040404_0%,#111111_58%,#270C0CC7_72%,#32000024_100%)]
        "
        >
          <Carrusel />
        </div>
      </div>
    </div>
  );
}
