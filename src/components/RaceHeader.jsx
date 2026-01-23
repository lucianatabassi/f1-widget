export const RaceHeader = ({ carrera, circuito }) => {
  return (
    <div className="w-full flex flex-col px-5 justify-center pt-10">
      <div className="flex items-center gap-3">
        <h1 className="font-f1 font-bold text-xl text-white">{carrera}</h1>
      </div>

      <p className="font-helvetica text-sm text-gray-300">{circuito}</p>
    </div>
  );
};
