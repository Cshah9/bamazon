var mysql = require('mysql');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306, 
	user: 'root',
	password: '',
	database: 'Bamazon'
});

connection.connect(function(err){
	if (err) throw err;
	// console.log('connected as id ' + connection.threadId);

});

showProducts();

connection.end();

function showProducts() {
	console.log("\nWelcome to Bamazon!!!!");
	console.log("----------------------\n\nProducts:\n");

	connection.query('SELECT item_id, product_name, price FROM products', function(err, res){
		// console.log ("res", res);

		for (var i = 0; i < res.length; i++) {
			console.log("ID:", res[i].item_id, "     Price", res[i].price, "     Name:", res[i].product_name);
		}

		//prompt customer:

		inquirer.prompt([
            {
                name: "product",
                message: "Which Product would you like to buy? (please type id)"
            },
            {
                name: "qauntity",
                message: "How many would you like to buy?"
            },
        ]). then(function(answers){
            checkInventory(answers.product, answers.qauntity);            
        })
	});
}

function checkInventory(productId, qauntityRequested) {
	console.log("checkInventory", productId, qauntityRequested);

}

