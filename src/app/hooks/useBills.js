import { useState } from "react";

export function useBills() {
  const [bills, setBills] = useState([
    { month: "", units: "", cost: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...bills];
    updated[index][field] = value;
    setBills(updated);
  };

  const addRow = () => {
    setBills([...bills, { month: "", units: "", cost: "" }]);
  };

  const deleteRow = (index) => {
    if (bills.length === 1) return;
    setBills(bills.filter((_, i) => i !== index));
  };

  const excelDateToMonth = (serial) => {
    if (typeof serial !== "number") return "";

    // Excel dates start from Jan 1, 1900. JavaScript starts from Jan 1, 1970
    const daysSinceEpoch = serial - 25569; // 25569 = days between 1900-01-01 and 1970-01-01
    const milliseconds = daysSinceEpoch * 86400 * 1000;
    const date = new Date(milliseconds);

    // Return in format "YYYY-MM" suitable for input type="month"
    return date.toISOString().slice(0, 7);
  }


  const parseMonth = (input) => {
    if (!input) return "";
    try {
      const num = Number(input);
      if (!isNaN(num) && num > 10000) return excelDateToMonth(num);
      const date = new Date(input);
      return isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 7);
    } catch {
      return "";
    }
  };


  const addParsedRows = (rows) => {
    setBills((prev) => {
      const filteredPrev = prev.filter(
        (bill) => bill.month && bill.units && bill.cost
      );
      return [...filteredPrev, ...rows];
    });
  };


  return { bills, handleChange, addRow, deleteRow, addParsedRows, parseMonth };
}
