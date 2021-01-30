const Employee = require("../lib/Employee");
//code to define and export the Manager class.
class Manager extends Employee{
    constructor(name, id, email, officeNumber){
        super(name, id, email);
        this.name = name; 
        this.id = id;
        this.email = email; 
        this.officeNumber = officeNumber; 
        this.role = 'Manager'; 
    }
}
//Manager function
Manager.prototype.getRole = function() {
    return this.role; 
}

Manager.prototype.getOfficeNumber = function() {
    return this.officeNumber; 
}
//End Manager function

//Export Manager
module.exports = Manager; 