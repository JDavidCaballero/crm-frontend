import { Lead } from "./LeadList"
import SearchInput from "./SearchInput"
import { useSortableLeadsOrProspects } from "../hooks/useSortTable"

export default function ProspectList({
  prospectsData,
}: {
  prospectsData: Lead[]
}) {
  const { searchTerm, filteredData, sortTable, handleSearch, sortConfig } =
    useSortableLeadsOrProspects(prospectsData)

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md">
      {prospectsData.length > 0 ? (
        <>
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
        </>
      ) : (
        <strong className="block text-center text-black py-4">
          No hay prospectos para mostrar.
        </strong>
      )}
    </div>
  )
}
