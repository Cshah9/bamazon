CREATE DATABASE Bamazon;

USE Bamazon;

DROP table products;

CREATE TABLE products (
	item_id VARCHAR(25) NOT NULL,
    product_name VARCHAR(25) NOT NULL,
    department_name VARCHAR(25),
    price FLOAT(5),
    stock_qauntity INTEGER(10),
    PRIMARY KEY (item_id)
    
);

INSERT  INTO products (item_id, product_name, department_name, price, stock_qauntity) VALUES 
('COMP1', 'Apple MacBook Pro', 'Computers', 1000.00, 100),
('COMP2', 'Dell Inspiron', 'Computers', 400.00, 75),
('COMP3', 'Lenovo Yoga', 'Computers', 700.00, 50),
('TOYS1', 'Nerf Gun', 'Toys', 50.00, 25),
('TOYS2', 'Super Soaker', 'Toys', 40.00, 75),
('TOYS3', 'Fidget Spinner', 'Toys', 10.00, 500),
('CLOTHS1', 'Suit', 'Cloths', 500.00, 10),
('CLOTHS2', 'Tie', 'Cloths', 35.00, 20),
('CLOTHS3', 'Shirt', 'Cloths', 65.00, 30),
('CLOTHS4', 'Curf Links', 'Cloths', 45.00, 15);

SELECT stock_qauntity FROM products WHERE item_id=comp1;



select * from products;

UPDATE products SET stock_qauntity=26 WHERE item_id='toys1';