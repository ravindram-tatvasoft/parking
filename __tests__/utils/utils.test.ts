import { getDifferenceDateString, msToTime, validateCarNo } from "../../utils"

describe("Utils", () => {
    test("msToTime ", () => {
        const time = msToTime(1643111892912)
        expect(time).toBe("17:28:12")
    })

    test("getDifferenceDateString in minutes", () =>{
        const diff = getDifferenceDateString("Tue Jan 25 2022 17:28:12", "Tue Jan 25 2022 17:58:12")
        expect(diff).toBe("30 minutes")
    })

    test("getDifferenceDateString in hours", () =>{
        const diff = getDifferenceDateString("Tue Jan 25 2022 17:00:12", "Tue Jan 25 2022 20:20:12")
        expect(diff).toBe("03 hours 20 minutes")
    })

    test("Car number valid: false ", () => {
       const isValid =  validateCarNo("GJ")
       expect(isValid).toBe(false)
    })

    test("Car number valid: true ", () => {
        const isValid =  validateCarNo("GJ 01 XX 1234")
        expect(isValid).toBe(true)
     })
})