CREATE DATABASE translog;
-- DROP DATABASE translog;
USE translog;

CREATE TABLE user (
	user_id INT UNSIGNED NOT NULL PRIMARY KEY,
    user_name VARCHAR(30),
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    password VARCHAR(100) NOT NULL,
    password_changed BOOLEAN NOT NULL DEFAULT 0,
    user_is_deleted BOOLEAN NOT NULL DEFAULT 0,
    type_role TINYINT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE shipment (
	shipment_id VARCHAR(36) NOT NULL PRIMARY KEY,
    tracking_code VARCHAR(20),
    origin_address VARCHAR(255),
    destination_address VARCHAR(255),
    recipient_name VARCHAR(100),
    phone_number VARCHAR(20),
    weight DECIMAL(10,2) NOT NULL,
    type_status TINYINT NOT NULL,
    delivered_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE shipment_event (
	shipment_event_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    notes TEXT,
    type_status TINYINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    user_id INT UNSIGNED NOT NULL,
    shipment_id VARCHAR(36) NOT NULL,
    
    CONSTRAINT fk_user_1 FOREIGN KEY (user_id) 
	REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_shipment_1 FOREIGN KEY (shipment_id) 
	REFERENCES shipment(shipment_id) ON DELETE CASCADE ON UPDATE CASCADE

)
