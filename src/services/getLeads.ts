import { Lead } from "@components/LeadList";
import leadsData from "../mocks/leadsData.json";

export const getLeads = async (): Promise<Lead[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.2) {
        reject(new Error("Failed to fetch leads"));
      } else {
        resolve(leadsData);
      }
    }, 2000);
  });
};
