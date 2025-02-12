import { useEffect, useState } from "react"
import { Lead } from "./LeadList"

interface ConfirmationModalProps {
  lead: Lead
  onClose: () => void
  setProspects: React.Dispatch<React.SetStateAction<Lead[]>>
  setLeadsData: React.Dispatch<React.SetStateAction<Lead[]>>
}

export default function ConfirmationModal({
  lead,
  onClose,
  setProspects,
  setLeadsData,
}: ConfirmationModalProps) {
  const [score, setScore] = useState<number>(0)

  useEffect(() => {
    // Generar un puntaje aleatorio entre 0 y 100 al abrir el modal
    setScore(Math.floor(Math.random() * 101))
  }, [lead])

  // Validaciones
  const existsInRegistry = Math.random() > 0.2 // Simulación (80% de probabilidad de éxito) CAMBIAR
  const noJudicialRecords = Math.random() > 0.1 // Simulación (90% de probabilidad de éxito) CAMBIAR
  const satisfactoryScore = score > 60 // Puntaje aleatorio para ser admitido

  // Si cumple con los requisitos, se convierte en prospecto y se elimina de la lista de leads
  if (existsInRegistry && noJudicialRecords && satisfactoryScore) {
    setProspects((prospects) => {
      if (!prospects.some((p) => p.id === lead.id)) {
        setLeadsData((leads) => leads.filter((l) => l.id !== lead.id))
        return [...prospects, lead]
      }
      return prospects
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          Validación de requisitos
        </h2>
        <p className=" text-gray-500 mb-6">
          Validación de los requisitos necesarios para convertir a{" "}
          <strong>
            {lead.firstName} {lead.lastName}
          </strong>{" "}
          en un prospecto.
        </p>

        <div className="space-y-4">
          <ValidationItem
            label="Existe en el registro nacional y su información coincide"
            isValid={existsInRegistry}
          />
          <ValidationItem
            label="No tiene antecedentes judiciales"
            isValid={noJudicialRecords}
          />
          <ValidationItem
            label="Calificación interna del prospecto"
            isValid={satisfactoryScore}
            extraInfo={`Puntaje: ${score}`}
          />
        </div>

        <strong className="mt-5 text-center block">
          {existsInRegistry && noJudicialRecords && satisfactoryScore
            ? "✅ ¡El prospecto ha sido creado exitosamente!"
            : "❌ ¡No cumple con los requisitos para ser un prospecto!"}
        </strong>

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

interface ValidationItemProps {
  label: string
  isValid: boolean
  extraInfo?: string
}

function ValidationItem({ label, isValid, extraInfo }: ValidationItemProps) {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <div>
        <p className="font-medium">{label}</p>
        {extraInfo && <p className="text-sm text-gray-500">{extraInfo}</p>}
      </div>
      <span
        className={`text-2xl ${isValid ? "text-green-500" : "text-red-500"}`}
      >
        {isValid ? "✅" : "❌"}
      </span>
    </div>
  )
}
