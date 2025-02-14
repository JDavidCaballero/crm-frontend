import { getLeads } from "../getLeads";
import leadsData from "../../../mocks/leadsData.json"

describe("getLeads", () => {

test("Return the leads when the function is used", async () => {
  jest.spyOn(global.Math, "random").mockReturnValue(1);

  const leads = await getLeads();
  expect(leads).toEqual(leadsData);
});

test("should reject with an error on failure", async () => {
    // Mock the random function to produce the error percentage  
    jest.spyOn(global.Math, "random").mockReturnValue(0.1);
    const promise = getLeads();
    // Advance time for the timeout  
    await expect(promise).rejects.toThrow("Failed to fetch leads");
  });

});