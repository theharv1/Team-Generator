const chalkPipe = require('chalk-pipe');
// color coded for employee, manager, and intern
let blue = chalkPipe('blue.bold'); 
let green = chalkPipe('green.bold');
let purple = chalkPipe('purple.bold');
let red = chalkPipe('red.bold'); 



module.exports = {
    blue,
    red,
    purple,
    green
}