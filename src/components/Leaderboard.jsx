import { DriversPosition } from "./DriversPosition";

export const Leaderboard = ({ drivers }) => {

  const DRIVERS_PER_COL = 11;

  const dividirCol = drivers.length > DRIVERS_PER_COL;

  const col1 = dividirCol ? drivers.slice(0, DRIVERS_PER_COL) : drivers;
  const col2 = dividirCol ? drivers.slice(DRIVERS_PER_COL) : [];


  const DriverList = ({ data }) => (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between text-[10px] text-zinc-500 mb-2 tracking-widest border-b border-zinc-800 pb-1 px-2">
        <span>POS / DRIVER</span>
        <span>GAP</span>
      </div>
      {data.map((driver) => (
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
  );

    return (
    <div className="w-full h-full p-4">
      
      <div className={`${dividirCol ? 'grid grid-cols-2 gap-7' : 'flex flex-col'} h-full`}>
        
        <DriverList data={col1} />

        {col2.length > 0 && (
          <div >
            <DriverList data={col2} />
          </div>
        )}

      </div>
    </div>
  );
}