export default function DataStreamsTable({ metadata, headers, values }) {
  return (
    <div className="border border-green-200 rounded-xl shadow overflow-hidden">
      <div className="max-h-[400px] overflow-auto">
        <table className="min-w-full table-fixed text-sm">
          <thead className="sticky top-0 z-10 bg-green-600 text-white text-xs uppercase font-semibold">
            <tr>
              {headers.map((h) => (
                <th key={h.key} className={`px-3 py-2 text-left ${h.width} `}>
                  <div className="flex items-center gap-1">
                    <span>{h.label}</span>
                    <svg
                      className="w-3 h-3 text-white opacity-70"
                      fill="currentColor"
                      viewBox="0 0 320 512"
                    >
                      <path d="M279 224H41c-35.3 0-53.5 43-28.3 68.3l119 119c15 15 39.1 15 54.1 0l119-119c25.2-25.2 7-68.3-28.8-68.3z" />
                    </svg>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {metadata.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={`${
                  rowIndex % 2 === 0 ? "bg-white" : "bg-green-50"
                } hover:bg-green-100 transition`}
              >
                {headers.map((col) => (
                  <td
                    key={col.key}
                    className={`px-3 py-2 truncate ${col.width} `}
                  >
                    {col.key === "color" ? (
                      <div
                        className="w-5 h-5 rounded border border-gray-400"
                        style={{ backgroundColor: row.color }}
                      />
                    ) : col.key === "live" ? (
                      values?.[row.pin] ?? "--"
                    ) : typeof row[col.key] === "boolean" ? (
                      row[col.key] ? (
                        "Yes"
                      ) : (
                        "No"
                      )
                    ) : (
                      row[col.key] ?? "--"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
