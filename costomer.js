
//Dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table')

//localhost connection
var connection = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'bamazon_DB'
});

connection.connect();

productsList();
//display product list
function productsList() {

  var table = new Table({
    head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
    colWidths: [10, 30, 30, 30, 30]
  });

  connection.query('SELECT * FROM products', function (error, res) {
    if (error) throw error;
    // console.log(res);

    for (i = 0; i < res.length; i++) {
      var itemId = res[i].item_id,
        productName = res[i].product_name,
        departmentName = res[i].department_name,
        price = res[i].price,
        stockQuentity = res[i].stock_quentity;
      table.push([itemId, productName, departmentName, price, stockQuentity]);

    };
    console.log("------------------  Current Bamazon Products  ------------------ ")
    console.log(table.toString());
    userPrompt();

    // connection.end()
  })
}
// user direction for itemPurchases

function userPrompt() {
  inquirer.prompt([
    {
      message: "Please type in the product id you would like to order.",
      type: "input",
      name: "prodId"
    },
    {
      message: "how many of this item would you like to purchase",
      type: "input",
      name: "prodQty"
    }
  ]).then(function (ans) {
    var prodId = ans.prodId;
    var prodQty = ans.prodQty;
    // var allProd = getAllProd();
    itemPurchases(prodId, prodQty)
  });
}
// function for item purchases totoal price stock calculation 

function itemPurchases(prodId, prodQty) {
  connection.query('SELECT * FROM products', function (error, res) {
    if (error) throw error;
    var prod;
    // console.log(res);
    
    for (var i = 0; i < res.length; i++) {
      if (res[i].item_id == prodId) {
        prod = res[i]
      }
    }
    console.log(prod, "prod was found")
    if (prod.stock_quantity >= prodQty) {
      var newQty = prod.stock_quantity-prodQty;
      orderComplete(prod, prodId, prodQty)
      
// console.log(totoalPrice)

      connection.end()
    } else {
      console.log("sorry the order has been cancled, there was insuffecent stock of this purchase")
      connection.end()
    }
  })
};
function orderComplete(prodObj, prodId, prodQty) {
  var newQuantity = prodObj.stock_quantity - prodQty;
  var productSales = prodObj.price * prodQty;
  var queryOne = "UPDATE products SET stock_quantity = ? where ?";
  var queryTwo = "UPDATE products SET product_sales = ? where ?";
  connection.query(queryOne, [newQuantity, { item_id: prodId }], function (error, res) {
  })
  connection.query(queryTwo, [productSales, { item_id: prodId }], function (error, res) {
  })
}