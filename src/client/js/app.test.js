import { checkCity } from "./formHandler"
import { checkDate } from "./formHandler"

describe("Testing the submit functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing the performAction function", () => {
        expect(checkCity("paris")).toEqual(true);
        expect(checkDate("2020-10-29")).toEqual(true);
    
})});