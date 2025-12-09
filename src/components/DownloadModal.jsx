import { useState } from "react";

const DownloadModal = ({ open, onClose }) => {
  const [source, setSource] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleDownload = () => {
    // VALIDASI
    if (!fromDate || !toDate) {
      alert("Tanggal 'From' dan 'To' wajib diisi.");
      return;
    }

    const from = new Date(fromDate);
    const to = new Date(toDate);

    if (from > to) {
      alert("'From' tidak boleh lebih besar dari 'To'.");
      return;
    }

    // Konversi WIB → UTC
    const utcFrom = from.getTime() + 7 * 60 * 60 * 1000;
    const utcTo = to.getTime() + 7 * 60 * 60 * 1000;

    const params = new URLSearchParams();

    if (source) params.append("source", source.toUpperCase());
    params.append("from", utcFrom);
    params.append("to", utcTo);

    const url = `http://localhost:5000/api/download?${params.toString()}`;

    setLoading(true);

    window.open(url, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Download Filter</h2>

        {/* SOURCE */}
        <div className="mb-3">
          <label className="font-semibold">Source</label>
          <select
            className="w-full border p-2 rounded mt-1"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            <option value="">All Sources</option>
            <option value="DRONE1">DRONE1</option>
            <option value="DRONE2">DRONE2</option>
          </select>
        </div>

        {/* FROM */}
        <div className="mb-3">
          <label className="font-semibold">From</label>
          <input
            type="datetime-local"
            className="w-full border p-2 rounded mt-1"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>

        {/* TO */}
        <div className="mb-5">
          <label className="font-semibold">To</label>
          <input
            type="datetime-local"
            className="w-full border p-2 rounded mt-1"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleDownload}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;
