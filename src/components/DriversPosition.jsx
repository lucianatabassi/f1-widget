export const DriversPosition = ( {pos, name, gap, isPitting, teamColor = "#E10600" } ) => {
    return(
        <div className="flex items-center justify-between w-full py-1 font-f1 uppercase">
      <div className="flex items-center gap-2">
        <span className="text-white font-bold w-4 text-sm">{pos}</span>
        <div 
          className="w-[3px] h-4 rounded-full" 
          style={{ backgroundColor: teamColor }}
        ></div>
        <span className={`text-white font-bold text-lg ${isPitting ? 'opacity-50' : ''}`}>
          {name}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {isPitting ? (
          <span className="text-cyan-500 text-[15px] px-2 py-0.5 rounded-sm font-medium">
           + In Pit
          </span>
        ) : (
          <span className="text-gray-200 font-medium text-sm">
            {gap}
          </span>
        )}
      </div>
    </div>
    );
}