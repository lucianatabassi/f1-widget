import { useState, useEffect } from "react";
import InfoSection from "./InfoSection";
import { RaceLayout } from "./RaceLayout";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@heroui/react";

import imgDefault from "../assets/circuitos/albert_park.svg";

export const Carrusel = () => {
  const previousWinners = {
    "albert_park": "norris",
    "shanghai": "piastri", 
    "suzuka": "verstappen", 
    "bahrain": "piastri", 
    "jeddah": "piastri", 
    "miami": "piastri", 
    "imola": "verstappen", 
    "monaco": "norris", 
    "catalunya": "piastri", 
    "villeneuve": "russell", 
    "red_bull_ring": "norris", 
    "silverstone": "norris", 
    "spa": "piastri", 
    "hungaroring": "norris", 
    "zandvoort": "piastri", 
    "monza": "verstappen", 
    "baku": "verstappen", 
    "marina_bay": "russell",
    "americas": "verstappen", 
    "rodriguez": "norris", 
    "interlagos": "norris", 
    "las_vegas": "verstappen", 
    "losail": "verstappen", 
    "yas_marina": "verstappen",
  };

  const [carreras, setCarreras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indiceActual, setIndiceActual] = useState(0);

  const imagenesRaw = import.meta.glob("../assets/circuitos/*.svg", {
    eager: true,
  });

  const mapaImagenes = Object.keys(imagenesRaw).reduce((accumulator, path) => {
    const nombreArchivo = path.split("/").pop().replace(".svg", "");

    accumulator[nombreArchivo] = imagenesRaw[path].default;
    return accumulator;
  }, {});

  const winnersRaw = import.meta.glob ("../assets/ganadores/*.png", {
    eager: true
  });

  const circuitWinners = Object.keys(winnersRaw).reduce((acc, path) => {
    const nombreImagen = path.split("/").pop().replace(".png", "").toLowerCase();;
    acc[nombreImagen] = winnersRaw[path].default;
    return acc;
  }, {})

  useEffect(() => {
    fetch("https://api.jolpi.ca/ergast/f1/current.json")
      .then((res) => res.json())
      .then((data) => {
        const listaOriginal = data.MRData.RaceTable.Races;

        const carrerasFormateadas = listaOriginal.map((race) => {
          // 1. FECHA CARRERA (DOMINGO)
          const fechaCarrera = new Date(`${race.date}T${race.time}`);
          const hoy = new Date();

          // 2. FECHA INICIO (VIERNES) - CÁLCULO AUTOMÁTICO
          let fechaInicio;
          // Si la API trae la Práctica 1, usamos esa fecha
          if (race.FirstPractice) {
            fechaInicio = new Date(
              `${race.FirstPractice.date}T${race.FirstPractice.time}`,
            );
          } else {
            // Si no, restamos 2 días al domingo matemáticamente
            fechaInicio = new Date(fechaCarrera);
            fechaInicio.setDate(fechaCarrera.getDate() - 2);
          }

          // 3. ESTADO
          let estado = "calendar";
          if (hoy > fechaCarrera) estado = "finished";
          if (hoy.toDateString() === fechaCarrera.toDateString())
            estado = "live";

          const imagenAutomatica = mapaImagenes[race.Circuit.circuitId];
          const nombreGanador = previousWinners[race.Circuit.circuitId];
          const imagenGanador = nombreGanador ? circuitWinners[nombreGanador] : null;

          return {
            id: race.round,
            pais: race.Circuit.Location.country,
            circuito: race.Circuit.circuitName,

            // FORMATO HORARIO: "DOM 15:00 HS"
            horario: fechaCarrera.toLocaleString("es-ES", {
              weekday: "long",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true, // F1 usa formato 24hs
            }),

            // DATOS PARA STATUS COLUMN (RANGO DE FECHAS)
            // Esto genera el "05 - 08"
            date: `${fechaInicio.toLocaleDateString("es-ES", { day: "2-digit" })} - ${fechaCarrera.toLocaleDateString("es-ES", { day: "2-digit" })}`,

            month: fechaCarrera
              .toLocaleDateString("es-ES", { month: "short" })
              .replace(".", ""), // "mar"
            status: estado,
            imagen: imagenAutomatica || imgDefault,
            ganador: imagenGanador,
            raw: race,
          };
        });

        setCarreras(carrerasFormateadas);
        setLoading(false);
      })
      .catch((err) => console.error("Error cargando F1:", err));
  }, []);

  // ... Resto de tu código de navegación y renderizado igual ...
  const siguiente = () => {
    setIndiceActual((prev) => (prev === carreras.length - 1 ? 0 : prev + 1));
  };

  const anterior = () => {
    setIndiceActual((prev) => (prev === 0 ? carreras.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white font-f1 animate-pulse">
        Cargando Temporada...
      </div>
    );
  }

  const data = carreras[indiceActual];

 {/* return (
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
          ganador={data.ganador}
        />
      )}

      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          isIconOnly
          radius="full"
          variant="flat"
          onPress={anterior}
          className="bg-black/50 text-white hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-all backdrop-blur-md"
        >
          <ChevronLeft size={24} />
        </Button>
      </div>

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
  ); */}

   return (
    <div className="relative w-full h-full group">
      
      {/* --- COMENTA ESTA LÓGICA TEMPORALMENTE --- */}
      {/* {data.status === "live" ? ( */}
        
        {/* FUERZA QUE SIEMPRE SE VEA ESTE */}
        <RaceLayout raceData={data} />

      {/* ) : (
        <InfoSection ... />
      )} */}

      {/* ... botones ... */}
    </div>
  ); 
};
