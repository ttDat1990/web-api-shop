-- Tạo cơ sở dữ liệu
DROP DATABASE IF EXISTS webshopdtb;
CREATE DATABASE webshopdtb;
USE webshopdtb;

-- Bảng categories
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS slides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image VARCHAR(255)
);

-- Bảng products
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    image VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Bảng users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Bảng orders
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Bảng orderdetail
CREATE TABLE IF NOT EXISTS orderdetail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

INSERT INTO user_accounts (id, username, password)
VALUES (1, 'user1', 'user_password1'),
       (2, 'user2', 'user_password2');


INSERT INTO admin_accounts (id, username, password)
VALUES (1, 'admin', '12345');

-- Thêm dữ liệu vào bảng categories
INSERT INTO categories (name, image) VALUES
    ('Electronics', 'electronics.jpg'),
    ('Clothing', 'clothing.jpg'),
    ('Books', 'books.jpg'),
    ('Home Appliances', 'appliances.jpg');

INSERT INTO slides (image) VALUES
    ('slide1.png'),
    ('slide2.png');

-- Thêm dữ liệu vào bảng products
INSERT INTO products (name, price, category_id, image) VALUES
    ('Smartphone', 599.99, 1, 'smartphone.jpg'),
    ('Laptop', 1299.99, 1, 'laptop.jpg'),
    ('T-shirt', 19.99, 2, 'tshirt.jpg'),
    ('Jeans', 39.99, 2, 'jeans.jpg'),
    ('Book', 9.99, 3, 'book.jpg'),
    ('Refrigerator', 799.99, 4, 'refrigerator.jpg');

-- Thêm dữ liệu vào bảng products (10 sản phẩm mới)
INSERT INTO products (name, price, category_id, image) VALUES
    ('Headphones', 49.99, 1, 'headphones.jpg'),
    ('Tablet', 299.99, 1, 'tablet.jpg'),
    ('Dress', 29.99, 2, 'dress.jpg'),
    ('Shoes', 59.99, 2, 'shoes.jpg'),
    ('Notebook', 4.99, 3, 'notebook.jpg'),
    ('Microwave', 199.99, 4, 'microwave.jpg'),
    ('Coffee Maker', 79.99, 4, 'coffee_maker.jpg'),
    ('Backpack', 39.99, 2, 'backpack.jpg'),
    ('Desk Lamp', 14.99, 1, 'desk_lamp.jpg'),
    ('Sunglasses', 19.99, 2, 'sunglasses.jpg');

-- Thêm dữ liệu vào bảng users
INSERT INTO users (username, password) VALUES
    ('user1', 'password1'),
    ('user2', 'password2');

-- Thêm dữ liệu vào bảng orders
INSERT INTO orders (user_id) VALUES
    (1),
    (2),
    (1);

-- Thêm dữ liệu vào bảng orderdetail
INSERT INTO orderdetail (order_id, product_id, quantity) VALUES
    (1, 1, 2),
    (1, 3, 3),
    (2, 2, 1),
    (2, 5, 2);

select * from products;
select * from categories;
select * from admin_accounts;
select * from user_accounts;
