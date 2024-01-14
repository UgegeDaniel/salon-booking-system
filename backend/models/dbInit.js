import pool from "./config/dbConfig.js";

const query = async (queryString, options) => {
  try {
    const { rows: data } = await pool.query(queryString, options);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const addForeignKeyConstraints = async () => {
  await query(`
  -- Add foreign key constraints if they do not exist
  DO $$ BEGIN
    BEGIN
      ALTER TABLE products
      ADD CONSTRAINT fk_products_provider_id
      FOREIGN KEY (provider_id) REFERENCES users(id) ON DELETE CASCADE;
    EXCEPTION WHEN others THEN
      -- Do nothing, the constraint might already exist
    END;

    BEGIN
      ALTER TABLE appointments
      ADD CONSTRAINT fk_appointments_client_id
      FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE;
    EXCEPTION WHEN others THEN
      -- Do nothing, the constraint might already exist
    END;

    BEGIN
      ALTER TABLE appointments
      ADD CONSTRAINT fk_appointments_product_id
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE;
    EXCEPTION WHEN others THEN
      -- Do nothing, the constraint might already exist
    END;
  END $$;`);
};

const dbInit = async () => {
  await query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(20),
        last_name VARCHAR(20),
        email VARCHAR(50) NOT NULL,
        password VARCHAR(150),
        phone_number VARCHAR(150),
        role VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        intended_gender VARCHAR(10) NOT NULL,
        type VARCHAR(10) NOT NULL,
        admin_id INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  
      CREATE TABLE IF NOT EXISTS appointments(
        id SERIAL PRIMARY KEY,
        client_id INTEGER,
        product_id INTEGER,
        appointment_date TIMESTAMP NOT NULL,
        comment TEXT,
        is_confirmed BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  addForeignKeyConstraints();
};

export default dbInit;
