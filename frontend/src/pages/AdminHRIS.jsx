import React, { useState } from "react";

export default function AdminHRIS() {
  const [msg, setMsg] = useState("");
  const [fileMsg, setFileMsg] = useState("");

  // Sync HRIS employees from mock API into Supabase
  async function syncHris() {
    setMsg("Syncing...");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/hris/sync`,
        {
          method: "POST",
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || JSON.stringify(data));

      setMsg(`Imported: ${data.imported}, Upserted: ${data.upserted}`);
    } catch (e) {
      setMsg("Error: " + (e.message || e));
    }
  }

  // Upload CSV file of employees
  async function uploadCsv(ev) {
    setFileMsg("Uploading...");
    const f = ev.target.files?.[0];
    if (!f) return setFileMsg("No file selected");

    const form = new FormData();
    form.append("file", f);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/hris/upload`,
        {
          method: "POST",
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
          body: form,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || JSON.stringify(data));

      setFileMsg(`CSV: Imported ${data.imported}, Upserted ${data.upserted}`);
    } catch (e) {
      setFileMsg("Error: " + (e.message || e));
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">HRIS Administration</h2>

      {/* Sync HRIS Section */}
      <div className="p-4 border rounded shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Sync from HRIS</div>
            <div className="text-sm text-gray-600">
              Fetch employees from mock HRIS and upsert into Supabase
            </div>
          </div>
          <button
            className="px-3 py-2 bg-black text-white rounded"
            onClick={syncHris}
          >
            Sync HRIS
          </button>
        </div>
        {msg && <p className="mt-2 text-sm">{msg}</p>}
      </div>

      {/* Upload CSV Section */}
      <div className="p-4 border rounded shadow-sm">
        <div className="font-medium">Upload CSV</div>
        <div className="text-sm text-gray-600">
          CSV headers: email,first_name,last_name,department,position,hire_date
        </div>
        <input
          type="file"
          accept=".csv"
          onChange={uploadCsv}
          className="mt-2"
        />
        {fileMsg && <p className="mt-2 text-sm">{fileMsg}</p>}
      </div>
    </div>
  );
}
