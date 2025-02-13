import judicialRecords from "../../mocks/judicialRecords.json"
import { Lead } from "./getLeads";

// Use of Lead type as its the same structure of data for both leads and judicialRecords
export const getJudicialRecord = async (): Promise<Lead[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve(judicialRecords);
      
    }, 2000);
  });
};
