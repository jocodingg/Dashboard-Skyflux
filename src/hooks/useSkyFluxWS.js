import { useEffect, useState } from "react";

export const useSkyfluxWS = () => {
  const [data, setData] = useState({
    co2: 0,
    ch4: 0,
    suhu: 0,
    kelembapan: 0,
    h2o: 0,
    tekanan: 0,
    pm25: 0,
    voc: 0,
  });

  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    let timeout = null;

    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = (msg) => {
      const received = JSON.parse(msg.data);
      setData(received);

      // setiap dapat data → LIVE
      setIsLive(true);

      // reset timer offline
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setIsLive(false); // tidak ada data 5 detik → OFFLINE
      }, 5000);
    };

    ws.onerror = (err) => {
      console.error("WS Error:", err);
      setIsLive(false);
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
      setIsLive(false);
    };

    return () => {
      clearTimeout(timeout);
      ws.close();
    };
  }, []);

  return { data, isLive };
};
