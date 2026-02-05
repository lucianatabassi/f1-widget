import { useEffect, useState } from "react";

export const TrackMap = ({ drivers }) => {
  const trackPath = "m14.303 54.81c-7.2586 16.136-7.0661 15.467-9.8782 34.322-2.5969 17.412-3.5275 15.26 14.18 32.841 8.8917 8.8279 14.803 15.25 14.648 15.914-0.14226 0.61248-2.8958 5.0125-6.1203 9.7766-9.859 14.567-9.4038 15.862 7.3215 20.846 25.015 7.4546 48.885 10.688 76.968 10.428 27.962-0.25946 34.415 2.1095 38.342 14.071 2.8101 8.5584-2.1545 8.1078 86.272 7.8144 63.777-0.2116 81.519-0.64863 83.567-2.0602 5.3008-3.6542 6.8644-8.4601 6.2506-19.219-0.78234-13.714-1.9355-13.524 28.794-4.762 10.39 2.9626 13.986 3.521 16.711 2.5957 6.4807-2.2009 21.472-29.916 25.06-46.326 0.97132-4.4429-4.053-8.2548-28.194-21.392-38.955-21.199-38.148-21.026-79.689-17.087-15.766 1.495-19.491 3.0793-28.331 12.05-11.014 11.176-45.853 15.005-66.093 7.2634-27.63-10.58-57.44-48.047-51.74-65.044 2.81-8.374-13.11-23.074-42.03-38.817-15.58-8.4808-32.6-6.3434-48.635 6.107-8.331 6.468-11.137 7.526-23.662 8.926-5.4498 0.42935-11.039 25.692-13.742 31.752z";

  // He calculado este viewBox específicamente para que el circuito ocupe todo el espacio horizontal
  // sin dejar márgenes gigantes.
  const correctedViewBox = "0 0 400 250"; 

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-zinc-900/50 rounded-xl overflow-hidden">
      
      {/* 1. EL DIBUJO DEL CIRCUITO (FONDO) */}
      <svg 
        viewBox={correctedViewBox}
        // CAMBIOS AQUÍ:
        // 1. preserveAspectRatio: Asegura que no se deforme.
        // 2. max-w/max-h: Usamos 85% en vez de full para dejar margen y que no se corte al rotar.
        preserveAspectRatio="xMidYMid meet"
        className="max-w-[85%] max-h-[85%] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] -rotate-90 origin-center transition-transform duration-500"
      >
        <path d={trackPath} fill="transparent" stroke="#333" strokeWidth="12" />
        <path d={trackPath} fill="transparent" stroke="white" strokeWidth="2" />
      </svg>

      {/* 2. LOS PILOTOS (PUNTOS) */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none bg-zinc-950/50 rounded-xl">
        <svg 
            viewBox={correctedViewBox}
            preserveAspectRatio="xMidYMid meet"
            className="max-w-[85%] max-h-[85%] -rotate-90 origin-center transition-transform duration-500"
        >
          {drivers.map((driver) => (
            <circle
              key={driver.id}
              r="8" // Aumenté un poquito el tamaño para que se vean mejor
              fill={driver.teamHex}
              stroke="white"
              strokeWidth="2"
              style={{
                offsetPath: `path('${trackPath}')`,
                offsetDistance: `${driver.lapProgress || 0}%`,
                transition: "offset-distance 1s linear"
              }}
            >
              <title>{driver.abbreviation}</title>
            </circle>
          ))}
        </svg>
      </div>
      
      {/* Etiqueta del circuito */}
      <div className="absolute bottom-4 right-4 text-right z-10">
        <h4 className="text-zinc-500 text-[10px] tracking-widest uppercase">Track Status</h4>
        <span className="text-green-500 font-bold font-f1 text-sm">GREEN FLAG</span>
      </div>
    </div>
  );
};