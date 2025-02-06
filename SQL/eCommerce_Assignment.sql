-- Create a schema ecommerce
create database ecommerce;
use ecommerce;

-- create customers table
create table customers (
    id int auto_increment primary key,
    name varchar(255) not null,
    email varchar(255) unique not null,
    address text
);

-- create products table
create table products (
    id int auto_increment primary key,
    name varchar(255) not null,
    price decimal(10,2) not null,
    description text
);

-- create orders table
create table orders (
    id int auto_increment primary key,
    customer_id int,
    order_date date,
    foreign key (customer_id) references customers(id)
);

-- normalize the database: create order_items table
create table order_items (
    id int auto_increment primary key,
    order_id int,
    product_id int,
    quantity int,
    price decimal(10,2),
    foreign key (order_id) references orders(id),
    foreign key (product_id) references products(id)
);

-- insert sample data into customers table
insert into customers (name, email, address) values 
('A Ganesan', 'ganesan@example.com', 'Chennai, Tamil Nadu'),
('Priya Sharma', 'priya@example.com', 'Bengaluru, Karnataka'),
('Anil Reddy', 'anil@example.com', 'Hyderabad, Telangana'),
('Suresh Menon', 'suresh@example.com', 'Kochi, Kerala'),
('Meera Iyer', 'meera@example.com', 'Coimbatore, Tamil Nadu'),
('Vikram Rao', 'vikram@example.com', 'Mysuru, Karnataka');

select * from customers;

-- insert sample data into products table
insert into products (name, price, description) values 
('Product A', 50.00, 'Description for Product A'),
('Product B', 150.00, 'Description for Product B'),
('Product C', 100.00, 'Description for Product C'),
('Product D', 80.00, 'Description for Product D'),
('Product E', 200.00, 'Description for Product E'),
('Product F', 120.00, 'Description for Product F');

select * from products;

-- insert sample data into orders table
insert into orders (customer_id, order_date) values 
(1, '2025-01-10'),
(2, '2025-01-05'),
(3, '2023-12-26'),
(4, '2023-12-16'),
(5, '2023-12-06'),
(6, '2023-11-26');

select * from orders;

-- insert sample data into order_items table
insert into order_items (order_id, product_id, quantity, price) values 
(1, 1, 2, 100.00),
(2, 2, 1, 150.00),
(3, 3, 3, 300.00),
(4, 4, 2, 160.00),
(5, 5, 1, 200.00),
(6, 6, 1, 120.00);

-- query: retrieve all customers who have placed an order in the last 30 days
select distinct c.* from customers c
join orders o on c.id = o.customer_id
where o.order_date >= curdate() - interval 30 day;

-- query: get the total amount of all orders placed by each customer
select c.id, c.name, sum(oi.price * oi.quantity) as total_spent from customers c
join orders o on c.id = o.customer_id
join order_items oi on o.id = oi.order_id
group by c.id, c.name;

-- query: update the price of 'Product C' to 45.00
update products set price = 45.00 where name = 'Product C';

-- query: add a new column discount to the products table
alter table products add column discount decimal(5,2) default 0.00;

-- query: retrieve the top 3 products with the highest price
select * from products order by price desc limit 3;

-- query: get the names of customers who have ordered 'Product A'
select distinct c.name from customers c
join orders o on c.id = o.customer_id
join order_items oi on o.id = oi.order_id
join products p on oi.product_id = p.id
where p.name = 'Product A';

-- query: join the orders and customers tables to retrieve the customer's name and order date for each order
select c.name, o.order_date from customers c
join orders o on c.id = o.customer_id;

-- query: retrieve the orders with a total amount greater than 150.00
select o.id, sum(oi.price * oi.quantity) as total_amount from orders o
join order_items oi on o.id = oi.order_id
group by o.id
having total_amount > 150.00;

-- query: retrieve the average total of all orders
select avg(total_amount) as average_order_total 
from (
    select o.id, sum(oi.price * oi.quantity) as total_amount from orders o
    join order_items oi on o.id = oi.order_id
    group by o.id
) as order_totals;
