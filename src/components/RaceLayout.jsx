import { ThreeColumns } from "./ThreeColumns";
import { StatusColumn } from "./StatusColumn";
import { RaceHeader } from "./RaceHeader";
import { Leaderboard } from "./Leaderboard";

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
        inPits: false,
      },
      {
        id: 2,
        position: 2,
        abbreviation: "VER",
        gapToLeader: "+1.245",
        teamHex: "#3671C6",
        inPits: false,
      },
      {
        id: 3,
        position: 3,
        abbreviation: "LEC",
        gapToLeader: "+5.890",
        teamHex: "#E10600",
        inPits: true,
      },
      {
        id: 4,
        position: 4,
        abbreviation: "COL",
        gapToLeader: "Interval",
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
        gapToLeader: "INTERVAL",
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
        gapToLeader: "INTERVAL",
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
        gapToLeader: "INTERVAL",
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
    </ThreeColumns>
  );
};
