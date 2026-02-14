export const RaceHeader = ({ carrera, circuito }) => {
  return (
    <div className="w-full flex flex-col px-10 justify-center pt-10">
      <div className="flex items-center gap-3">
        <h1 className="font-f1 font-bold text-xl uppercase tracking-tighter text-white whitespace-nowrap drop-shadow-lg">{carrera}</h1>
      </div>

      <p className="text-sm font-inter text-zinc-400 uppercase tracking-[0.25em]">{circuito}</p>
    </div>
  );
};
