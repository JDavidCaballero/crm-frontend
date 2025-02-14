import LeadList from "../LeadList"
import { fireEvent, render, screen } from "@testing-library/react"
import { Lead } from "../../services/get/getLeads"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

describe("LeadList", () => {
  test("should open the confirmation modal when clicking the 'Validar' button", () => {
    const mockSetProspects = jest.fn()
    const mockSetLeads = jest.fn()
    const leadsData: Lead[] = [
      {
        id: 1,
        firstName: "Juan",
        lastName: "Pérez",
        email: "juan@example.com",
        identification: "123456789",
        birthdate: "1990-01-01",
        age: 34,
        phone: "555-1234",
      },
    ]

    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <LeadList
          setProspects={mockSetProspects}
          leadsData={leadsData}
          setLeads={mockSetLeads}
        />
      </QueryClientProvider>
    )

    expect(screen.queryByTestId("confirmation-modal")).toBeNull()
    const validateButton = screen.getByRole("button", { name: /validar/i })
    fireEvent.click(validateButton)
    expect(screen.getByTestId("confirmModalID")).toBeDefined()
  })

  test("should close the confirmation modal when clicking the 'close' button", () => {
    const mockSetProspects = jest.fn()
    const mockSetLeads = jest.fn()
    const leadsData: Lead[] = [
      {
        id: 1,
        firstName: "Juan",
        lastName: "Pérez",
        email: "juan@example.com",
        identification: "123456789",
        birthdate: "1990-01-01",
        age: 34,
        phone: "555-1234",
      },
    ]
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <LeadList
          setProspects={mockSetProspects}
          leadsData={leadsData}
          setLeads={mockSetLeads}
        />
      </QueryClientProvider>
    )

    const validateButton = screen.getByRole("button", { name: /validar/i })
    fireEvent.click(validateButton)
    const closeBtn = screen.getByRole("button", { name: /cerrar/i })
    fireEvent.click(closeBtn)
    expect(screen.queryByTestId("confirmModalID")).toBeNull()
  })
})
