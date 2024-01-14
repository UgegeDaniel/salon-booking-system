import pool from "./config/dbConfig.js";

const dbOperations = {
  insert: async (tableName, newRow) => {
    try {
      const columns = Object.keys(newRow).join(", ");
      const values = Object.values(newRow);
      const insertQuery = `INSERT INTO ${tableName} (${columns}) VALUES (${values
        .map((_, i) => `$${i + 1}`)
        .join(", ")}) RETURNING *`;
      const result = await pool.query(insertQuery, values);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error inserting row: ${error.message}`);
    }
  },

  getAll: async (tableName) => {
    try {
      const selectAllQuery = `SELECT * FROM ${tableName}`;
      const result = await pool.query(selectAllQuery);
      return result.rows;
    } catch (error) {
      throw new Error(`Error retrieving all rows: ${error.message}`);
    }
  },

  findBy: async (tableName, columnObject) => {
    try {
      const column = Object.keys(columnObject)[0];
      const value = columnObject[column];
      const selectQuery = `SELECT * FROM ${tableName} WHERE ${column} = $1`;
      const result = await pool.query(selectQuery, [value]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error finding row by column: ${error.message}`);
    }
  },

  updateById: async (tableName, rowId, updatedValues) => {
    try {
      const setColumns = Object.keys(updatedValues)
        .map((key, i) => `${key} = $${i + 1}`)
        .join(", ");
      const values = Object.values(updatedValues);
      const updateQuery = `UPDATE ${tableName} SET ${setColumns} WHERE id = $${
        values.length + 1
      } RETURNING *`;
      const result = await pool.query(updateQuery, [...values, rowId]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating row by ID: ${error.message}`);
    }
  },

  deleteById: async (tableName, rowId) => {
    try {
      const deleteQuery = `DELETE FROM ${tableName} WHERE id = $1 RETURNING *`;
      const result = await pool.query(deleteQuery, [rowId]);
      return `Row with ID ${rowId} deleted successfully.`;
    } catch (error) {
      throw new Error(`Error deleting row by ID: ${error.message}`);
    }
  },

  getAppointmentDetails: async (clientId) => {
    const queryString = `
      SELECT
        appointments.id AS appointment_id,
        appointments.appointment_date,
        appointments.comment,
        appointments.is_confirmed,
        users.id AS client_id,
        users.first_name,
        users.last_name,
        users.email,
        users.phone_number,
        products.id AS service_id,
        products.name AS service_name,
        products.description AS service_description,
        products.price AS service_price,
        products.intended_gender AS service_intended_gender
      FROM
        appointments
        INNER JOIN users ON appointments.client_id = users.id
        INNER JOIN products ON appointments.product_id = products.id
      WHERE
        appointments.client_id = $1
    `;

    try {
      const result = await pool.query(queryString, [clientId]);
      return result.rows;
    } catch (error) {
      console.error("Error fetching appointment details:", error);
      throw error;
    }
  },
};

export default dbOperations;
