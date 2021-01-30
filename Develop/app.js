const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const chalkPipe = require('chalk-pipe');
const color = require('./chalk/colors');
const path = require("path");
const fs = require("fs");

const { validateEntries, validateNumbers, validateEmail } = require('./lib/validate');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const validate = require("./lib/validate");
const { clearScreenDown } = require("readline");

const teamMembers = [];


// Main Questions 
const questions = [
    {
        type: 'input',
        message: color.green('whats your name?'),
        name: 'name',
        validate: validateEntries
    },
    {
        type: 'input',
        message: color.green('whats your id #?'),
        name: 'id',
        validate: validateNumbers
    },
    {
        type: 'input',
        message: color.green('whats your email?'),
        name: 'email',
        validate: validateEmail
    },
    {
        type: 'list',
        message: color.green('What is your role in this company?'),
        choices: [
            color.blue('Manager'),
            color.purple('Intern'),
            color.red('Engineer'),
        ],
        name: 'role'
    },
]

// Manager
const managerQuestions = [
    {
        type: 'input',
        message: color.blue('What is you office number'),
        name: 'officeNumber',
        validate: validateNumbers
    }
]

// Intern
const internQuestions = [
    {
        type: 'input',
        message: color.purple('What school did you go to?'),
        name: 'school',
        validate: validateEntries
    }
]

// Engineer
const engineerQuestions = [
    {
        type: 'input',
        message: color.red('Please enter your github user name'),
        name: 'gitHub',
        validate: validateEntries
    }
]

// confirm employees
const moreEmployee = [
    {
        type: 'confirm',
        message: 'do you want to add more team members?',
        name: 'confirm',
        default: false
    }
]

async function Question() {

    try {
        // first round answer 
        let mainAnswers = await inquirer.prompt(questions);

        // figures out the next role of questions that need to be answered
        let role = await sendToNextPrompt(mainAnswers);

        // get the role questions
        let roleAnswers = await inquirer.prompt(role);

        // all of the employee data 
        let employeeData = await { ...mainAnswers, ...roleAnswers };

        //builds employee with the appropriate data 
        let employee = await buildEmployee(employeeData);

        //newly created employee pushed to teamMembers array 
        teamMembers.push(employee);

        //add more team members
        let employeeAdd = await inquirer.prompt(moreEmployee);

        // validate response
        addMoreOrRender(employeeAdd.confirm);
    }
    catch (err) {
        console.log(`there was an error somewhere in the async ${err}`);
    }

}

// build a new Employee
function buildEmployee(employee) {
    let name = employee.name;
    let id = employee.id;
    let email = employee.email;
    let role = employee.role; 

    switch (role) {
        case 'Manager': return new Manager(name, id, email, employee.officeNumber);
        case 'Intern': return new Intern(name, id, email, employee.school);
        case 'Engineer': return new Engineer(name, id, email, employee.gitHub);
        default: return 'something wrong happened in building employee';
    }
}

//color coded based on role
function colorDecoder(role) {
    //unique id to choose the correct role 
    if (role === '\u001b[34m\u001b[1mManager\u001b[22m\u001b[39m') {
        return 'Manager';
    } else if (role === '\u001b[38;2;128;0;128m\u001b[1mIntern\u001b[22m\u001b[39m') {
        return 'Intern';
    } else if (role === '\u001b[31m\u001b[1mEngineer\u001b[22m\u001b[39m') {
        return 'Engineer';
    }
}

//this function returns the specific role questions needed for the next prompt 
function sendToNextPrompt(employee) {
    employee.role = colorDecoder(employee.role);

    switch (employee.role) {
        case 'Manager': return managerQuestions;
        case 'Intern': return internQuestions;
        case 'Engineer': return engineerQuestions;
        default: return `Something went wrong, did you pick a role?`;
    }
}

//restarts questions again or on to the next step 
function addMoreOrRender(confirm) {
    if (confirm) {
        return Question();
    }

    //check to see if this directory exist 
    fs.access(OUTPUT_DIR, (err) => {
        if (err) {

            // if it doesn't exist we make it and then create it 
            console.log(`directory doesnt exist, Creating it now!`);
            fs.mkdir(OUTPUT_DIR, (err) => (err) ? console.log(err) : writeHTML());
        } else {

            // create the html 
            writeHTML();
        }
    })
}

//writes html
function writeHTML() {
    let html = render(teamMembers)

    fs.writeFile(outputPath, html, (err) => {
        (err) ? console.log(err) : console.log('file created succesfully!');
    });
}


Question();

