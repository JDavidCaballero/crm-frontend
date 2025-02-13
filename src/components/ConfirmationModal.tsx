import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getJudicialRecord } from "../services/get/getJudicialRecord"
import { Lead } from "../services/get/getLeads"
import { getNationalRecord } from "../services/get/getNationalRecord"
import Loader from "./Loader"

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
  const [existsInRegistry, setExistsInRegistry] = useState<boolean>(false)
  const [noJudicialRecords, setNoJudicialRecords] = useState<boolean>(false)

  const { isLoading: isLoadingRegistry, isFetching: isFetchingRegistry } =
    useQuery({
      queryKey: ["nationalRegistry"],
      queryFn: getNationalRecord,
      onSuccess: (data) => {
        // Verifica si el lead existe en el registro nacional
        const found = data.some((record: Lead) => record.id === lead.id)
        if (found !== existsInRegistry) setExistsInRegistry(found)
      },
    })

  const { isLoading: isLoadingJudicial, isFetching: isFetchingJudicial } =
    useQuery({
      queryKey: ["judicialRecords"],
      queryFn: getJudicialRecord,
      onSuccess: (data) => {
        // Verifica si el lead tiene antecedentes judiciales
        const found = data.some((record: Lead) => record.id === lead.id)
        setNoJudicialRecords(!found)
      },
    })

  const loadingRegistry = isLoadingRegistry || isFetchingRegistry
  const loadingJudicial = isLoadingJudicial || isFetchingJudicial

  useEffect(() => {
    // Generar un puntaje aleatorio entre 0 y 100 al abrir el modal
    setScore(Math.floor(Math.random() * 101))
  }, [lead])

  // Validaciones
  const satisfactoryScore = score > 60
  const isEligible = existsInRegistry && noJudicialRecords && satisfactoryScore

  // Solo actualizar prospectos cuando ambas consultas hayan terminado
  useEffect(() => {
    if (!loadingRegistry && !loadingJudicial && isEligible) {
      setProspects((prospects) => {
        if (!prospects.some((p) => p.id === lead.id)) {
          setLeadsData((leads) => leads.filter((l) => l.id !== lead.id))
          return [...prospects, lead]
        }
        return prospects
      })
    }
  }, [
    loadingRegistry,
    loadingJudicial,
    isEligible,
    lead,
    setProspects,
    setLeadsData,
  ])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white border border-accent p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">
          Validación de requisitos
        </h2>
        <p className=" text-accent mb-6">
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
            isLoading={loadingRegistry || isFetchingRegistry}
          />
          <ValidationItem
            label="No tiene antecedentes judiciales"
            isValid={noJudicialRecords}
            isLoading={loadingJudicial}
          />
          <ValidationItem
            label="Calificación interna del prospecto"
            isValid={satisfactoryScore}
            extraInfo={`Puntaje: ${score}`}
          />
        </div>

        {!loadingRegistry && !loadingJudicial && (
          <strong className="mt-5 text-center block">
            {isEligible
              ? "✅ ¡El prospecto ha sido creado exitosamente!"
              : "❌ ¡No cumple con los requisitos para ser un prospecto!"}
          </strong>
        )}
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-accent hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
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
  isLoading?: boolean
}

function ValidationItem({
  label,
  isValid,
  extraInfo,
  isLoading,
}: ValidationItemProps) {
  return (
    <div className="flex justify-between items-center border-b pb-2">
      <div>
        <p className="font-medium">{label}</p>
        {extraInfo && <p className="text-sm text-gray-500">{extraInfo}</p>}
      </div>
      <span
        className={`text-2xl ${isValid ? "text-green-500" : "text-red-500"}`}
      >
        {isLoading ? (
          <Loader className="text-center m-1" />
        ) : isValid ? (
          "✅"
        ) : (
          "❌"
        )}
      </span>
    </div>
  )
}
