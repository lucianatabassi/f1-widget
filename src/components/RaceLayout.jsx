import { ThreeColumns } from "./ThreeColumns";
import { StatusColumn } from "./StatusColumn";
import { RaceHeader } from "./RaceHeader";
import { Leaderboard } from "./Leaderboard";
import { TrackMap } from "./TrackMap";

export const RaceLayout = ({ children }) => {
  const mockF1Data = {
    status: "live",
    currentLap: "10 / 70",
    drivers: [
      {
        id: 1,
        position: 1,
        abbreviation: "COL",
        gapToLeader: "Interval",
        teamHex: "#64C4FF",
        lapProgress: 45,
        inPits: false,
      },
      {
        id: 2,
        position: 2,
        abbreviation: "VER",
        gapToLeader: "+1.245",
        teamHex: "#3671C6",
        lapProgress: 42,
        inPits: false,
      },
      {
        id: 3,
        position: 3,
        abbreviation: "LEC",
        gapToLeader: "+5.890",
        teamHex: "#E10600",
        lapProgress: 10,
        inPits: true,
      },
      {
        id: 4,
        position: 4,
        abbreviation: "COL",
        gapToLeader: "+1.245",
        teamHex: "#64C4FF",
        inPits: false,
      },
      {
        id: 5,
        position: 5,
        abbreviation: "VER",
        gapToLeader: "+1.245",
        teamHex: "#3671C6",
        inPits: false,
      },
      {
        id: 6,
        position: 6,
        abbreviation: "LEC",
        gapToLeader: "+5.890",
        teamHex: "#E10600",
        inPits: true,
      },
      {
        id: 7,
        position: 7,
        abbreviation: "COL",
        gapToLeader: "+1.245",
        teamHex: "#64C4FF",
        inPits: false,
      },
      {
        id: 8,
        position: 8,
        abbreviation: "VER",
        gapToLeader: "+1.245",
        teamHex: "#3671C6",
        inPits: false,
      },
      {
        id: 9,
        position: 9,
        abbreviation: "LEC",
        gapToLeader: "+5.890",
        teamHex: "#E10600",
        inPits: true,
      },
      {
        id: 10,
        position: 10,
        abbreviation: "COL",
        gapToLeader: "+1.245",
        teamHex: "#64C4FF",
        inPits: false,
      },
      {
        id: 11,
        position: 11,
        abbreviation: "VER",
        gapToLeader: "+1.245",
        teamHex: "#3671C6",
        inPits: false,
      },
      {
        id: 12,
        position: 12,
        abbreviation: "LEC",
        gapToLeader: "+5.890",
        teamHex: "#E10600",
        inPits: true,
      },
      {
        id: 13,
        position: 13,
        abbreviation: "COL",
        gapToLeader: "+1.245",
        teamHex: "#64C4FF",
        inPits: false,
      },
      {
        id: 14,
        position: 14,
        abbreviation: "VER",
        gapToLeader: "+1.245",
        teamHex: "#3671C6",
        inPits: false,
      },
      {
        id: 15,
        position: 15,
        abbreviation: "LEC",
        gapToLeader: "+5.890",
        teamHex: "#E10600",
        inPits: true,
      },
      {
        id: 16,
        position: 16,
        abbreviation: "LEC",
        gapToLeader: "+5.890",
        teamHex: "#E10600",
        inPits: true,
      },
      {
        id: 17,
        position: 17,
        abbreviation: "LEC",
        gapToLeader: "+5.890",
        teamHex: "#E10600",
        inPits: true,
      },
      {
        id: 18,
        position: 18,
        abbreviation: "LEC",
        gapToLeader: "+5.890",
        teamHex: "#E10600",
        inPits: true,
      },
      {
        id: 19,
        position: 19,
        abbreviation: "LEC",
        gapToLeader: "+5.890",
        teamHex: "#E10600",
        inPits: true,
      },
      {
        id: 20,
        position: 20,
        abbreviation: "LEC",
        gapToLeader: "+5.890",
        teamHex: "#E10600",
        inPits: true,
      },
      {
        id: 21,
        position: 21,
        abbreviation: "LEC",
        gapToLeader: "+5.890",
        teamHex: "#E10600",
        inPits: true,
      },
      {
        id: 22,
        position: 22,
        abbreviation: "LEC",
        gapToLeader: "+5.890",
        teamHex: "#E10600",
        inPits: true,
      },
    ],
  };
  return (
    <ThreeColumns>
      <StatusColumn status={mockF1Data.status} laps={mockF1Data.currentLap} />

      <div className="w-full flex flex-col">
        
          <RaceHeader
            carrera="Práctica Libre 1"
            circuito="QATAR AIRWAYS AUSTRALIAN GRAND PRIX"
          />
        

        <Leaderboard drivers={mockF1Data.drivers} />
      </div>

      <div className="flex-1 min-h-[200px]"> 
         <TrackMap drivers={mockF1Data.drivers} />
      </div>
    </ThreeColumns>
  );
};
