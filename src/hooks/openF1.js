import { useState, useEffect } from "react";

export const openF1 = (pais, año) => {
  const [telemetria, setTelemetria] = useState({
    drivers: [],
    positions: {},
    intervals: [],
    raceStatus: null, // Banderas (Green, Yellow, SC)
    carreraKey: null,
    sessionName: "",
    loading: true,
    currentLap: 0, // <--- Aquí guardaremos la vuelta actual en vivo
    totalLaps: 58, // <--- Valor por defecto (luego veremos cómo mejorarlo)
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

        /*  const carreraKey = dataSessions[0].session_key; // toma la key de la primera carrera
        const tipoCarrera = dataSessions[0].session_name;*/

        //CODIGO PARA PROBAR
        const carreraKey = 9472;
        const tipoCarrera = "Race (TEST MODE)";

        const drivers = await fetch(
          `https://api.openf1.org/v1/drivers?session_key=${carreraKey}`,
        );
        const dataDrivers = await drivers.json(); // // convierte los datos obtenido en un array

        const positions = await fetch(
          `https://api.openf1.org/v1/positions?session_key=${carreraKey}`,
        );

        if (!positions.ok) {
          console.warn("⚠️ OpenF1: La API está saturada o falló. Esperando...");
          setTelemetria((prev) => ({ ...prev, loading: false }));
          return; // <--- FRENAMOS AQUÍ PARA QUE NO EXPLOTE
        }

        const driversPositions = await positions.json(); // convierte los datos obtenido en un array

        if (!Array.isArray(driversPositions)) {
          console.error("OpenF1: Datos de posición inválidos", driversPositions);
          setTelemetria((prev) => ({ ...prev, loading: false }));
          return;
        }

        const ultimasPosiciones = {}; // donde se van a ir guardando los cambios de posiciones
        driversPositions.forEach((pos) => {
          ultimasPosiciones[pos.driver_number] = pos.positions; // va sobreescribiendo los cambios de posicion de cada piloto
        });

        // Buscamos todas las vueltas registradas en esta sesión
        const lapsRes = await fetch(
          `https://api.openf1.org/v1/laps?session_key=${carreraKey}`,
        );
        const lapsData = await lapsRes.json();

        // CALCULAR LA VUELTA ACTUAL
        // Si hay datos de vueltas, buscamos el número más alto.
        let maxLap = 0;
        if (lapsData.length > 0) {
          // Recorremos todas las vueltas y nos quedamos con la mayor
          maxLap = Math.max(...lapsData.map((lap) => lap.lap_number));
        }

        // guardar los datos obtenidos
        setTelemetria({
          drivers: dataDrivers,
          positions: driversPositions,
          intervals: [],
          raceStatus: null,
          sessionName: tipoCarrera,
          currentLap: maxLap, // <--- ¡Dato en vivo!
          totalLaps: 58, // (Este dato OpenF1 NO lo da en vivo, lo dejamos fijo o lo sacamos de Ergast)
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
