import { ThreeColumns } from "./ThreeColumns";
import { StatusColumn } from "./StatusColumn";
import { RaceHeader } from "./RaceHeader";
import { Leaderboard } from "./Leaderboard";
import { TrackMap } from "./TrackMap";
import { openF1 } from "../hooks/openF1";

export const RaceLayout = ({ raceData }) => {

  const {drivers, positions, sessionName, loading} = openF1(raceData.pais, raceData.raw.season); //guarda los datos segun el pais y la carrera
  const totalLaps = "??";
  //transformar datos de la API para la UI
  const dataTiempoReal = drivers.map((driver) => { //map recorre toda una lista y a cada elemento lo modifique segun lo que se le pida

    //busca la pos actual, si no tiene asigna el 99
    const posActual = positions[driver.driver_number] || 99;

    return {
      id: Number(driver.driver_number),
      position: posActual,
      abbreviation: driver.name_acronym, //dato propio de la API
      gapToLeader: posActual === 1 ? "Interval" : "+ ---",
      teamHex: `#${driver.team_colour}`, 
      inPits: false,

    };
  })

  // ordenar posiciones del primero al ultimo
  .sort((a, b) => a.position - b.position)
  //filtra los que no tienen posicion
  .filter((d) => d.position !== 99);

  return (
    <ThreeColumns>
      <StatusColumn 
        status={loading ? "loading" : "live"} 
       
        // Si está cargando: "-- / --"
        // Si ya cargó: "15 / 58" (Se actualizará solo si usas setInterval en el hook)
        laps={`${totalLaps} / ??`}
      />

      <div className="w-full flex flex-col">
        
          <RaceHeader
            carrera={loading ? "CARGANDO..." : sessionName.toUpperCase()}
            circuito={raceData.circuito.toUpperCase()} // Usamos el nombre real
         />
        

        {loading ? (
            <div className="flex-1 flex items-center justify-center text-white animate-pulse font-f1">
                CONECTANDO SATÉLITE...
            </div>
        ) : (
            <Leaderboard drivers={dataTiempoReal} />
        )}
      </div>

      <div className="flex-1 min-h-[200px]"> 
         <TrackMap drivers={dataTiempoReal} />
      </div>
    </ThreeColumns>
  );
};
