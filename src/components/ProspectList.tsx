import { MainTable } from "./MainTable"
import SearchInput from "./SearchInput"
import { useSortableLeadsOrProspects } from "../hooks/useSortTable"
import { Lead } from "../services/get/getLeads"

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

          <MainTable
            data={filteredData}
            columns={[
              { key: "firstName", label: "Primer Nombre" },
              { key: "lastName", label: "Apellido" },
              { key: "email", label: "Email" },
              { key: "identification", label: "Identificación" },
              { key: "birthdate", label: "Fecha de Nacimiento" },
              { key: "age", label: "Edad" },
              { key: "phone", label: "Teléfono de Contacto" },
            ]}
            sortConfig={sortConfig}
            sortTable={sortTable}
          />
        </>
      ) : (
        <strong className="block text-center text-black py-4">
          No hay prospectos para mostrar.
        </strong>
      )}
    </div>
  )
}
