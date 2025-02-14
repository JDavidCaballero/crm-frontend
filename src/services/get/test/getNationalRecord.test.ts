import { getNationalRecord } from "../getNationalRecord";
import nationalRecordsJson from "../../../mocks/nationalRecords.json";
import { waitFor } from "@testing-library/dom";

describe("getNationalRecord", () => {

    test("Returns National records when function called", async () => {
        const nationalRecords = await getNationalRecord();
        await waitFor(() => {
        expect(nationalRecords).toEqual(nationalRecordsJson);
    })
   // Set 6000 to wait for the request timeout  
},6000)  
})