import { useSortableLeadsOrProspects } from "./useSortTable";
import { Lead } from "../services/get/getLeads";
import { renderHook } from "@testing-library/react";
import { act } from "react";

const mockData: Lead[] = [
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
  {
    id: 2,
    identification: "9876543210",
    birthdate: "1985-10-22",
    firstName: "Ana",
    lastName: "Gómez",
    age: 38,
    email: "ana.gomez@mail.com",
    phone: "+57 302 345 6789",
  },
  {
    id: 3,
    identification: "1234567890",
    birthdate: "1995-03-30",
    firstName: "Pedro",
    lastName: "Pérez",
    age: 28,
    email: "pedro.perez@mail.com",
    phone: "+57 303 456 7890",
  },
];

describe("useSortableLeadsOrProspects", () => {
  test("should initialize with default values", () => {
    const { result } = renderHook(() => useSortableLeadsOrProspects(mockData));

    expect(result.current.searchTerm).toBe("");
    expect(result.current.filteredData).toEqual(mockData);
    expect(result.current.sortConfig).toEqual({
      key: null,
      direction: "asc",
    });
  });

  test("should update filteredData when data changes", () => {
    const { result, rerender } = renderHook(
      ({ data }) => useSortableLeadsOrProspects(data),
      {
        initialProps: { data: mockData },
      }
    );

    const newData: Lead[] = [
      ...mockData,
      {
        id: 4,
        identification: "4567890123",
        birthdate: "2000-01-01",
        firstName: "Luisa",
        lastName: "Fernández",
        age: 23,
        email: "luisa.fernandez@mail.com",
        phone: "+57 304 567 8901",
      },
    ];

    act(() => {
      rerender({ data: newData });
    });

    expect(result.current.filteredData).toEqual(newData);
  });

  test("should filter data based on search term", () => {
    const { result } = renderHook(() => useSortableLeadsOrProspects(mockData));

    act(() => {
      result.current.handleSearch({
        target: { value: "carlos" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.filteredData).toEqual([mockData[0]]);
    expect(result.current.searchTerm).toBe("carlos");

    act(() => {
      result.current.handleSearch({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.filteredData).toEqual(mockData);
    expect(result.current.searchTerm).toBe("");
  });

  test("should sort data by a key in ascending and descending order", () => {
    const { result } = renderHook(() => useSortableLeadsOrProspects(mockData));

    act(() => {
      result.current.sortTable("firstName");
    });

    expect(result.current.filteredData).toEqual([
      mockData[1], 
      mockData[0], 
      mockData[2], 
    ]);
    expect(result.current.sortConfig).toEqual({
      key: "firstName",
      direction: "asc",
    });

    act(() => {
      result.current.sortTable("firstName");
    });

    expect(result.current.filteredData).toEqual([
      mockData[2],
      mockData[0],
      mockData[1], 
    ]);
    expect(result.current.sortConfig).toEqual({
      key: "firstName",
      direction: "desc",
    });

    act(() => {
      result.current.sortTable("age");
    });

    expect(result.current.filteredData).toEqual([
      mockData[2],
      mockData[0], 
      mockData[1], 
    ]);
    expect(result.current.sortConfig).toEqual({
      key: "age",
      direction: "asc",
    });
  });

  test("should handle sorting by birthdate", () => {
    const { result } = renderHook(() => useSortableLeadsOrProspects(mockData));

    act(() => {
      result.current.sortTable("birthdate");
    });

    expect(result.current.filteredData).toEqual([
      mockData[1],
      mockData[0],
      mockData[2],
    ]);
    expect(result.current.sortConfig).toEqual({
      key: "birthdate",
      direction: "asc",
    });
  });
});