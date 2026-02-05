export const DriversPosition = ( {pos, name, gap, isPitting, teamColor = "#E10600" } ) => {
    return(
        <div className="flex items-center justify-between pb-1 w-full font-f1 ">
      <div className="flex items-center gap-2">
        <span className="text-white font-bold w-4 text-sm">{pos}</span>
        <div 
          className="w-[3px] h-4 rounded-full" 
          style={{ backgroundColor: teamColor }}
        ></div>
        <span className={`text-white font-bold text-md ${isPitting ? 'opacity-50' : ''}`}>
          {name}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {isPitting ? (
          <span className="text-cyan-500 text-[13px] px-2 py-0.5 rounded-sm font-medium">
           + In Pit
          </span>
        ) : (
          <span className="text-gray-200 font-medium text-[14px]">
            {gap}
          </span>
        )}
      </div>
    </div>
    );
}