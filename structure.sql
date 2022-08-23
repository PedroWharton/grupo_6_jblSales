CREATE TABLE users (
    user_id int NOT NULL AUTO_INCREMENT ,
    username varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    password text NOT NULL,
    avatar varchar(50) NOT NULL,
    admin tinyint NOT NULL DEFAULT 0,
    PRIMARY KEY(user_id)
);

CREATE TABLE products (
    product_id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    img varchar(50),
    description text,
    price int NOT NULL,
    caracteristics text,
    category_id int,
    PRIMARY KEY(product_id),
    FOREIGN KEY(category_id) REFERENCES category(category_id)
);

CREATE TABLE users_products (
    users_products_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id),
    product_id int NOT NULL,
    PRIMARY KEY(users_products_id),
    FOREIGN KEY(product_id) REFERENCES products(product_id)
);

CREATE TABLE category (
    category_id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    PRIMARY KEY(category_id)
);