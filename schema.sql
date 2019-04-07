-- Create a MySQL Database called bamazon.

DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB
-- Then create a Table inside of that database called products.
CREATE TABLE products(
-- The products table should have each of the following columns:


-- item_id (unique id for each product)
item_id INT AUTO_INCREMENT NOT NULL,

-- product_name (Name of product)

product_name VARCHAR (100) NOT NULL,
-- department_name
department_name VARCHAR (100) NOT NULL,

-- price (cost to customer)
price DECIMAL(10, 2) NOT NULL,

-- stock_quantity (how much of the product is available in stores)

stock_quentity INT NOT NULL,

PRIMARY KEY(item_id)

);



-- Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

SELECT * FROM  products;
INSERT INTO products(product_name, department_name, price, stock_quentity)
VALUES("laptop", "Electronics", 1980.99, 25),
("Iwatch", "Electronics", 298.25, 50),
("Nootbook", "Stationary", 3.75, 200),
("applecider", "Gorcessary", 5.45,60),
("shoes", "Footwear", 200, 50),
("T-shirts", "Clothing", 50.45,200),
("sofa", "Home", 2500, 6),
("facewash", "Beauty", 34, 55),
("protin", "Suplements", 29.29, 34),
("cycle", "fitness",768, 15),
("bed", "Furnitures", 500, 12)
