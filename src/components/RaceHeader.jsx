// 1. Diccionario de banderas
const flagStyles = {
  "Green": { text: "GREEN FLAG", color: "text-[#00FF11]" },
  "Yellow": { text: "YELLOW FLAG", color: "text-[#FFE600]" },
  "Red": { text: "RED FLAG", color: "text-[#FF0000]" },
  "SC": { text: "SAFETY CAR", color: "text-[#FF8A00]" },
  "VSC": { text: "VIRTUAL SC", color: "text-[#FF8A00]" },
};

export const RaceHeader = ({ carrera, circuito, status }) => {
  // 2. Buscamos el estilo correspondiente (Si 'status' viene vacío, usamos Green por defecto)
  const currentFlag = flagStyles[status] || flagStyles["Green"];

  return (
    <div className="w-full flex items-center justify-between px-10 pt-6">
      {/* --- BLOQUE IZQUIERDO --- */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <h1 className="font-f1 font-bold text-3xl uppercase tracking-tighter text-white whitespace-nowrap drop-shadow-lg">
            {carrera}
          </h1>

          <div className="inline-flex items-center bg-[#6B0000] rounded-full px-3 py-0.5">
            <span className="h-2 w-2 rounded-full bg-zinc-300 mr-2"></span>
            <span className="font-f1 font-bold text-sm uppercase text-white tracking-widest">
              LIVE
            </span>
          </div>
        </div>

        <p className="text-sm font-inter text-zinc-400 uppercase tracking-[0.25em]">
          {circuito}
        </p>
      </div>

      {/* --- BLOQUE DERECHO --- */}
      <div className="flex flex-col items-end">
        <span className="font-inter font-light text-[10px] text-[#979797] uppercase tracking-widest">
          Status Track
        </span>
        
        {/* 3. Renderizamos el texto y color dinámicos */}
        <p className={`font-f1 font-regular text-sm tracking-wide ${currentFlag.color}`}>
          {currentFlag.text}
        </p>
      </div>
    </div>
  );
};