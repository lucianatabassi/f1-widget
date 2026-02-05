import { useState, useEffect } from "react";

export const openF1 = (pais, año) => {
  const [telemetria, setTelemetria] = useState({
    drivers: [],
    positions: [],
    intervals: [],
    raceStatus: null, // Banderas (Green, Yellow, SC)
    carreraKey: null,
    loading: true,
  });

  useEffect(() => {
    if (!pais || !año) return; // evita errores cuando no hay datos

    //pedir datos a la API
    const fetchData = async () => {
      try {
        const traducirPais = { USA: "United States", UAE: "Abu Dhabi" };
        const paisTraducido = traducirPais[pais] || pais; // traduce el país si es necesario

        const sessionRes = await fetch(
          `https://api.openf1.org/v1/sessions?country_name=${paisTraducido}&year=${año}&session_name=Race`,
        );

        const dataSessions = await sessionRes.json(); // convierte los datos obtenido en un array

        if (dataSessions.length === 0) {
          setTelemetria((prev) => ({ ...prev, loading: false })); // si no hay datos, solo actualiza el estado de carga
          return;
        }

        const carreraKey = dataSessions[0].session_key; // toma la key de la primera carrera

        const drivers = await fetch(
          `https://api.openf1.org/v1/drivers?session_key=${carreraKey}`,
        );
        const dataDrivers = await drivers.json(); // // convierte los datos obtenido en un array

        const positions = await fetch(
          `https://api.openf1.org/v1/positions?session_key=${carreraKey}`,
        );
        const driversPositions = await positions.json(); // convierte los datos obtenido en un array

        const ultimasPosiciones = {}; // donde se van a ir guardando los cambios de posiciones
        driversPositions.forEach((pos) => {
          ultimasPosiciones[pos.driver_number] = pos.positions; // va sobreescribiendo los cambios de posicion de cada piloto
        });

        // guardar los datos obtenidos
        setTelemetria({
          drivers: dataDrivers,
          positions: driversPositions,
          intervals: [],
          raceStatus: null,
          loading: true,
        });
      } catch (error) {
        console.error("Error OpenF1:", error);
        setTelemetria((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData(); // llamar funcion
  }, [pais, año]); // donde use Effect debe buscar 

  return telemetria;
};
