import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import HomeScreen from "./HomeScreen"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"
import { Lead } from "../services/get/getLeads"
import { useState } from "react"

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}))

console.error = jest.fn()

describe("HomeScreen", () => {
  test("Renders correctly with main tab in page", () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: false,
    })

    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    )

    expect(screen.getByTestId("appTestID")).toBeDefined()
    expect(screen.getByText("CRM - Gestión de Clientes")).toBeDefined()
    expect(screen.getByText("Leads")).toBeDefined()
    expect(screen.getByText("Prospectos")).toBeDefined()
    expect(screen.getByText("Lista de Leads")).toBeDefined()
    expect(
      screen.getByText("Personas interesadas en nuestros servicios")
    ).toBeDefined()
  })

  test("Renders correctly with prospect tab in page", () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: false,
    })

    const queryClient = new QueryClient()
    const { getAllByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    )

    expect(screen.getByTestId("appTestID")).toBeDefined()
    expect(screen.getByText("CRM - Gestión de Clientes")).toBeDefined()
    const tabProspects = getAllByTestId("tabs-btn")[1]
    fireEvent.mouseDown(tabProspects)
    expect(screen.getByText("Lista de Prospectos")).toBeDefined()
    expect(
      screen.getByText("Clientes potenciales que han sido calificados")
    ).toBeDefined()
  })

  test("Updates leads state when fetchedLeads has data and leads is null", () => {
    const mockFetchedLeads: Lead[] = [
      {
        id: 1,
        identification: "1023456789",
        birthdate: "1990-05-14",
        firstName: "Carlos",
        lastName: "Ramírez",
        age: 33,
        email: "carlos.ramirez@mail.com",
        phone: "+57 301 234 5678",
      },
    ]

    ;(useQuery as jest.Mock).mockReturnValue({
      data: mockFetchedLeads,
      error: null,
      isLoading: false,
    })

    const setLeadsMock = jest.fn()
    jest
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      .spyOn(require("react"), "useState")
      .mockImplementation((initialValue) => {
        if (initialValue === null) {
          return [null, setLeadsMock]
        }
        return [initialValue, jest.fn()]
      })

    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    )

    expect(setLeadsMock).toHaveBeenCalledWith(mockFetchedLeads)
  })

  test("Shows loader when is query is loading", () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    })

    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    )

    expect(screen.getByTestId("loaderID")).toBeDefined()
  })

  test("shows leadList when leads are loaded", async () => {
    const mockFetchedLeads: Lead[] = [
      {
        id: 1,
        identification: "1023456789",
        birthdate: "1990-05-14",
        firstName: "Carlos",
        lastName: "Ramírez",
        age: 33,
        email: "carlos.ramirez@mail.com",
        phone: "+57 301 234 5678",
      },
    ]
    ;(useQuery as jest.Mock).mockReturnValue({
      data: mockFetchedLeads,
      error: null,
      isLoading: false,
    })

    const setLeadsMock = jest.fn()
    ;(useState as jest.Mock).mockImplementation((initialValue) => {
      if (initialValue === null) {
        // Aca se simula que leads se actualiza
        return [mockFetchedLeads, setLeadsMock]
      }
      return [initialValue, jest.fn()]
    })

    const queryClient = new QueryClient()
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(getByTestId("leadListID")).toBeDefined()
    })
  })
})
