//validates enteries
const validateEntries = value => (value === '')? 'not a valid input': true; 
//valiadte number
const validateNumbers =  value => (/^[0-9]/).test(value)? true : 'not a valid input';
//validate email
const validateEmail = value => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ? true : 'not a valid email address';

//exports
module.exports = {validateEntries,validateNumbers, validateEmail}; 