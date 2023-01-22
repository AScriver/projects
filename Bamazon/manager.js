var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_DB"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("You have connected to the Rio Robles Cafe Database.");
    makeTable();
})

var makeTable = function () {
    connection.query("SELECT * FROM bamazon_db.products", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].itemid + " || " + res[i].productname + " || " + res[i].departmentname + " || " + res[i].price + " || " + res[i].stockquantity + "\n");
        }
        promptManager(res);
    })
}

var promptManager = function(res){
    inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: ["Add new item.", "Update item."]
    }]).then(function(answer) {
        if(answer.choice == "Add new item."){
            addItem();
        }
        if(answer.choice == "Update item."){
            updateItem(res);
        }
    })
}

var addItem = function(){
    inquirer.prompt([{
        type: "input",
        name: "productname",
        message: "Product Name: "
    },{
        type: "input",
        name: "departmentname",
        message: "Department Name: "
    },{
        type: "input",
        name: "price",
        message: "Price: "
    },{
        type: "input",
        name: "quantity",
        message: "Quantity: "
    }]).then(function(answer){
        connection.query("INSERT INTO products (productname, departmentname, price, stockquantity) VALUES ('" + answer.productname + "','" + answer.departmentname + "'," + answer.price + "," + answer.quantity +");", function(err, res){
            if (err) throw err;
            console.log(answer.productname + " sucessfuly added!")
            makeTable();
        })
    })
}

var updateItem = function(res){
    inquirer.prompt([{
        type: "input",
        name: "productname",
        message: "Product Name: "
    },{
        type: "input",
        name: "quantity",
        message: "Quantity: "
    }]).then(function(answer){
        for (let i = 0; i < res.length; i++){
            if(res[i].productname == answer.productname){
                connection.query('UPDATE products SET stockquantity=stockquantity+'+ answer.quantity+' WHERE itemid='+res[i].itemid+';', function(err, res){
                    if (err) throw err;
                    if (res.affectedRows == 0){
                        console.log("That item does not exist. Please try selecting a different item.");
                        makeTable();
                    } else {
                        console.log("Items have been updated!");
                        makeTable();
                    }
                })
            }
        }
    })
}