import { Lead } from "./getLeads";
import nationalRecords from "../../mocks/nationalRecords.json"

// Use of Lead type as its the same structure of data for both leads and getNationalRecord
export const getNationalRecord = async (): Promise<Lead[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
        resolve(nationalRecords);
    }, 5000);
  });
};
