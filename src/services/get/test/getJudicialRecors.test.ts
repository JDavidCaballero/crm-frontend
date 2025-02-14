import { getJudicialRecord } from "../getJudicialRecord";
import judicialRecordsJson from "../../../mocks/judicialRecords.json";

describe("getJudicialRecords", () => {

    test('Returns the judicial when called the function', async () => {
        const judicialRecords = await getJudicialRecord();
        expect(judicialRecords).toEqual(judicialRecordsJson);
    
    })
})