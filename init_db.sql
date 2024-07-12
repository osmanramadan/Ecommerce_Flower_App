-- Create tables
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

CREATE TABLE product (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE basket (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    payment_method TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(product_id) REFERENCES product(id)
);

-- Insert initial data
INSERT INTO user (username, email, password) VALUES ('admin', 'admin@example.com', 'admin');
INSERT INTO product (name, price, description) VALUES ('Roses', 10.0, 'A bouquet of red roses.');
INSERT INTO product (name, price, description) VALUES ('Tulips', 8.0, 'A bouquet of colorful tulips.');
INSERT INTO product (name, price, description) VALUES ('Lilies', 12.0, 'A bouquet of white lilies.');
