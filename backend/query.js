import pool from "./config/db.config.js";

const query = async (queryString, options) => {
  try {
    const { rows: data } = await pool.query(queryString, options);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export default query;
