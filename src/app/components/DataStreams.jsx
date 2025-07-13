"use client";
import { useEffect, useState } from "react";
import { headers } from "../lib/headers";
import { metadata } from "../lib/metadata";
import { fetchBlynkValues } from "../services/blynkService";
import DataStreamsTable from "./DataStreamsTable";
import GlobalLoader from "./ui/Loader";

function DataStreams() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchBlynkValues();
        setValues(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
    const interval = setInterval(load, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto px-10 py-5">
      <h1 className="text-2xl font-semibold mb-6">Datastreams</h1>
      {loading && <GlobalLoader />}
      {error && <p className="text-red-400 p-4">Error: {error}</p>}
      {!loading && !error && (
        <DataStreamsTable
          metadata={metadata}
          headers={headers}
          values={values}
        />
      )}
    </div>
  );
}
export default DataStreams;
