import { useState } from "react";
import InfoSection from "./components/InfoSection";
import { RaceLayout } from "./components/RaceLayout";

import circuitoAustralia from "./assets/circuitos/australiagp.svg";
import imagenColapinto from "./assets/circuitos/colapinto.png";

export default function App() {
  const [currentStatus, setCurrentStatus] = useState("calendar");


  return (
    <div className="flex h-screen items-center justify-center bg-zinc-950">
      <div className="w-[880px] h-[520px] bg-black rounded-[32px] overflow-hidden border border-zinc-800 shadow-2xl">
       

          <RaceLayout/>
        

        
        
      {/*  <InfoSection
          pais="Australia"
          circuito="QATAR AIRWAYS AUSTRALIAN GRAND PRIX"
          horario="10:00 am - 12:00 pm"
          image={circuitoAustralia}
        />

        <div className="flex w-full h-auto items-end justify-end">
          <img src={imagenColapinto} alt="" className="w-full h-auto object-cover" />
        </div>*/}
        

        
      </div>
    </div>
  );
}
