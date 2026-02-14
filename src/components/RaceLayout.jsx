import { ThreeColumns } from "./ThreeColumns";
import { StatusColumn } from "./StatusColumn";
import { RaceHeader } from "./RaceHeader";
import { Leaderboard } from "./Leaderboard";
import { openF1 } from "../hooks/openF1";

export const RaceLayout = ({ raceData }) => {
  // 1. Extraemos 'intervals', 'currentLap' y 'totalLaps' del hook
  const { drivers, positions, intervals, sessionName, currentLap, totalLaps, loading } = openF1(
    raceData.pais,
    raceData.raw.season
  );

  // transformar datos de la API para la UI
  const dataTiempoReal = drivers
    .map((driver) => {
      // busca la pos actual, si no tiene asigna el 99
      const posActual = positions[driver.driver_number] || 99;
      
      // 2. Buscamos el gap real usando el número del piloto
      // Si por alguna razón no lo encuentra, muestra "+ ---"
      const gapActual = intervals[driver.driver_number] || "+ ---";

      return {
        id: Number(driver.driver_number),
        position: posActual,
        abbreviation: driver.name_acronym,
        gapToLeader: gapActual, // <--- Aplicamos el gap aquí
        teamHex: `#${driver.team_colour}`,
        inPits: false,
      };
    })
    // ordenar posiciones del primero al ultimo
    .sort((a, b) => a.position - b.position)
    // filtra los que no tienen posicion
    .filter((d) => d.position !== 99);

  return (
    <ThreeColumns>
      <StatusColumn
        status={loading ? "loading" : "live"}
        // 3. Mostramos la vuelta real actual y el total
        laps={loading ? "?? / ??" : `${currentLap} / ${totalLaps}`}
      />

      <div className="w-full flex flex-col">
        <RaceHeader
          carrera={loading ? "CARGANDO..." : sessionName.toUpperCase()}
          circuito={raceData.circuito.toUpperCase()}
        />

        {loading ? (
          <div className="flex-1 flex items-center justify-center text-white animate-pulse font-f1">
            CONECTANDO SATÉLITE...
          </div>
        ) : (
          <Leaderboard drivers={dataTiempoReal} />
        )}
      </div>
    </ThreeColumns>
  );
};