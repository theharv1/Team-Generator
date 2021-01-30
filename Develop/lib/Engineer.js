const Employee = require("../lib/Employee");
//code to define and export the Engineer class.

class Engineer extends Employee {
    constructor(name, id, email, github){
        super(name, id, email);
        this.name = name;
        this.id = id;
        this.email = email;
        this.github = github;
        this.role = 'Engineer';
    }
}

// Engineer function
Engineer.prototype.getRole = function() {
    return this.role; 
}

Engineer.prototype.getGithub = function(){
    return this.github;
}

//End Engineer function

//Exports Engineer
module.exports = Engineer;