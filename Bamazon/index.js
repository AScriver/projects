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
        promptCustomer(res);
    })
}

var promptCustomer = function (res) {
    inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "What would you like to purchase? (Q to exit)"
    }]).then(function (answer) {
        var correct = false;
        if (answer.choice.toUpperCase() == "Q") {
            process.exit();
        }
        for (let i = 0; i < res.length; i++) {
            if (res[i].productname == answer.choice) {
                correct = true;
                var product = answer.choice;
                var id = i;
                inquirer.prompt([{
                    type: 'input',
                    name: 'quant',
                    message: 'How many would you like to buy?',
                    validate: function (value) {
                        if (isNaN(value) == false) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                }]).then(function (answer2) {
                    if ((res[id].stockquantity - answer2.quant) > 0) {
                        connection.query("UPDATE products SET stockquantity='" + (res[id].stockquantity - answer2.quant) + "' WHERE productname='" + product + "'", function (err, res2) {
                            if (err) throw err;
                            makeTable();
                            console.log("\n==============================================")
                            console.log("============ Purchase Successful! ============");
                            console.log("==============================================")
                        })
                    } else {
                        console.log("Not enough in stock, Please Try Again!");
                        promptCustomer(res);
                    }

                    var total = answer2.quant * res[id].price;
                    console.log("Total: $" + total);
                })
            }
            
        }
        if (correct == false) {
            console.log("Invalid Selection");
            promptCustomer(res);
        }
    })
}