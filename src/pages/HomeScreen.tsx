import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/Card"
import LeadList from "../components/LeadList"
import ProspectList from "../components/ProspectList"
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getLeads, Lead } from "../services/get/getLeads"
import Loader from "../components/Loader"

export default function HomeScreen() {
  const [propspects, setProspects] = useState<Lead[]>([])
  const [leads, setLeads] = useState<Lead[] | null>(null)

  const { isLoading, data: fetchedLeads = [] } = useQuery({
    queryKey: ["leads"],
    queryFn: getLeads,
    onError: (error) => {
      console.error("Error al cargar leads:", error)
      //aqui poner un toast de error
    },
  })

  // Actualizar leads si se cargaron correctamente, importante verificar si es null y que la data llegue > 0 porque esto permite que no se modifique una vez el sistema ya este puesto en marcha
  useEffect(() => {
    if (leads === null && fetchedLeads.length > 0) {
      setLeads(fetchedLeads)
    }
  }, [fetchedLeads, leads])

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        CRM - Gestión de Clientes
      </h1>
      <Tabs defaultValue="leads" className="max-w-7xl mx-auto">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="prospects">Prospectos</TabsTrigger>
        </TabsList>
        <TabsContent value="leads">
          <Card>
            <>
              <CardHeader>
                <CardTitle className="text-center">Lista de Leads</CardTitle>
                <CardDescription className="text-center">
                  Personas interesadas en nuestros servicios
                </CardDescription>
              </CardHeader>

              {isLoading || leads === null ? (
                <Loader />
              ) : (
                <CardContent>
                  <LeadList
                    setProspects={setProspects}
                    leadsData={leads || []}
                    setLeads={
                      setLeads as React.Dispatch<React.SetStateAction<Lead[]>>
                    }
                  />
                </CardContent>
              )}
            </>
          </Card>
        </TabsContent>
        <TabsContent value="prospects">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Lista de Prospectos</CardTitle>
              <CardDescription className="text-center">
                Clientes potenciales que han sido calificados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProspectList prospectsData={propspects} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
