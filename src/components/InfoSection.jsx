import { ThreeColumns } from "./ThreeColumns";
import { StatusColumn } from "./StatusColumn";

const teamColors = {
  verstappen: "#3671C6",
  norris: "#FF8000",
  piastri: "#FF8000",
  russell: "#27F4D2",
};

function InfoSection({
  pais,
  circuito,
  horario,
  image,
  ganador,
  ganadorNombre,
  status,
  date,
  month,
  round,
}) {
  const glowColor = teamColors[ganadorNombre] || "#FFD700";

  return (
    <ThreeColumns className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/80 to-black backdrop-blur-xl border border-white/5">
      {/* Columna estado */}
      <StatusColumn status={status} date={date} month={month} laps="58/58" />

      {/* Info principal */}
      <div className="relative z-10 flex flex-col justify-between gap-6 p-12 text-white">
        {/*   <h1 className="absolute -top-8 -left-6 text-[9rem] font-f1 font-black text-white/5 uppercase select-none pointer-events-none">
          {pais}
        </h1>*/}

        <div className="space-y-3">
          <span className="inline-block text-xs font-f1 tracking-widest text-red-500 uppercase">
            Round {round}
          </span>

          <h1 className="text-5xl font-f1 font-extrabold uppercase tracking-tight">
            {pais}
          </h1>

          <h3 className="text-sm font-inter text-zinc-400 uppercase tracking-[0.25em]">
            {circuito}
          </h3>
        </div>

        <p className="inline-flex items-center gap-3 text-lg font-inter font-semibold capitalize text-zinc-200">
          <span className="h-4 w-[3px] rounded-full bg-red-500" />
          {horario}
        </p>

        {/* Circuito + Stats */}
        <div className="relative w-[650px] h-[250px] rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-2xl">
          <div className="flex items-center gap-8 p-6">
            {/* Imagen circuito */}
            <img
              src={image}
              alt=""
              className="w-[380px] h-[220px] object-contain hover:scale-[1.08] transition-transform duration-300"
            />

            {/* Divider */}
            <div className="w-px h-[180px] bg-white/10" />

            {/* Stats */}
            <div className="flex flex-col w-full h-full gap-3">
              {[
                { label: "Laps", value: "57" },
                { label: "Length", value: "5.41 km" },
                { label: "Top Speed", value: "330 km/h" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400">
                    {item.label}
                  </p>
                  <p className="text-lg font-f1 font-bold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*  <div className="relative flex items-end justify-end">
        
        <div
          className="absolute -bottom-1/3 -right-1/3 w-[140%] h-[140%] pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 65%)`,
            filter: "blur(100px)",
            opacity: 0.55,
          }}
        />

        
        <div
          className="absolute bottom-0 right-0 w-[70%] h-[50%] pointer-events-none mix-blend-screen opacity-30"
          style={{
            background: `radial-gradient(circle, ${glowColor}, transparent)`,
            filter: "blur(50px)",
          }}
        />

        
        <img
          src={ganador}
          alt=""
          className="relative z-10 h-[460px] w-[115%] max-w-none object-cover object-center drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
        />
      </div>*/}
    </ThreeColumns>
  );
}

export default InfoSection;
