const { validateEntries, validateNumbers, validateEmail } = require('../lib/validate');


describe('this test validateEntries', () => {
    it('should return this is not a valid input when no string is inputed', () => {
        const testValue = '';

        let result = validateEntries(testValue);

        expect(result).toBe('this is not a valid input');
    })
    it('should return true is the input is valid', () => {
        const testValue = 'test';

        let result = validateEntries(testValue);

        expect(result).toEqual(true);
    })
})

describe('this test validateNumbers', () => {
    it('should return this is not a valid input when not a number', () => {
        const testValue = 'test value';

        let result = validateNumbers(testValue);

        expect(result).toBe('this is not a valid input');
    })
    it('should return true if input typeof is  number', () => {
        const testValue = 23;

        let result = validateNumbers(testValue);

        expect(result).toEqual(true);

    })
})

describe('this test validateEmail', () => {
    it('should return this is not a valid input', () => {
        const testValue = 'eri';

        let result = validateEmail(testValue);

        expect(result).toBe('this is not a valid email adress');
    })
    it('should return true if the input is and email', () => {
        const testValue = 'erik@gmail.com';

        let result = validateEmail(testValue);

        expect(result).toEqual(true);

    })
})