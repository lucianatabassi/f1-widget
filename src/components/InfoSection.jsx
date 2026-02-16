import { ThreeColumns } from "./ThreeColumns";
import { StatusColumn } from "./StatusColumn";
import { Flags } from "./Flags";

const driverFullNames = {
  verstappen: "Max Verstappen",
  norris: "Lando Norris",
  piastri: "Oscar Piastri",
  russell: "George Russell",
  leclerc: "Charles Leclerc",
  sainz: "Carlos Sainz",
  hamilton: "Lewis Hamilton",
  alonso: "Fernando Alonso",
};

function InfoSection({
  pais,
  circuito,
  horario,
  image,
  ganadorNombre,
  status,
  date,
  month,
  round,
}) {
  // Formateamos el nombre o ponemos "TBD" si no hay datos
  const formattedWinnerName = driverFullNames[ganadorNombre] || (ganadorNombre ? ganadorNombre.charAt(0).toUpperCase() + ganadorNombre.slice(1) : "TBD");

  return (
    <ThreeColumns className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/80 to-black backdrop-blur-xl border border-white/5">
      {/* Columna estado */}
      <StatusColumn status={status} date={date} month={month} laps="58/58" />

      <div className="relative z-10 flex flex-col justify-center gap-6 px-10 py-8 text-white w-full h-full">

        <div className="space-y-3">
          <span className="inline-block text-xs font-f1 font-bold tracking-widest text-[#C20101] uppercase">
            Round {round}
          </span>

          <div className="flex items-center gap-4"> 
            <Flags country={pais} size={80} />
            <h1 className="text-5xl font-f1 font-[800] uppercase tracking-tighter text-white whitespace-nowrap drop-shadow-lg">
                {pais}
            </h1>
          </div>

          <h3 className="text-sm font-inter text-zinc-400 uppercase tracking-[0.25em]">
            {circuito}
          </h3>
        </div>

        <p className="inline-flex items-center gap-3 text-lg font-inter font-semibold capitalize text-zinc-200">
          <span className="h-4 w-[3px] rounded-full bg-red-500" />
          {horario}
        </p>

        {/* Circuito + Stats Card */}
        {/* Le damos más ancho (max-w-3xl) ya que tenemos espacio libre a la derecha */}
        <div className="relative w-full max-w-3xl h-[280px] mt-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-2xl overflow-hidden">
          
          {/* Un degradado sutil en el fondo de la tarjeta */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10 pointer-events-none"></div>

          <div className="relative flex items-center justify-between p-8 h-full gap-8">
            
            {/* Imagen circuito (A la izquierda) */}
            <div className="flex-1 flex items-center justify-center h-full">
              <img
                src={image}
                alt="Circuit Layout"
                className="w-full h-full object-contain hover:scale-[1.05] transition-transform duration-500"
              />
            </div>

            {/* Divider Vertical */}
            <div className="w-px h-[85%] bg-gradient-to-b from-transparent via-zinc-600 to-transparent opacity-50" />

            {/* Stats (A la derecha, incluyendo el ganador) */}
            <div className="flex flex-col justify-center gap-5 w-[220px]">
              {[
                { label: "Circuit Length", value: "5.278 km" },
                { label: "Number of Laps", value: "58" },
                { label: "Top Speed", value: "300 km/h" },
                { label: "Last Winner", value: formattedWinnerName }, // <--- Aquí agregamos el ganador
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] font-inter uppercase tracking-[0.15em] text-zinc-400 mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-md font-f1 font-bold text-white leading-none">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </ThreeColumns>
  );
}

export default InfoSection;