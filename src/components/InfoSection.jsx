import { ThreeColumns } from "./ThreeColumns";
import { StatusColumn } from "./StatusColumn";
import imagenColapinto from "../assets/fc.png";
import { use } from "react";

function InfoSection({ pais, circuito, horario, image, status, date, month }) {
  return (
    <ThreeColumns>
      <StatusColumn
        status={status}
        date={date}
        month={month}
        laps="58/58" // Esto vendría de la API en el futuro
      />

      <div className="flex flex-col justify-center p-10 gap-3 text-white ">
        <h1 className="absolute -top-4 -left-4 text-[8rem] font-f1 font-[900] text-white/2 uppercase select-none pointer-events-none z-0">
          {pais}
        </h1>
        <h1 className="text-5xl font-f1 font-[800] uppercase tracking-tighter text-white">
          {pais}
        </h1>
        <h3 className="text-md font-inter font-medium text-zinc-400 uppercase tracking-wider ">
          {circuito}
        </h3>
        <p className="text-lg font-inter font-[700] text-gray-200 tracking-wide capitalize border-l-2 border-red-600 pl-3">
          {horario}
        </p>

        <div className="w-full h-auto pt-15">
          <img src={image} alt="" className="w-full h-auto" />
        </div>
      </div>

      <div className="flex w-full h-auto items-end justify-end">
        <img
          src={imagenColapinto}
          alt=""
          className="w-[full] h-[400px] object-cover"
        />
      </div>
    </ThreeColumns>
  );
}

export default InfoSection;
