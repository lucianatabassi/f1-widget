function InfoSection({ pais, circuito, horario, image }) {
  return (
    <div className="flex flex-col justify-center p-10 gap-4 text-white ">
      <h1 className="font-f1 font-bold text-3xl">{pais}</h1>
      <h2 className="font-helvetica text-lg text-gray-300">{circuito}</h2>
      <p className="font-helvetica font-bold text-gray-200 tracking-wide uppercase">{horario}</p>

      <div className="w-full h-auto pt-15">
        <img src={image} alt="" className="w-full h-auto"/>
      </div>
    </div>
  );
}

export default InfoSection;
