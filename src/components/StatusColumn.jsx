export const StatusColumn = ({ status, date, month, laps }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 border-r border-zinc-800">
      {status === "calendar" && (
        <div>
          <h2 className="flex justify-center text-xl font-f1 text-gray-300 p-3">05 - 08</h2>
          <div className="px-10">
            <span className="px-6 py-1 bg-zinc-800 rounded-full font-f1 text-gray-300 text-lg">
            Mar
          </span>
          </div>
          
        </div>
      )}

      {status === "today" && (
        <div>
          <h2 className="text-6xl font-black text-red-600 italic">HOY</h2>
        </div>
      )}

      {status === "live" && (
        <div>
          <h2 className="text-2xl text-red-600 font-f1 font-bold">{laps}</h2>
          <div className="mt-2 px-6 py-1 bg-zinc-800 rounded-full font-f1 text-zinc-300 text-lg">
            LAP
          </div>
        </div>
      )}

      {status === "finished" && (
        <div>
          <h2 className="text-6xl font-black text-red-600 italic border-r-4 border-white pr-4">
            FIN
          </h2>
        </div>
      )}

    </div>
  );
};

export default StatusColumn;
