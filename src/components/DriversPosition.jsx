export const DriversPosition = ({ pos, name, gap, isPitting, teamColor = "#E10600" }) => {
  return (
    <div className="
      flex items-center justify-between w-full font-f1 
      /* --- EFECTO DE VIDRIO --- */
      bg-zinc-900/20       /* 1. Fondo más transparente (40% de opacidad) */
      backdrop-blur-md     /* 2. El desenfoque clave detrás del elemento */
      border border-white/5 /* 3. Borde ultra fino que le da el reflejo del cristal */
      shadow-sm            /* Sombra suave para despegarlo del fondo */
      /* ------------------------ */
      rounded-lg      
      px-3            
      py-0.5                   
      
    ">
      
      {/* Lado Izquierdo: Posición, Barra, Nombre */}
      <div className="flex items-center gap-3">
        <span className="text-white font-bold w-5 text-sm text-right pr-1 drop-shadow-md">
          {pos}
        </span>
        
        <div 
          className="w-[4px] h-4 rounded-full shadow-sm" 
          style={{ backgroundColor: teamColor }}
        ></div>
        
        <span className={`text-white font-bold text-md tracking-wide drop-shadow-md ${isPitting ? 'opacity-50' : ''}`}>
          {name}
        </span>
      </div>

      {/* Lado Derecho: Gap o In Pit */}
      <div className="flex items-center gap-3">
        {isPitting ? (
          <span className="text-cyan-400 text-[13px] rounded-sm font-medium tracking-wide">
            In Pit
          </span>
        ) : (
          <span className="text-gray-300 font-medium text-[14px] drop-shadow-md">
            {gap}
          </span>
        )}
      </div>

    </div>
  );
}