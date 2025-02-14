/* eslint-disable @typescript-eslint/no-require-imports */
import ConfirmationModal from "../ConfirmationModal"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query"
import { render, waitFor } from "@testing-library/react"
import { Lead } from "../../services/get/getLeads"
import { getNationalRecord } from "../../services/get/getNationalRecord"
import { getJudicialRecord } from "../../services/get/getJudicialRecord"

jest.mock("../../services/get/getNationalRecord", () => ({
  getNationalRecord: jest.fn(),
}))

jest.mock("../../services/get/getJudicialRecord", () => ({
  getJudicialRecord: jest.fn(),
}))

jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useQuery: jest.fn(),
}))

const leadMock: Lead = {
  id: 1,
  identification: "1023456789",
  birthdate: "1990-05-14",
  firstName: "Carlos",
  lastName: "Ramírez",
  age: 33,
  email: "carlos.ramirez@mail.com",
  phone: "+57 301 234 5678",
}

const mockOnclose = jest.fn()
const mockSetProspects = jest.fn()
const mockSetLeadsData = jest.fn()

describe("ConfirmationModal", () => {
  const queryClient = new QueryClient()

  test("renders correctly", () => {
    ;(useQuery as jest.Mock).mockReturnValue({
      data: undefined,
      error: null,
      isLoading: false,
    })

    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <ConfirmationModal
          lead={leadMock}
          onClose={mockOnclose}
          setProspects={mockSetProspects}
          setLeadsData={mockSetLeadsData}
        />
      </QueryClientProvider>
    )
    expect(getByTestId("confirmModalID")).toBeDefined()
  })

  test("should update 'existsInRegistry' when the lead exists in the registry", async () => {
    const mockSetProspects = jest.fn()
    const mockSetLeadsData = jest.fn()

    const mockLead: Lead = {
      id: 1,
      identification: "1023456789",
      birthdate: "1990-05-14",
      firstName: "Carlos",
      lastName: "Ramírez",
      age: 33,
      email: "carlos.ramirez@mail.com",
      phone: "+57 301 234 5678",
    }

    ;(getNationalRecord as jest.Mock).mockResolvedValue([mockLead])
    ;(useQuery as jest.Mock).mockImplementation(({ queryKey, onSuccess }) => {
      if (queryKey[0] === "nationalRegistry") {
        onSuccess([mockLead])
      }
      return { data: [mockLead], isLoading: false, isFetching: false }
    })

    const setExistsInRegistry = jest.fn()
    jest
      .spyOn(require("react"), "useState")
      .mockImplementation((initialValue) => {
        if (initialValue === false) {
          return [initialValue, setExistsInRegistry]
        }
        return [initialValue, jest.fn()]
      })

    render(
      <QueryClientProvider client={queryClient}>
        <ConfirmationModal
          lead={mockLead}
          onClose={() => {}}
          setProspects={mockSetProspects}
          setLeadsData={mockSetLeadsData}
        />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(setExistsInRegistry).toHaveBeenCalledWith(true)
    })
  })

  test("should update 'setNoJudicialRecords' when the lead exists in the registry", async () => {
    const mockSetProspects = jest.fn()
    const mockSetLeadsData = jest.fn()

    const mockLead: Lead = {
      id: 5,
      identification: "1045678901",
      birthdate: "1988-12-18",
      firstName: "Luis",
      lastName: "Fernández",
      age: 35,
      email: "luis.fernandez@mail.com",
      phone: "+57 320 345 6789",
    }

    ;(getJudicialRecord as jest.Mock).mockResolvedValue([mockLead])
    ;(useQuery as jest.Mock).mockImplementation(({ queryKey, onSuccess }) => {
      if (queryKey[0] === "judicialRecords") {
        onSuccess([mockLead])
      }
      return { data: [mockLead], isLoading: false, isFetching: false }
    })

    const setNoJudicialRecords = jest.fn()
    jest
      .spyOn(require("react"), "useState")
      .mockImplementation((initialValue) => {
        if (initialValue === false) {
          return [initialValue, setNoJudicialRecords]
        }
        return [initialValue, jest.fn()]
      })

    render(
      <QueryClientProvider client={queryClient}>
        <ConfirmationModal
          lead={mockLead}
          onClose={() => {}}
          setProspects={mockSetProspects}
          setLeadsData={mockSetLeadsData}
        />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(setNoJudicialRecords).toHaveBeenCalledWith(false)
    })
  })

  test("should update prospects when lead is eligible", async () => {
    const mockSetProspects = jest.fn()
    const mockSetLeadsData = jest.fn()

    const mockLead: Lead = {
      id: 1,
      identification: "1023456789",
      birthdate: "1990-05-14",
      firstName: "Carlos",
      lastName: "Ramírez",
      age: 33,
      email: "carlos.ramirez@mail.com",
      phone: "+57 301 234 5678",
    }

    ;(getNationalRecord as jest.Mock).mockResolvedValue([mockLead])
    ;(getJudicialRecord as jest.Mock).mockResolvedValue([])

    // Simular el comportamiento de useQuery
    ;(useQuery as jest.Mock).mockImplementation(({ queryKey, onSuccess }) => {
      if (queryKey[0] === "nationalRegistry") {
        onSuccess([mockLead])
      } else if (queryKey[0] === "judicialRecords") {
        onSuccess([])
      }
      return { data: [], isLoading: false, isFetching: false }
    })

    jest
      .spyOn(require("react"), "useState")
      .mockImplementation((initialValue) => {
        if (initialValue === false) {
          return [true, jest.fn()]
        } else if (initialValue === true) {
          return [true, jest.fn()]
        } else if (initialValue === 0) {
          return [70, jest.fn()]
        }
        return [initialValue, jest.fn()]
      })

    render(
      <QueryClientProvider client={queryClient}>
        <ConfirmationModal
          lead={mockLead}
          onClose={() => {}}
          setProspects={mockSetProspects}
          setLeadsData={mockSetLeadsData}
        />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(mockSetProspects).toHaveBeenCalledWith(expect.any(Function))
    })

    // Aca se verifica que la función se pasó a setProspects y  que devuelve el valor esperado
    const updateProspectsFunction = mockSetProspects.mock.calls[0][0]
    const updatedProspects = updateProspectsFunction([])
    expect(updatedProspects).toEqual([mockLead])
  })

  test("should not update prospects when lead is not eligible", async () => {
    const mockSetProspects = jest.fn()
    const mockSetLeadsData = jest.fn()

    const mockLead: Lead = {
      id: 4,
      identification: "1012345678",
      birthdate: "1992-07-30",
      firstName: "Andrea",
      lastName: "Torres",
      age: 31,
      email: "andrea.torres@mail.com",
      phone: "+57 315 890 1234",
    }

    ;(getNationalRecord as jest.Mock).mockResolvedValue([])
    ;(getJudicialRecord as jest.Mock).mockResolvedValue([])
    ;(useQuery as jest.Mock).mockImplementation(({ queryKey, onSuccess }) => {
      if (queryKey[0] === "nationalRegistry") {
        onSuccess([])
      } else if (queryKey[0] === "judicialRecords") {
        onSuccess([])
      }
      return { data: [], isLoading: false, isFetching: false }
    })

    jest
      .spyOn(require("react"), "useState")
      .mockImplementation((initialValue) => {
        if (initialValue === false) {
          return [false, jest.fn()]
        } else if (initialValue === true) {
          return [false, jest.fn()]
        } else if (initialValue === 0) {
          return [10, jest.fn()]
        }
        return [initialValue, jest.fn()]
      })

    render(
      <QueryClientProvider client={queryClient}>
        <ConfirmationModal
          lead={mockLead}
          onClose={() => {}}
          setProspects={mockSetProspects}
          setLeadsData={mockSetLeadsData}
        />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(mockSetProspects).not.toHaveBeenCalled()
    })

    expect(mockSetLeadsData).not.toHaveBeenCalled()
  })
})
