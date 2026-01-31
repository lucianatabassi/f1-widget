import { ThreeColumns } from "./ThreeColumns";
import { StatusColumn } from "./StatusColumn";
import imagenColapinto from "../assets/fc.png";
import { use } from "react";

function InfoSection({
  pais,
  circuito,
  horario,
  image,
  ganador,
  status,
  date,
  month,
}) {
  return (
    <ThreeColumns>
      <StatusColumn
        status={status}
        date={date}
        month={month}
        laps="58/58" // Esto vendría de la API en el futuro
      />

      <div className="w-full min-w-0 flex flex-col justify-between p-10 pt-20 text-white ">
        <h1 className="absolute -top-4 -left-4 text-[8rem] font-f1 font-[900] text-white/2 uppercase select-none pointer-events-none z-0">
          {pais}
        </h1>
        <h1 className="text-5xl font-f1 font-[800] uppercase tracking-tighter text-white whitespace-nowrap">
          {pais}
        </h1>
        <h3 className="text-md font-inter font-medium text-zinc-400 uppercase tracking-wider ">
          {circuito}
        </h3>
        <p className="text-lg font-inter font-[700] text-gray-200 tracking-wide capitalize border-l-2 border-red-600 pl-3">
          {horario}
        </p>

        <div className="w-full h-[250px] flex items-center justify-start p-4 overflow-hidden">
          <img
            src={image}
            alt=""
            className="max-w-full max-h-full object-contain brightness-0 invert drop-shadow-lg"
          />
        </div>
      </div>

      <div className="relative flex w-full h-full items-end justify-end z-50 pointer-events-none">
        <div
          className="
      absolute 
      bottom-0 
      right-[-10px]       
      w-[80%] h-[70%]     
      bg-white/20         
      blur-[80px]         
      rounded-full
      z-0                
  "
        ></div>

        <img
          src={ganador}
          alt=""
          className="
      absolute 
      bottom-0 
      right-0 
      h-[500px]
      w-[111%]
      max-w-none
      object-cover 
      object-center 
      z-10             
    "
        />
      </div>
    </ThreeColumns>
  );
}

export default InfoSection;
