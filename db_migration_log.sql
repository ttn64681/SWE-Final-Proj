-- ========================================
-- DATABASE MIGRATION LOG
-- Phase 1-5: New Table Creation
-- ========================================

-- ADMIN TABLE
-- Stores admin users for system management
CREATE TABLE admin (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_image_link TEXT
);

-- ADDRESS TABLE
-- Stores user addresses (home and billing)
-- One user can have 1 home address and up to 3 billing addresses
CREATE TABLE address (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    address_type VARCHAR(20) NOT NULL CHECK (address_type IN ('home', 'billing')),
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip VARCHAR(20) NOT NULL,
    country VARCHAR(50) DEFAULT 'US',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- INDICES FOR ADDRESS TABLE
-- Optimize queries for finding addresses by user and type
CREATE INDEX idx_address_user_type ON address(user_id, address_type);
CREATE INDEX idx_address_user_home ON address(user_id) WHERE address_type = 'home';
CREATE INDEX idx_address_user_billing ON address(user_id) WHERE address_type = 'billing';

-- TICKET CATEGORY TABLE
-- Stores different ticket types with their prices
-- Fixed set of ticket types: child, senior, adult
CREATE TABLE ticket_category (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE CHECK (name IN ('child', 'senior', 'adult')),
    price DECIMAL(8,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INDICES FOR TICKET CATEGORY TABLE
-- Optimize queries for finding ticket types by name and price
CREATE INDEX idx_ticket_category_name ON ticket_category(name);
CREATE INDEX idx_ticket_category_price ON ticket_category(price);

-- SHOW ROOM TABLE
-- Stores cinema auditoriums/screening rooms
-- Each show room has a name and capacity
CREATE TABLE show_room (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capacity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INDICES FOR SHOW ROOM TABLE
-- Optimize queries for finding show rooms by name and capacity
CREATE INDEX idx_show_room_name ON show_room(name);
CREATE INDEX idx_show_room_capacity ON show_room(capacity);

-- PAYMENT CARD TABLE
-- Stores user payment cards with billing addresses
-- Each payment card belongs to one user and has one billing address
CREATE TABLE payment_card (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    address_id BIGINT NOT NULL,
    card_number VARCHAR(19) NOT NULL,
    cardholder_name VARCHAR(100) NOT NULL,
    payment_card_type VARCHAR(20) NOT NULL CHECK (payment_card_type IN ('visa', 'mastercard', 'amex', 'discover')),
    is_default BOOLEAN DEFAULT FALSE,
    expiration_date VARCHAR(7) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (address_id) REFERENCES address(id) ON DELETE CASCADE
);

-- INDICES FOR PAYMENT CARD TABLE
-- Optimize queries for finding payment cards by user id or card type
CREATE INDEX idx_payment_card_user_default ON payment_card(user_id, is_default);
CREATE INDEX idx_payment_card_user_cards ON payment_card(user_id);
CREATE INDEX idx_payment_card_card_type ON payment_card(payment_card_type);

-- SHOW ROOM UPDATE (table exists but was empty)
-- Update existing show_room table with proper columns
ALTER TABLE show_room 
    ADD COLUMN IF NOT EXISTS name VARCHAR(100) NOT NULL,
    ADD COLUMN IF NOT EXISTS capacity INTEGER NOT NULL,
    ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

CREATE INDEX IF NOT EXISTS idx_show_room_name ON show_room(name);

-- ========================================
-- TODO: PHASE 6 - MOVIE_SHOW TABLE
-- Creates association between movies and show rooms
-- ========================================
-- [TO BE RUN IN FUTURE]
-- CREATE TABLE movie_show (
--     id BIGSERIAL PRIMARY KEY,
--     movie_id BIGINT NOT NULL,
--     show_room_id BIGINT NOT NULL,
--     status VARCHAR(20) NOT NULL CHECK (status IN ('now_playing', 'upcoming')),
--     available_seats INTEGER NOT NULL DEFAULT 0,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (movie_id) REFERENCES movie(movie_id) ON DELETE CASCADE,
--     FOREIGN KEY (show_room_id) REFERENCES show_room(id) ON DELETE CASCADE,
--     UNIQUE (movie_id, show_room_id)
-- );
-- CREATE INDEX idx_movie_show_movie ON movie_show(movie_id);
-- CREATE INDEX idx_movie_show_room ON movie_show(show_room_id);
-- CREATE INDEX idx_movie_show_status ON movie_show(status);

-- ========================================
-- TODO: PHASE 7 - DATA MIGRATION
-- ========================================
-- [Future steps to migrate existing data to new tables]

-- ========================================
-- TODO: PHASE 8 - UPDATE EXISTING TABLES
-- ========================================
-- [Future steps to update user, movie, show_date, show_time tables]

