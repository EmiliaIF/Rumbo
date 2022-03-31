import { defaultDate } from "../utils/defaultDate";

test('testing that we get todays date when in current year & month', () => {

    expect(defaultDate(2021, 11).toISOString().slice(0, 10)).toEqual(new Date().toISOString().slice(0, 10));
});


test('Testar att vi får ut rätt år: ', () =>{
    expect(defaultDate(2021, 11).toISOString().slice(0,2)).toBe("2021-11");
})