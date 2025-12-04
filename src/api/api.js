// BASE URL API
const SKYFLUX_API = "URL_API_SKYFLUX";
const PM_VOC_API = "URL_API_PM_VOC";

// Ambil data dari dua API secara paralel
export const fetchSensorData = async (signal) => {
  const [res1, res2] = await Promise.all([
    fetch(SKYFLUX_API, { signal }),
    fetch(PM_VOC_API, { signal }),
  ]);

  if (!res1.ok) throw new Error("API SKYFLUX error: " + res1.status);
  if (!res2.ok) throw new Error("API PM/VOC error: " + res2.status);

  const data1 = await res1.json();
  const data2 = await res2.json();

  return {
    co2: data1.co2 ?? 0,
    ch4: data1.ch4 ?? 0,
    suhu: data1.suhu ?? 0,
    kelembapan: data1.humidity ?? 0,
    h2o: data1.h2o ?? 0,
    tekanan: data1.pressure ?? 0,
    pm25: data2.pm25 ?? 0,
    voc: data2.voc ?? 0,
  };
};