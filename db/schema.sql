CREATE DATABASE database;

CREATE TABLE IF NOT EXISTS department (
id INT NOT NULL PRIMARY KEY,
name VARCHAR(30) NOT NULL,
);

CREATE TABLE IF NOT EXSITS role(
    id INT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    FOREIGN KEY (department_id),
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE IF NOT EXSISTS employee(
    id INT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),

    FOREIGN KEY (role_id),
    REFERENCES role(id),

    FOREIGN KEY (manager_id),
    REFERENCES role(id),

);
