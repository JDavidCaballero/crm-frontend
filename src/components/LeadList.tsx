import ConfirmationModal from "./ConfirmationModal"
import SearchInput from "./SearchInput"
import { useSortableLeadsOrProspects } from "../hooks/useSortTable"
import { useState } from "react"
import { MainTable } from "./MainTable"
import { Lead } from "../services/get/getLeads"

export default function LeadList({
  setProspects,
  leadsData,
  setLeads,
}: {
  setProspects: React.Dispatch<React.SetStateAction<Lead[]>>
  leadsData: Lead[]
  setLeads: React.Dispatch<React.SetStateAction<Lead[]>>
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
        actions={(lead) => (
          <button
            onClick={() => setSelectedLead(lead)}
            className="bg-transparent bg-accent text-gray-200 font-semibold hover:text-white py-2 px-4 border hover:border-green rounded"
          >
            Validar
          </button>
        )}
      />

      {/* Mostrar el modal si hay un prospecto seleccionado */}
      {selectedLead && (
        <ConfirmationModal
          key={selectedLead.id}
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          setProspects={setProspects}
          setLeadsData={setLeads}
        />
      )}
    </div>
  )
}
