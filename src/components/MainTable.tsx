import React from "react"

interface Column<T> {
  key: keyof T
  label: string
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  sortConfig: { key: keyof T | null; direction: "asc" | "desc" }
  sortTable: (key: keyof T) => void
  actions?: (item: T) => React.ReactNode
}

export function MainTable<T extends { id: string | number }>({
  data,
  columns,
  sortConfig,
  sortTable,
  actions,
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          {/* Top section of the table with column names */}
          <tr className="bg-accent">
            {columns.map(({ key, label }) => (
              <th
                key={String(key)}
                className="text-white border border-gray-300 px-4 py-2 text-left"
              >
                {/* Button to conditionally add a button in a column */}
                <button
                  onClick={() => sortTable(key)}
                  className="flex items-center space-x-1"
                >
                  <span>{label}</span>
                  <span>
                    {sortConfig.key === key
                      ? sortConfig.direction === "asc"
                        ? "↑"
                        : "↓"
                      : "↕"}
                  </span>
                </button>
              </th>
            ))}
            {/* Table body with data based on the provided dataset */}
            {actions && (
              <th className="text-white border border-gray-300 px-4 py-2 text-left">
                Acciones
              </th>
            )}
          </tr>
        </thead>
        {/* body of the table with props data*/}
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border border-gray-300">
              {columns.map(({ key }) => (
                <td
                  key={String(key)}
                  className="text-black border border-gray-300 px-4 py-2"
                >
                  {String(item[key])}
                </td>
              ))}
              {actions && (
                <td className="border border-gray-300 px-4 py-2">
                  {actions(item)}
                </td>
              )}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center text-gray-500 py-4"
              >
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
