import { getLeads } from "../getLeads";
import leadsData from "../../../mocks/leadsData.json"

describe("getLeads", () => {

test("Return the leads when the function is used", async () => {
  jest.spyOn(global.Math, "random").mockReturnValue(1);

  const leads = await getLeads();
  expect(leads).toEqual(leadsData);
});

test("should reject with an error on failure", async () => {
    //Se mockea la funcion random para que saque el porcentaje de error
    jest.spyOn(global.Math, "random").mockReturnValue(0.1);
    const promise = getLeads();
    // Se avanza el tiempo por el timeout
    await expect(promise).rejects.toThrow("Failed to fetch leads");
  });

});