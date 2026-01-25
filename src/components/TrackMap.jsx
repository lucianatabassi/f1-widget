import { useEffect, useState } from "react";

export const TrackMap = ({ drivers }) => {
  // Esta es la "forma" del circuito en código SVG path.
  // Tip: Puedes conseguir estos paths en webs como wikimedia buscando "Circuit Name SVG"
  const trackPath = "M150 50 C 180 50, 250 80, 280 120 C 300 150, 300 200, 250 250 C 200 300, 100 300, 50 250 C 20 200, 20 150, 50 100 C 80 50, 120 50, 150 50 Z";

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-zinc-900/50 rounded-xl p-4 overflow-hidden">
      <svg viewBox="0 0 350 350" className="w-full h-full drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
        {/* Borde exterior del circuito (Glow) */}
        <path d={trackPath} fill="transparent" stroke="#333" strokeWidth="12" />
        {/* Línea central del circuito (Blanco) */}
        <path d={trackPath} fill="transparent" stroke="white" strokeWidth="2" />
      </svg>

      {/* 2. LOS PILOTOS (PUNTOS) */}
      {/* Superponemos un div del mismo tamaño para los pilotos */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 350 350" className="w-full h-full">
          {drivers.map((driver) => (
            <circle
              key={driver.id}
              r="6" // Tamaño del punto
              fill={driver.teamHex} // Color de la escudería
              stroke="white"
              strokeWidth="2"
              style={{
                // LA MAGIA: CSS offset-path
                // 1. Le decimos que siga el mismo camino que el circuito
                offsetPath: `path('${trackPath}')`,
                
                // 2. Le decimos en qué % del camino está (0% a 100%)
                // Usamos un valor ficticio 'lapProgress' o aleatorio si no tienes el dato
                offsetDistance: `${driver.lapProgress || 0}%`,
                
                // Transición suave al moverse
                transition: "offset-distance 1s linear"
              }}
            >
              {/* Tooltip simple al pasar el mouse (opcional) */}
              <title>{driver.abbreviation}</title>
            </circle>
          ))}
        </svg>
      </div>
      
      {/* Etiqueta del circuito */}
      <div className="absolute bottom-4 right-4 text-right">
        <h4 className="text-zinc-500 text-[10px] tracking-widest uppercase">Track Status</h4>
        <span className="text-green-500 font-bold font-f1 text-sm">GREEN FLAG</span>
      </div>
    </div>
  );
};