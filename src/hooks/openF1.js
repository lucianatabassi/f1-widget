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
    currentLap: 0, 
    totalLaps: 58, 
  });

  useEffect(() => {
    if (!pais || !año) return;

    // --- MODO SIMULACIÓN PARA DISEÑAR UI ---
    // Esto simula que los datos tardan 800ms en llegar y luego carga una tabla falsa
    const timer = setTimeout(() => {
      setTelemetria({
        drivers: [
          { driver_number: 1, name_acronym: "VER", team_colour: "3671C6", full_name: "Max Verstappen" },
          { driver_number: 4, name_acronym: "NOR", team_colour: "FF8000", full_name: "Lando Norris" },
          { driver_number: 16, name_acronym: "LEC", team_colour: "E80020", full_name: "Charles Leclerc" },
          { driver_number: 55, name_acronym: "SAI", team_colour: "E80020", full_name: "Carlos Sainz" },
          { driver_number: 81, name_acronym: "PIA", team_colour: "FF8000", full_name: "Oscar Piastri" },
          { driver_number: 44, name_acronym: "HAM", team_colour: "27F4D2", full_name: "Lewis Hamilton" },
          { driver_number: 63, name_acronym: "RUS", team_colour: "27F4D2", full_name: "George Russell" },
          { driver_number: 11, name_acronym: "PER", team_colour: "3671C6", full_name: "Sergio Perez" },
          { driver_number: 14, name_acronym: "ALO", team_colour: "229971", full_name: "Fernando Alonso" },
          { driver_number: 18, name_acronym: "STR", team_colour: "229971", full_name: "Lance Stroll" },
          { driver_number: 22, name_acronym: "TSU", team_colour: "6692FF", full_name: "Yuki Tsunoda" },
          { driver_number: 3, name_acronym: "RIC", team_colour: "6692FF", full_name: "Daniel Ricciardo" },
          { driver_number: 27, name_acronym: "HUL", team_colour: "B6BABD", full_name: "Nico Hulkenberg" },
          { driver_number: 20, name_acronym: "MAG", team_colour: "B6BABD", full_name: "Kevin Magnussen" },
          { driver_number: 23, name_acronym: "ALB", team_colour: "64C4FF", full_name: "Alexander Albon" },
          { driver_number: 2, name_acronym: "SAR", team_colour: "64C4FF", full_name: "Logan Sargeant" },
          { driver_number: 31, name_acronym: "OCO", team_colour: "0093CC", full_name: "Esteban Ocon" },
          { driver_number: 10, name_acronym: "GAS", team_colour: "0093CC", full_name: "Pierre Gasly" },
          { driver_number: 77, name_acronym: "BOT", team_colour: "52E252", full_name: "Valtteri Bottas" },
          { driver_number: 24, name_acronym: "ZHO", team_colour: "52E252", full_name: "Zhou Guanyu" }
        ],
        // Posiciones del 1 al 20 asociadas al número del piloto
        positions: {
          1: 1, 4: 2, 16: 3, 55: 4, 81: 5, 44: 6, 63: 7, 11: 8, 14: 9, 18: 10,
          22: 11, 3: 12, 27: 13, 20: 14, 23: 15, 2: 16, 31: 17, 10: 18, 77: 19, 24: 20
        },
        // INTERVALOS: Diferencia de tiempo respecto al líder o al piloto de adelante.
        // Clave: Número de piloto | Valor: String del intervalo (ej. "+1.234" o "Interval")
        intervals: {
          1: "Interval", // El líder no tiene gap
          4: "+1.245",
          16: "+3.401",
          55: "+4.112",
          81: "+6.890",
          44: "+8.304",
          63: "+9.100",
          11: "+12.450",
          14: "+14.002",
          18: "+16.320",
          22: "+19.870",
          3: "+21.450",
          27: "+23.110",
          20: "+25.900",
          23: "+28.400",
          2: "+31.002",
          31: "+35.500",
          10: "+38.120",
          77: "+42.000",
          24: "+45.100"
        },
        raceStatus: "Green",
        carreraKey: 9999,
        sessionName: "Australia",
        loading: false,
        currentLap: 42,
        totalLaps: 58,
      });
    }, 800);

    return () => clearTimeout(timer); // Limpiamos el timer si el componente se desmonta


    // =========================================================
    // --- TU CÓDIGO REAL (COMENTADO HASTA QUE TERMINES LA UI) ---
    /*
    const fetchData = async () => {
      try {
        const traducirPais = { USA: "United States", UAE: "Abu Dhabi" };
        const paisTraducido = traducirPais[pais] || pais;

        const sessionRes = await fetch(
          `https://api.openf1.org/v1/sessions?country_name=${paisTraducido}&year=${año}&session_name=Race`,
        );
        const dataSessions = await sessionRes.json();

        if (dataSessions.length === 0) {
          setTelemetria((prev) => ({ ...prev, loading: false }));
          return;
        }

        const carreraKey = dataSessions[0].session_key;
        const tipoCarrera = dataSessions[0].session_name;

        const drivers = await fetch(`https://api.openf1.org/v1/drivers?session_key=${carreraKey}`);
        const dataDrivers = await drivers.json();

        const positions = await fetch(`https://api.openf1.org/v1/positions?session_key=${carreraKey}`);

        if (!positions.ok) {
          console.warn("⚠️ OpenF1: La API está saturada o falló.");
          setTelemetria((prev) => ({ ...prev, loading: false }));
          return;
        }

        const driversPositions = await positions.json();

        if (!Array.isArray(driversPositions)) {
          setTelemetria((prev) => ({ ...prev, loading: false }));
          return;
        }

        const ultimasPosiciones = {};
        driversPositions.forEach((pos) => {
          ultimasPosiciones[pos.driver_number] = pos.positions;
        });

        const lapsRes = await fetch(`https://api.openf1.org/v1/laps?session_key=${carreraKey}`);
        const lapsData = await lapsRes.json();

        let maxLap = 0;
        if (lapsData.length > 0) {
          maxLap = Math.max(...lapsData.map((lap) => lap.lap_number));
        }

        setTelemetria({
          drivers: dataDrivers,
          positions: driversPositions,
          intervals: [],
          raceStatus: null,
          sessionName: tipoCarrera,
          currentLap: maxLap,
          totalLaps: 58,
          loading: true,
        });
      } catch (error) {
        console.error("Error OpenF1:", error);
        setTelemetria((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData(); 
    */
    // =========================================================

  }, [pais, año]);

  return telemetria;
};