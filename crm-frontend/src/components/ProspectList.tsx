import { useState } from "react"
import { Lead } from "./LeadList"

export default function ProspectList({
  prospectsData,
}: {
  prospectsData: Lead[]
}) {
  const [prospects, setProspects] = useState(prospectsData)

  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: string | null
    direction: "asc" | "desc"
  }>({ key: null, direction: "asc" })

  // Función para ordenar la tabla
  const sortTable = (key: keyof (typeof prospects)[0]) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }

    const sortedprospects = [...prospects].sort((a, b) => {
      if (key === "identification" || key === "age") {
        return direction === "asc"
          ? Number(a[key]) - Number(b[key])
          : Number(b[key]) - Number(a[key])
      } else if (key === "birthdate") {
        return direction === "asc"
          ? new Date(a[key]).getTime() - new Date(b[key]).getTime()
          : new Date(b[key]).getTime() - new Date(a[key]).getTime()
      } else {
        return direction === "asc"
          ? String(a[key]).localeCompare(String(b[key]))
          : String(b[key]).localeCompare(String(a[key]))
      }
    })

    setProspects(sortedprospects)
    setSortConfig({ key, direction })
  }

  // Función para remover acentos de una cadena de texto
  const removeAccents = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

  // Función para filtrar la tabla según el input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = removeAccents(e.target.value.toLowerCase())
    setSearchTerm(e.target.value)

    if (value === "") {
      setProspects(prospectsData)
    } else {
      const filteredprospects = prospectsData.filter(
        (lead) =>
          removeAccents(lead.firstName.toLowerCase()).includes(value) ||
          removeAccents(lead.lastName.toLowerCase()).includes(value)
      )
      setProspects(filteredprospects)
    }
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      {prospectsData.length > 0 ? (
        <>
          <div className="mb-4">
            {/* Input para buscar en la tabla */}
            <input
              type="text"
              placeholder="Buscar por nombre o apellido..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                {/* Encabezados de la tabla con funcion para filtrarla */}
                <tr className="bg-gray-100">
                  {[
                    { key: "firstName", label: "Primer Nombre" },
                    { key: "lastName", label: "Apellido" },
                    { key: "email", label: "Email" },
                    { key: "identification", label: "Identificación" },
                    { key: "birthdate", label: "Fecha de Nacimiento" },
                    { key: "age", label: "Edad" },
                  ].map(({ key, label }) => (
                    <th
                      key={key}
                      className="text-black border border-gray-300 px-4 py-2 text-left"
                    >
                      <button
                        onClick={() =>
                          sortTable(key as keyof (typeof prospects)[0])
                        }
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
                  <th className="text-black border border-gray-300 px-4 py-2 text-left">
                    Teléfono de Contacto
                  </th>
                </tr>
              </thead>
              <tbody>
                {prospects.map((lead) => (
                  <tr key={lead.id} className="border border-gray-300">
                    <td className="text-black border border-gray-300 px-4 py-2">
                      {lead.firstName}
                    </td>
                    <td className="text-black border border-gray-300 px-4 py-2">
                      {lead.lastName}
                    </td>
                    <td className="text-black border border-gray-300 px-4 py-2">
                      {lead.email}
                    </td>
                    <td className="text-black border border-gray-300 px-4 py-2">
                      {lead.identification}
                    </td>
                    <td className="text-black border border-gray-300 px-4 py-2">
                      {lead.birthdate}
                    </td>
                    <td className="text-black border border-gray-300 px-4 py-2">
                      {lead.age}
                    </td>
                    <td className="text-black border border-gray-300 px-4 py-2">
                      {lead.phone}
                    </td>
                  </tr>
                ))}
                {prospects.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center text-gray-500 py-4">
                      No se encontraron resultados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <strong className="block text-center text-black py-4">
          No hay prospectos para mostrar.
        </strong>
      )}
    </div>
  )
}
