const inquirer = require("inquirer");
const mySql = require("mysql2");
const consoleTable = require("console.table");

const PORT = process.env.PORT || 3001;

// Connect to database
const db = mySql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "frog",
    database: "employee_db ",
  },
  console.log(`Connected to the classlist_db database.`)
);

// Initial prompt
// Start the menu loop
init();

// Starts the application and brings up questions
async function init() {
  const { action } = await inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "What would you like do today?",
      choices: [
        "View all employees", //IP
        "Add Employee", //Done
        "Update employee role",
        "View all roles",
        "Add role", //Done
        "View all departments", //Done
        "Add Departments", //Done
      ],
    },
  ]);
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
  // Call menu function
  init();
}
// USER FUNCTIONS HERE --->

// NEW FUNCTION
// View All Employees: (id, first_name, last_name, title, department, salary, manager)
// async function viewAllEmployees() {
//   try {
//     const results = await db.query(`SELECT`);
//     console.table(results);
//   } catch (err) {
//     console.log(err);
//   }
// }

// NEW FUNCTION
async function viewAllRoles() {
  try {
    const results = await db.query(`
        SELECT role.id,
               role.title,
               department.name as department,
               role.salary
        FROM role
        LEFT JOIN department ON department.id = role.department_id;`);
    console.table(results);
  } catch (err) {
    console.error(err);
  }
}

// NEW FUNCTION
// Prompts the user to add an Employee
async function addEmployee() {
  // get role choices from the database
  let roleChoices = await db.query(
    "SELECT id AS value, title AS name FROM role"
  );

  // get manager choices from the database
  let managerChoices = await db.query(`
      SELECT id as value, 
             CONCAT( first_name, ' ', last_name ) as name 
      FROM employee`);

  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "first_name",
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "last_name",
    },
    {
      type: "list",
      choices: roleChoices,
      message: "What is the employee's role?",
      name: "role_id",
    },
    {
      type: "list",
      choices: managerChoices,
      message: "Who is the employee's manager?",
      name: "manager_id",
    },
  ]);

  try {
    await db.query(
      `
          INSERT INTO employee ( first_name, last_name, role_id, manager_id )
              VALUES ( ?, ?, ?, ? )
      `,
      [first_name, last_name, role_id, manager_id]
    );
    console.log(`Added ${first_name} ${last_name} to the database`);
  } catch (err) {
    console.log(err);
  }
}

// NEW FUNCTION
// Prompts user to get
async function viewAllDepartments() {
  try {
    const results = await db.query(`SELECT * FROM Departments`);
    console.table(results);
  } catch (err) {
    console.log(err);
  }
}
async function addRole() {
  // get department choices from the database
  let deptChoices = await db.query("SELECT id AS value, name FROM department");

  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the title of the new role?",
      name: "title",
    },
    {
      type: "number",
      message: "What is the salary for the role?",
      name: "salary",
    },
    {
      type: "list",
      choices: deptChoices,
      message: "Which department is this role in?",
      name: "department_id",
    },
  ]);

  try {
    await db.query(
      `
              INSERT INTO role (title, salary, department_id)
                  VALUES (?, ?, ?)
          `,
      [title, salary, department_id]
    );
    console.log(`Added ${title} to the database`);
  } catch (err) {
    console.error(err);
  }
}

// NEW FUNCTION
// Add a department to the table
async function addDepartment() {
  const { name } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department you would like to add",
      name: "name",
    },
  ]);

  try {
    await db.query(
      `
          INSERT INTO department (name)
          VALUES (?)
          `,
      name
    );
    console.log(`Added ${name} to the database`);
  } catch (err) {
    console.error(err);
  }
}
