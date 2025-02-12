import ConfirmationModal from "./ConfirmationModal"
import leadsData from "../services/leadsData.json"
import SearchInput from "./SearchInput"
import { useSortableLeadsOrProspects } from "../hooks/useSortTable"
import { useState } from "react"

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
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  const { searchTerm, filteredData, sortTable, handleSearch, sortConfig } =
    useSortableLeadsOrProspects(leadsData)

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        {/* Input para buscar en la tabla */}
        <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
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
                      sortTable(key as keyof (typeof filteredData)[0])
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
              <th className="text-black border border-gray-300 px-4 py-2 text-left">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((lead) => (
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
            {filteredData.length === 0 && (
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
