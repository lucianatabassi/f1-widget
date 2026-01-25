export const StatusColumn = ({ status, date, month, laps }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 border-r border-zinc-800 w-full">
      {status === "calendar" && (
        <div className="text-center animate-fadeIn">
          <h2 className="flex justify-center text-xl font-f1 text-gray-300 p-3 whitespace-nowrap">
            {date}
          </h2>
          <div className="px-2">
            {" "}
            <span className="px-6 py-1 bg-zinc-800 rounded-full font-f1 text-gray-300 text-lg uppercase">
              {month}
            </span>
          </div>
        </div>
      )}

      {status === "today" && (
        <div className="animate-pulse">
          {" "}
          {/* Efecto de latido para llamar la atención */}
          <h2 className="text-3xl font-f1 font-black text-red-600">HOY</h2>
        </div>
      )}

      {status === "live" && (
        <div className="flex flex-col justify-center items-center animate-fadeIn">
          <h2 className="text-xl text-yellow-500 font-f1 font-bold">{laps}</h2>
          <div className="mt-2 px-6 py-1 bg-zinc-800 rounded-full font-f1 text-zinc-300 text-lg">
            LAP
          </div>
        </div>
      )}

      {status === "finished" && (
        <div className="animate-fadeIn">
          <h2 className="text-3xl font-f1 font-bold text-red-600 italic">
            FIN
          </h2>
        </div>
      )}
    </div>
  );
};

export default StatusColumn;
