const inquirer = require("inquirer");
const mySql2 = require("mysql2");
const consoleTable = require("console.table");

// Questions to prompt user for

const questionInt = [
  {
    type: "list",
    message: "What would you like do today?",
    choices: [
      "View all employees",
      "Add Employee",
      "Update employee role",
      "View all roles",
      "Add role",
      "View all departments",
      "Add Departments",
    ],
  },
];

inquirer.prompt(questionInt).then((res) => {
  switch (res.questionInt) {
    case "View all employees":
      viewAllEmployees();
      break;
    case "Add Employee":
      addEmployee();
      break;
    case "Update employee role":
      updateRole();
      break;
    case "View all roles":
      viewAllRoles();
      break;
    case "Add role":
      addRole();
      break;
    case "View all departments":
      viewAllDepartments();
      break;
    case "Add Departments":
      addDepartment();
      break;
  }
});
