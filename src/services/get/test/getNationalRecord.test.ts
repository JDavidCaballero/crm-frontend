import { getNationalRecord } from "../getNationalRecord";
import nationalRecordsJson from "../../../mocks/nationalRecords.json";
import { waitFor } from "@testing-library/dom";

describe("getNationalRecord", () => {

    test("Returns National records when function called", async () => {
        const nationalRecords = await getNationalRecord();
        await waitFor(() => {
        expect(nationalRecords).toEqual(nationalRecordsJson);
    })
    //Se pone 6000 para esperar al timeout de la peticion
},6000)  
})