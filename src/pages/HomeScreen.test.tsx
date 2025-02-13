import { fireEvent, render } from "@testing-library/react"
import HomeScreen from "./HomeScreen"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

test("Renders correctly with main tab in page", () => {
  const queryClient = new QueryClient()
  const { getByTestId, getByText } = render(
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  )
  expect(getByTestId("appTestID")).toBeDefined()
  expect(getByText("CRM - Gestión de Clientes")).toBeDefined()
  expect(getByText("Leads")).toBeDefined()
  expect(getByText("Prospectos")).toBeDefined()
  expect(getByText("Lista de Leads")).toBeDefined()
  expect(getByText("Personas interesadas en nuestros servicios")).toBeDefined()
})

test("Renders correctly with prospect tab in page", () => {
  const queryClient = new QueryClient()
  const { getByTestId, getByText, getAllByTestId } = render(
    <QueryClientProvider client={queryClient}>
      <HomeScreen />
    </QueryClientProvider>
  )
  expect(getByTestId("appTestID")).toBeDefined()
  expect(getByText("CRM - Gestión de Clientes")).toBeDefined()

  const tabProspects = getAllByTestId("tabs-btn")[1]
  fireEvent.mouseDown(tabProspects)

  expect(getByText("Lista de Prospectos")).toBeDefined()
  expect(
    getByText("Clientes potenciales que han sido calificados")
  ).toBeDefined()
})
