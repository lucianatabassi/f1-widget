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

// --- FUNCIÓN PARA EXTRAER Y FORMATEAR LAS SESIONES DE LA API ---
const procesarSesiones = (raw) => {
  if (!raw) return [];

  const formatData = (name, dateStr, timeStr, isMain = false) => {
    if (!dateStr || !timeStr) return null;
    const dateObj = new Date(`${dateStr}T${timeStr}`);
    return {
      name,
      isMain,
      dateObj,
      dayNum: dateObj.toLocaleDateString("es-ES", { day: "2-digit" }),
      dayName: dateObj
        .toLocaleDateString("es-ES", { weekday: "short" })
        .slice(0, 3)
        .toUpperCase(),
      timeStr: dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  };

  // Buscamos todas las sesiones secundarias y las ordenamos cronológicamente
  const sessions = [
    formatData("Practica 1", raw.FirstPractice?.date, raw.FirstPractice?.time),
    formatData(
      "Practica 2",
      raw.SecondPractice?.date,
      raw.SecondPractice?.time,
    ),
    formatData("Practica 3", raw.ThirdPractice?.date, raw.ThirdPractice?.time),
    formatData("Sprint", raw.Sprint?.date, raw.Sprint?.time),
    formatData("Qualy", raw.Qualifying?.date, raw.Qualifying?.time),
  ]
    .filter(Boolean)
    .sort((a, b) => a.dateObj - b.dateObj);

  // La carrera principal (La destacamos)
  const race = formatData("Carrera", raw.date, raw.time, true);

  // Devolvemos la Carrera primero (para que quede arriba como en tu diseño) y luego el resto
  return race ? [race, ...sessions] : sessions;
};

function InfoSection({
  pais,
  circuito,
  horario, // (Ya no lo usaremos suelto abajo, lo integramos en la lista)
  image,
  ganadorNombre,
  status,
  date,
  month,
  round,
  raw, // <--- ¡NUEVA PROP! Recibimos los datos puros de la API
}) {
  const formattedWinnerName =
    driverFullNames[ganadorNombre] ||
    (ganadorNombre
      ? ganadorNombre.charAt(0).toUpperCase() + ganadorNombre.slice(1)
      : "TBD");

  // Procesamos las sesiones para renderizarlas
  const sesionesProgramadas = procesarSesiones(raw);

  return (
    <ThreeColumns className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900/80 to-black backdrop-blur-xl border border-white/5">
      <StatusColumn status={status} date={date} month={month} laps="58/58" />

      <div className="relative z-10 flex flex-col justify-center gap-6 px-10 py-8 text-white w-full h-full">
        {/* Cabecera (País, Circuito) */}
        <div className="space-y-3">
          <span className="absolute bottom-60 right-0 text-[200px] font-f1 font-bold tracking-widest text-[rgba(194,1,1,0.04)] [-webkit-text-stroke:1px_rgba(239,0,0,0.10)] uppercase z-0 pointer-events-none select-none">
            {round}
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

        {/* --- CONTENEDOR FILA (Card + Cronograma) --- */}
        <div className="flex flex-row gap-8 w-full">
          {/* COLUMNA IZQUIERDA: Circuito + Stats Card */}
          <div className="relative w-[428px] h-[338px] shrink-0 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/0.5 to-white/2 pointer-events-none"></div>

            <div className="relative flex flex-col items-center justify-between p-5 h-full w-full gap-5">
              <div className="w-full h-[180px] flex items-center justify-center">
                <img
                  src={image}
                  alt="Circuit Layout"
                  className="w-full h-full object-contain hover:scale-[1.05] transition-transform duration-500"
                />
              </div>

              <div className="flex w-full items-center justify-center gap-8">
                <div className="flex flex-col justify-center gap-5 w-[130px]">
                  {[
                    { label: "Longitud", value: "5.278 km" },
                    { label: "Vueltas", value: "58" },
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

                <div className="w-px h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

                <div className="flex flex-col justify-center gap-5 w-[130px]">
                  {[
                    { label: "Velocidad Máx", value: "300 km/h" },
                    { label: "Último ganador", value: formattedWinnerName },
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

          {/* COLUMNA DERECHA: Cronograma de Sesiones */}
          <div className="flex flex-col flex-1 h-[338px] justify-start gap-4">
            {sesionesProgramadas.map((sesion, index) => (
              <div
                key={index}
                className={`flex items-center gap-6 pb-4 ${
                  index !== sesionesProgramadas.length - 1
                    ? "border-b border-white/5"
                    : ""
                }`}
              >
                {/* Bloque de Fecha (Día y Número) */}
                <div
                  className={`flex flex-col items-center justify-center w-12 ${
                    sesion.isMain
                      ? "border-l-[4px] border-[#ff0000]  pl-2"
                      : "pl-3"
                  }`}
                >
                  <span
                    className={`text-xl font-inter font-medium leading-none ${
                      sesion.isMain
                        ? "text-[#ff0000] drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]"
                        : "text-white"
                    }`}
                  >
                    {sesion.dayNum}
                  </span>
                  <span
                    className={`text-sm font-inter font-regular uppercase tracking-wider ${
                      sesion.isMain ? "text-white" : "text-zinc-400"
                    }`}
                  >
                    {sesion.dayName}
                  </span>
                </div>

                {/* Bloque de Sesión y Hora */}
                <div className="flex flex-col">
                  <span
                    className={`text-lg font-f1 font-bold capitalize leading-tight ${
                      sesion.isMain ? "text-white" : "text-zinc-200"
                    }`}
                  >
                    {sesion.name}
                  </span>
                  <span className="text-sm font-inter text-zinc-400 tracking-wide">
                    {sesion.timeStr}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ThreeColumns>
  );
}

export default InfoSection;
