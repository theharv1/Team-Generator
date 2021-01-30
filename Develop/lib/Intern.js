const Employee = require("../lib/Employee");
//code to define and export the Intern class.
 class Intern extends Employee{
    constructor(name, id, email, school){
        super(name, id, email);
        this.name = name;
        this.id = id;
        this.email = email;
        this.school = school;
        this.role = 'Intern';   
    }
}
//Intern function
Intern.prototype.getRole = function() {
    return this.role; 
}

Intern.prototype.getSchool = function() {
    return this.school; 
}
//End Intern fuction

//Export Intern
module.exports = Intern;
