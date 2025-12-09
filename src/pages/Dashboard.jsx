import React from "react";
import { useSkyfluxWS } from "../hooks/useSkyFluxWS";
import DownloadModal from "../components/DownloadModal";
import { useState } from "react";

import {
  getCO2Color,
  getCH4Color,
  getSuhuColor,
  getKelembapanColor,
  getH2OColor,
  getTekananColor,
  getPM25Color,
  getVOCColor,
} from "../utils/colorRules";

const Dashboard = () => {
  // Ambil data realtime dari WebSocket
  const { data, isLive } = useSkyfluxWS();
  const [openModal, setOpenModal] = useState(false);

  const Card = ({ icon, title, value, unit, color }) => (
    <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center">
      <img 
        src={icon} 
        alt={title} 
        className="w-15 h-15 object-contain"
      />
      <h2 className="text-gray-600 font-bold text-xl mb-2">{title}</h2>
      <p className={`text-5xl font-bold ${color}`}>{value}</p>
      <span className="text-gray-500 text-base mt-1">{unit}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F3F7FF] px-6 py-10">
      {/* HEADER */}
      <div className="relative mb-12">
        <h1 className="text-blue-600 font-bold text-5xl tracking-wide text-center">
          SKYFLUX DASHBOARD
        </h1>

        {/* Status Live */}
        <div className="flex items-center gap-2 justify-center mt-4 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:mt-0">
          <span
            className={`w-3 h-3 rounded-full ${
              isLive ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          <p
            className={`font-bold ${
              isLive ? "text-black-700" : "text-black-700"
            }`}
          >
            {isLive ? "LIVE" : "OFFLINE"}
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card icon="/co2.png" title="CO₂" value={data.co2} unit="ppm" color={getCO2Color(data.co2)} />
        <Card icon="/ch4.png" title="CH₄" value={data.ch4} unit="ppm" color={getCH4Color(data.ch4)} />
        <Card icon="/suhu.png" title="Suhu" value={data.suhu} unit="°C" color={getSuhuColor(data.suhu)} />
        <Card icon="/kelembapan.png" title="Kelembapan" value={data.kelembapan} unit="%" color={getKelembapanColor(data.kelembapan)} />
        <Card icon="/h20.png" title="H₂O" value={data.h2o} unit="kg/m³" color={getH2OColor(data.h2o)} />
        <Card icon="/tekanan.png" title="Tekanan" value={data.tekanan} unit="kPa" color={getTekananColor(data.tekanan)} />
        <Card icon="/pm.png" title="PM2.5" value={data.pm25} unit="µg/m³" color={getPM25Color(data.pm25)} />
        <Card icon="/voc.png" title="VOC" value={data.voc} unit="ppb" color={getVOCColor(data.voc)} />
      </div>
      {/* DOWNLOAD BUTTON */}
      <div className="w-full flex justify-center mt-10 mb-10">
        {/* Tombol download */}
        <button
          onClick={() => setOpenModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition"
        >
          Download Data Monitoring
        </button>

        {/* Modal Download */}
        <DownloadModal
          open={openModal}
          onClose={() => setOpenModal(false)}
        />
      </div>
    </div>
    
  );
};

export default Dashboard;
