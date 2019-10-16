DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;


USE bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("horse", "pets", 1400, 3);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("computer", "electronics", 700, 2);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("ottoman", "home furniture", 125, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("lamp", "home furniture", 40, 3);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("aquarium", "pets", 250, 24);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("dining table", "home furniture", 1400, 3);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("mouse pad", "electronics", 40, 60);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("poncho", "clothing", 126, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("mouse", "pets", 30, 100);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("Fender guitar", "music", 600, 1);
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ("Steinway M piano", "music", 10000, 3);
INSERT INTO products(product_name, department_name, priproductsce, stock_quantity) VALUES ("Ugly christmas sweater", "clothing", 45, 35);


