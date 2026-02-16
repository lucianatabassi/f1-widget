import { useState, useEffect } from "react";

// Agregamos 'usarSimulacion' con un valor por defecto false
export const openF1 = (pais, año, usarSimulacion = false) => {
  const [telemetria, setTelemetria] = useState({
    drivers: [],
    positions: {},
    intervals: {}, // <--- Importante: inicializa como objeto
    raceStatus: "Green",
    carreraKey: null,
    sessionName: "",
    loading: true,
    currentLap: 0,
    totalLaps: 58,
  });

  useEffect(() => {
    if (!pais || !año) return;

    // =========================================================
    // 🚦 MODO SIMULACIÓN (PARA DISEÑO UI)
    // =========================================================
    if (usarSimulacion) {
      setTelemetria(prev => ({ ...prev, loading: true })); // Reinicia carga al cambiar de país en simulación
      
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
          positions: {
            1: 1, 4: 2, 16: 3, 55: 4, 81: 5, 44: 6, 63: 7, 11: 8, 14: 9, 18: 10,
            22: 11, 3: 12, 27: 13, 20: 14, 23: 15, 2: 16, 31: 17, 10: 18, 77: 19, 24: 20
          },
          intervals: {
            1: "Interval", 4: "+1.245", 16: "+3.401", 55: "+4.112", 81: "+6.890",
            44: "+8.304", 63: "+9.100", 11: "+12.450", 14: "+14.002", 18: "+16.320",
            22: "+19.870", 3: "+21.450", 27: "+23.110", 20: "+25.900", 23: "+28.400",
            2: "+31.002", 31: "+35.500", 10: "+38.120", 77: "+42.000", 24: "+45.100"
          },
          raceStatus: "Green",
          carreraKey: 9999,
          sessionName: pais, // Usamos el nombre del país actual para que el Header cambie
          loading: false,
          currentLap: 42,
          totalLaps: 58,
        });
      }, 800);

      return () => clearTimeout(timer);
    }

    // =========================================================
    // 🏎️ MODO PRODUCCIÓN (DATOS REALES DE OPENF1)
    // =========================================================
    const fetchData = async () => {
      try {
        setTelemetria(prev => ({ ...prev, loading: true }));
        
        const traducirPais = { USA: "United States", UAE: "Abu Dhabi" };
        const paisTraducido = traducirPais[pais] || pais;

        // 1. Sesión
        const sessionRes = await fetch(`https://api.openf1.org/v1/sessions?country_name=${paisTraducido}&year=${año}&session_name=Race`);
        const dataSessions = await sessionRes.json();

        if (dataSessions.length === 0) {
          console.warn("OpenF1: No se encontró carrera activa para", pais);
          setTelemetria((prev) => ({ ...prev, loading: false }));
          return;
        }

        const carreraKey = dataSessions[0].session_key;
        const tipoCarrera = dataSessions[0].session_name;

        // 2. Pilotos y Posiciones
        const driversRes = await fetch(`https://api.openf1.org/v1/drivers?session_key=${carreraKey}`);
        const dataDrivers = await driversRes.json();

        const positionsRes = await fetch(`https://api.openf1.org/v1/positions?session_key=${carreraKey}`);
        if (!positionsRes.ok) throw new Error("API de posiciones saturada.");
        const driversPositions = await positionsRes.json();

        const ultimasPosiciones = {};
        driversPositions.forEach((pos) => {
          ultimasPosiciones[pos.driver_number] = pos.position; // Corregido: pos.position, no pos.positions
        });

        // 3. Intervalos Reales
        const intervalsRes = await fetch(`https://api.openf1.org/v1/intervals?session_key=${carreraKey}`);
        const intervalsData = await intervalsRes.json();
        const ultimosIntervalos = {};
        
        // OpenF1 devuelve muchos intervalos por vuelta. Nos quedamos con el último registrado de cada piloto
        intervalsData.forEach((int) => {
            // Si el gap es nulo, es el líder. Si no, formateamos el string a "+X.XXX"
            ultimosIntervalos[int.driver_number] = int.gap_to_leader === null ? "Interval" : `+${int.gap_to_leader}`;
        });

        // 4. Vueltas
        const lapsRes = await fetch(`https://api.openf1.org/v1/laps?session_key=${carreraKey}`);
        const lapsData = await lapsRes.json();
        let maxLap = lapsData.length > 0 ? Math.max(...lapsData.map((lap) => lap.lap_number)) : 0;

        // 5. Estado de la Pista (Banderas)
        const raceControlRes = await fetch(`https://api.openf1.org/v1/race_control?session_key=${carreraKey}&category=Flag`);
        const raceControlData = await raceControlRes.json();
        
        let banderaActual = "Green";
        if (raceControlData.length > 0) {
          const ultimoEvento = raceControlData[raceControlData.length - 1].flag;
          if (["YELLOW", "DOUBLE YELLOW"].includes(ultimoEvento)) banderaActual = "Yellow";
          else if (ultimoEvento === "RED") banderaActual = "Red";
          else if (ultimoEvento === "SC") banderaActual = "SC";
          else if (ultimoEvento === "VSC") banderaActual = "VSC";
        }

        // 6. Guardar estado final real
        setTelemetria({
          drivers: dataDrivers,
          positions: ultimasPosiciones,
          intervals: ultimosIntervalos, // <--- Intervalos reales asignados
          raceStatus: banderaActual,    // <--- Bandera real asignada
          sessionName: tipoCarrera,
          currentLap: maxLap,
          totalLaps: 58, // TODO: Deberíamos cruzar esto con la API de Ergast en el futuro
          loading: false,
        });

      } catch (error) {
        console.error("Error OpenF1:", error);
        setTelemetria((prev) => ({ ...prev, loading: false }));
      }
    };

    // Llama a la API real solo si no estamos en simulación
    if (!usarSimulacion) {
        fetchData();
    }

  }, [pais, año, usarSimulacion]);

  return telemetria;
};