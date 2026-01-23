import { DriversPosition } from "./DriversPosition";

export const Leaderboard = ({ drivers }) => {
    return(
        <div className="flex flex-col w-full h-full p-4 bg-zinc-950/50 rounded-xl">
      <div className="flex justify-between text-[10px] text-zinc-500 mb-2 tracking-widest border-b border-zinc-800 pb-1">
        <span>POS / DRIVER</span>
        <span>GAP / INTERVAL</span>
      </div>
      
      <div className="flex flex-col justify-between space-y-2">
        {drivers.map((driver) => (
          <DriversPosition 
            key={driver.id}
            pos={driver.position}
            name={driver.abbreviation}
            gap={driver.gapToLeader}
            isPitting={driver.inPits}
            teamColor={driver.teamHex}
          />
        ))}
      </div>
    </div>
    );
}