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

console.log("\nWelcome to Bamazon!!!!");
console.log("----------------------\n");

showProducts();



function showProducts() {
	
	console.log("\nProducts:\n");

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
	// console.log("checkInventory", productId, qauntityRequested);

	connection.query("SELECT stock_qauntity FROM products WHERE item_id='"+productId+"'", function(err, res){
		// console.log ("res", res);
		// console.log(res[0].stock_qauntity);

		if(qauntityRequested > res[0].stock_qauntity) {
			console.log("Insufficient Quantity!\nOnly "+res[0].stock_qauntity+" left. Please order a different amount!");
			// showProducts();
			connection.end();

		}
		else {
			completePurchase(productId, qauntityRequested, res[0].stock_qauntity);
		}
		
	});

}

function completePurchase(id, q, i) {
	// console.log("completePurchase", id, q, i);

	connection.query("UPDATE products SET stock_qauntity="+ (i-q) +" WHERE item_id='"+id+"'", function(err, res){
		// console.log ("res", res);
		// console.log(res.affectedRows);

		console.log("Inventory updated to:", i-q);


		connection.query("SELECT price FROM products WHERE item_id='"+id+"'", function(err, res){
			// console.log ("res", res);
			// console.log(res[0].price);

		
			console.log("Your total price is: $"+(res[0].price * q));
			// showProducts();
			connection.end();
		});

		
	});
	
}

