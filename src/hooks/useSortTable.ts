import { Lead } from "../services/get/getLeads";
import {  useEffect, useState } from "react";

interface SortConfig {
  key: keyof Lead | null;
  direction: "asc" | "desc";
}

export function useSortableLeadsOrProspects(data: Lead[]) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Lead[]>(data);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Función para ordenar la tabla
  const sortTable = (key: keyof Lead) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...filteredData].sort((a, b) => {
      if (key === "identification" || key === "age") {
        return direction === "asc"
          ? Number(a[key]) - Number(b[key])
          : Number(b[key]) - Number(a[key]);
      } else if (key === "birthdate") {
        return direction === "asc"
          ? new Date(a[key]).getTime() - new Date(b[key]).getTime()
          : new Date(b[key]).getTime() - new Date(a[key]).getTime();
      } else {
        return direction === "asc"
          ? String(a[key]).localeCompare(String(b[key]))
          : String(b[key]).localeCompare(String(a[key]));
      }
    });

    setFilteredData(sortedData);
    setSortConfig({ key, direction });
  };

  // Función para remover acentos de una cadena de texto
  const removeAccents = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Función para filtrar la tabla según el input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = removeAccents(e.target.value.toLowerCase());
    setSearchTerm(e.target.value);

    if (value === "") {
      setFilteredData(data);
    } else {
      const filteredResults = data.filter(
        (item) =>
          removeAccents(item.firstName.toLowerCase()).includes(value) ||
          removeAccents(item.lastName.toLowerCase()).includes(value)
      );
      setFilteredData(filteredResults);
    }
  };

  return { searchTerm, filteredData, sortTable, handleSearch, sortConfig };
}
