import { useState } from "react";
import InfoSection from "./InfoSection";
import { RaceLayout } from "./RaceLayout";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@heroui/react";

import { CarrerasData } from "../assets/CarrerasData";

export const Carrusel = () => {
  const [indiceActual, setIndiceActual] = useState(0);

  const siguiente = () => {
    setIndiceActual((prev) =>
      prev === CarrerasData.length - 1 ? 0 : prev + 1,
    );
  };

  const anterior = () => {
    setIndiceActual((prev) =>
      prev === 0 ? CarrerasData.length - 1 : prev - 1,
    );
  };

  const data = CarrerasData[indiceActual];

  return (
    <div className="relative w-full h-full group">
      {data.status === "live" ? (
        <RaceLayout raceData={data} />
      ) : (
        <InfoSection
          pais={data.pais}
          circuito={data.circuito}
          horario={data.horario}
          image={data.imagen}
          date={data.date}
          month={data.month}
          status={data.status}
        />
      )}

      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          isIconOnly
          radius="full"
          variant="flat"
          onPress={anterior} // HeroUI prefiere 'onPress' en vez de 'onClick'
          className="bg-black/50 text-white hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md"
        >
          <ChevronLeft size={24} />
        </Button>
      </div>

      {/* --- BOTÓN SIGUIENTE (HeroUI) --- */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          isIconOnly
          radius="full"
          variant="flat"
          onPress={siguiente}
          className="bg-black/50 text-white hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md"
        >
          <ChevronRight size={24} />
        </Button>
      </div>
    </div>
  );
};
