import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/Tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/Card"
import LeadList, { Lead } from "../components/LeadList"
import ProspectList from "../components/ProspectList"
import { useState } from "react"

export default function HomeScreen() {
  const [propspects, setProspects] = useState<Lead[]>([])

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        CRM - Gestión de Clientes
      </h1>
      <Tabs defaultValue="leads" className="max-w-7xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="prospects">Prospectos</TabsTrigger>
        </TabsList>
        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Lista de Leads</CardTitle>
              <CardDescription className="text-center">
                Personas interesadas en nuestros servicios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeadList setProspects={setProspects} />
            </CardContent>
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
