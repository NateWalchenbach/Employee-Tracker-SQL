const inquirer = require("inquirer");
const mySql2 = require("mysql2");
const consoleTable = require("console.table");

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "frog",
    database: "database",
  },
  console.log(`Connected to the classlist_db database.`)
);

// Initial prompt
// Start the menu loop
menu();

// Starts the application and brings up questions
async function menu() {
  const { action } = await inquirer.prompt([
    {
      name: "action",
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
  ]);
}
// USER FUNCTIONS HERE --->

// View All Employees: (id, first_name, last_name, title, department, salary, manager)
async function viewAllEmployees() {
  try {
    const results = await db.query(`SELECT`);
    console.table(results);
  } catch (err) {
    console.log(err);
  }

  async function viewAllDepartments() {
    try {
      const results = await db.query(`SELECT * FROM Departments`);
      console.table(results);
    } catch (err) {
      console.log(err);
    }
  }

  // Initial inquirer prompt w/ switch case
  switch (action) {
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
  menu();
}
