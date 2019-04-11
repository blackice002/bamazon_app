//Dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');  //display table
var price =0;
var newQty = 0;
var stock =0;

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


//Display product list
function productsList() {

  // creating cli table
  var table = new Table({
    head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
    colWidths: [10, 30, 30, 30, 30]
  });
// data from database
  connection.query('SELECT * FROM products', function (error, res) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId)
    displayItem();
  });
  function displayItem() {
    console.log("Welcome to Bamazon ! Take a look at the products in our store!\n");
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      // declaration for table column and rows
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
      // call back function for user
      userPrompt();
    })
  }
};

// user direction for itemPurchases
function userPrompt() {
  inquirer.prompt([
    {
      message: "Please type in the product id you would like to order.",
      type: "input",
      name: "prodId",
      // valadiation for user input nonValue &nonNumber
      validate: function (val) {
        return (!isNaN(val) && parseInt(val) > 0)
      }
    },
    {
      message: "how many of this item would you like to purchase",
      type: "input",
      name: "prodQty",
      validate: function (val) {
        return (!isNaN(val) && parseInt(val) > 0 )
      }
    }
  ]).then(function (answer) { //storing user inputs as variables
    var prodId = answer.prodId;
    var prodQty = answer.prodQty;
// fatching data from database based on user input 
    connection.query("SELECT * FROM products WHERE ? ", [{item_id: prodId },{stock_quentity:stock}], function (err, res) {
      if (err) throw err;
      stock = parseInt(res[0].stock_quentity);
      productName = res[0].product_name
      console.log("--------------------------------");
      console.log("| Your ordered:"+ productName);
      console.log("| Amount of order:" + prodQty);
      console.log("| Amount in stock: " + stock);
      console.log("--------------------------------");

      if (prodQty > stock) {
        console.log("Sorry we don't have enough item in stock");
      }else {
        price = res[0].price;
        newQty = stock - prodQty;
        // upadating database after user purchhased
        connection.query("UPDATE products SET ? WHERE ? ", [{ stock_quentity: newQty }, { item_id: prodId },], function (err, res) {
          if (err) throw err;
          console.log("purching products ...\n");
          console.log("--------------------------------");
          // calculating total price based on productQuentity
          var totalPrice = prodQty * price;
          console.log("products purshased ! \n your total is $" + totalPrice.toFixed(2));
          console.log("Thank you for shopping with us")
          // moreOrder();
        })

      }
    
    })
  });
};

// function moreOrder(){
//   inquirer.prompt([{
//   name:'choices',
//   message:"Do you want to purchased more",
//   type:'confirm'
//   }]).then(function(){
//     if('confirm'){
//       productsList();
//     }
//       connection.end();
//       console.log("See you again");
//   });
//   }
