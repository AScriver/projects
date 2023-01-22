DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
    itemid INTEGER AUTO_INCREMENT NOT NULL,
    productname VARCHAR(50) NOT NULL,
    departmentname VARCHAR(50) NOT NULL,
    price DECIMAL(10,4) NOT NULL,
    stockquantity INTEGER(10) NOT NULL,
    PRIMARY KEY (itemid)
);

CREATE TABLE users(
	userid INTEGER AUTO_INCREMENT NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    permissions INTEGER (5) DEFAULT 0,
    PRIMARY KEY (userid)
);

INSERT INTO products (productname, departmentname, price, stockquantity)
VALUES ("robles", "Test", "293.21", "293");


INSERT INTO users (username, password, permissions)
VALUES ("customer","customer", 0),("manager", "manager", 1),("super","super", 2);

-- ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
-- FLUSH privileges