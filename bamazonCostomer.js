// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

// Dependencies
var inquirer = require('inquirer')
var mysql = require('mysql');
var Table = require('cli-table');


//  server set up for mysql
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: 'root',
    password: 'root',
    dabase: 'bamazon_DB'
});

//mysql server connection
connection.connect(function (err) {
    if (err) throw error;
    console.log("Server connected");
    welcomeScreen();
});

// creating bamazon welcome screen with conformation
function welcomeScreen() {
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Welcome to Bamazon ! would you like to view our Inventory ?",
            default: true
        }

    ]).then(function(user){
        if(user.confirm===ture){
            showInventory();
        }else{
            console.log("Thank you for visiting with us, ")
        }
    });
}
// dispaly products to the user

 function showInventory(){
// creating table with  npm cli-table
    var table=new Table({
        head:['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths:[10,30,30,30, 30]
    });
    productsList();   
 }

 function productsList(){
     connection.query("SELECT * FROM products", function(err,res){
         if (err) throw error;
for (i=0;i<res.length;i++){
    var itemId= res[i].item_id,
    productName=res[i].product_name,
    departmentName= res[i].department_name,
    price=res[i].price,
    stockQuentity=res[i].stock_quentity;

    table.push([itemId, productName, departmentName, stockQuentity]);

}
console.log("------------------  Current Bamazon Products  ------------------ ")
console.log(table.toString());

     })
 }



// The app should then prompt users with two messages.

// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.



// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.



// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.