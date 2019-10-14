//Require the right packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "gRisou1995?",
    database: "Bamazon"
  });

  // connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    // // run the start function after the connection is made to prompt the user
    start();
  });


// function which prompts the user for what action they should take
function start() {
        //connect to the sql query
        connection.query("SELECT * FROM products", function(err, results) {


            if (err) throw err;
        
            //prompt the user for the produc "id"
            inquirer.
            prompt([
                {
                    name: "product_list",
                    type: "input",
                    message: "See anything you like? Enter the id of the product you are trying to buy. (Input must be a number).",
                    choices: function(){
                        var choiceArray = [];
                        for(var i = 0; i < results.length; i++){
                            //create objects out of each result
                            var productInfo = {
                                id: results[i].id,
                                name: results[i].product_name,
                                price: results[i].price
                            }

                            choiceArray.push(productInfo);
                            
                        }
                        console.log("Welcome to Bamazon! Below list of items on sale. If you would like to buy an item, please remember it's ID for next steps.");
                        console.log("-----------ITEMS ON SALE-----------")
                        console.log("-----------------------------------")
                        console.log(choiceArray);
                    }

                }
            ])
            .then(function(answer){
                var products = results
                console.log("Your choice ID " + answer.product_list);
                console.log("These are the results: " + products[0].id);

                // if the user's input matches the id, then confirm purchase

                //if the user's input does not match any id, return error saying input is either not valid or is not a number, prompt again



                // !! Before moving one, we first need to display the list of products that are currently in the database so the user knows which ID to use.
            })
        })
    };

        
  