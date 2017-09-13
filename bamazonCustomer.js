var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306, 
	user: 'root',
	password: '',
	database: 'Bamazon'
});

connection.connect(function(err){
	if (err) throw err;
	console.log('connected as id ' + connection.threadId);

});



connection.query('SELECT item_id, product_name, price FROM products', function(err, res){
	// console.log ("res", res);

	for (var i = 0; i < res.length; i++) {
		console.log("ID:", res[i].item_id, "     Price", res[i].price, "     Name:", res[i].product_name);
	}
});

connection.end();