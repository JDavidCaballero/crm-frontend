import { useState } from "react"
import ConfirmationModal from "./ConfirmationModal"
import leadsData from "../services/leadsData.json"

export interface Lead {
  id: number
  firstName: string
  lastName: string
  identification: string
  birthdate: string
  age: number
  email: string
  phone: string
}

export default function LeadList({
  setProspects,
}: {
  setProspects: React.Dispatch<React.SetStateAction<Lead[]>>
}) {
  const leadsDataCopy = leadsData as Lead[]
  const [leads, setLeads] = useState(leadsDataCopy)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{
    key: string | null
    direction: "asc" | "desc"
  }>({ key: null, direction: "asc" })

  // Función para ordenar la tabla
  const sortTable = (key: keyof (typeof leads)[0]) => {
    let direction: "asc" | "desc" = "asc"
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc"
    }

    const sortedLeads = [...leads].sort((a, b) => {
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

    setLeads(sortedLeads)
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
      setLeads(leadsDataCopy)
    } else {
      const filteredLeads = leadsDataCopy.filter(
        (lead) =>
          removeAccents(lead.firstName.toLowerCase()).includes(value) ||
          removeAccents(lead.lastName.toLowerCase()).includes(value)
      )
      setLeads(filteredLeads)
    }
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
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
                    onClick={() => sortTable(key as keyof (typeof leads)[0])}
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
              <th className="text-black border border-gray-300 px-4 py-2 text-left">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
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
                <td className="flex justify-center items-center h-16">
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  >
                    Validar
                  </button>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center text-gray-500 py-4">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mostrar el modal si hay un prospecto seleccionado */}
      {selectedLead && (
        <ConfirmationModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          setProspects={setProspects}
        />
      )}
    </div>
  )
}
