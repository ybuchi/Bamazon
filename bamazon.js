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
        //Set up empty array
        var choiceArray = [];
        //Run SQL table to display the product id, name and price
        for(var i = 0; i < results.length; i++){
        //create objects out of each result
            var productInfo = {
                id: results[i].id,
                name: results[i].product_name,
                price: results[i].price
            }

            choiceArray.push(productInfo);
        };      
        

        console.log("Welcome to Bamazon! Below list of items on sale. If you would like to buy an item, please remember it's ID for next steps.");
        console.log("-----------ITEMS ON SALE-----------");
        console.log("-----------------------------------");
        console.log(choiceArray);


        if (err) throw err;
        
        //Create a function to prompt the user to buy something
    inquirer.
        prompt([
            {
                name: "product_list",
                type: "input",
                message: "See anything you like? Enter the id of the product you are trying to buy. (Input must be a number)."
            }
            ])
            .then(function(answer){

                var userChoice = parseInt(answer.product_list);

                console.log("-----------------------------------");
                //Make sure to convert the answer into a number.
                console.log("YOUR CHOICE ID: " + userChoice);
                console.log("-----------------------------------");

                // if the user's input matches the id, then confirm purchase
                for (i = 0; i < results.length; i++){
                    if(userChoice === results[i].id){
                        console.log("We found a matching item!");
                        var chosenItem = results[i];

                        //if the item is out of stock, display message.
                        if(results[i].stock_quantity === 0){
                            console.log("We're so sorry but the item you requested is out of stock :(");
                        }else{
                        
                        console.log("-----------------------------------");
                        console.log("Item Found: " + results[i].product_name + " - Price: " + results[i].price + " - Stock: " + results[i].stock_quantity);
                        console.log("-----------------------------------");
                        
                        
                        inquirer.
                            prompt([
                                {
                                    name: "confirmation",
                                    message: "^This item is in stock! Is this the item you would like to buy?",
                                    type: "confirm"
                                }
                            ])
                            .then(function(answer){

                                //If the user answers yes, execute the BuyItem() function (create it first) and thenupdate the database and subtract 1 from the stock of the item
                                if(answer){
                                    //execute buyItem function
                                    connection.query(
                                        "UPDATE products SET ? WHERE ?",
                                        [
                                            {
                                                stock_quantity: chosenItem.stock_quantity - 1
                                            },
                                            {
                                                id: chosenItem.id
                                            }
                                        ],
                                        function(error){
                                            if (error) throw err;
                                            console.log("Purchasing Item..."),
                                            console.log("You have completed your purchase successfully!");
                                        }
                                    )
                                }else{
                                    console.log("That's ok! Maybe you need more time to browse.");
                                    start();
                                }
                               
                            });
                        }//end of else
                    }//end of if statement
                }//end of for loop

                //if the user's input does not match any id, return error saying input is either not valid or is not a number, prompt again



                // !! Before moving one, we first need to display the list of products that are currently in the database so the user knows which ID to use.
            });
        });//end of connection
    };//end of function

function buyItem(){

}