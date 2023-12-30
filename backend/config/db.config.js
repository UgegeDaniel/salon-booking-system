import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "ifolzkmh",
  password: "UO2N9alx_XJwCSj9lu8jb902gpP_NJ9U",
  host: "mel.db.elephantsql.com",
  port: 5432,
  database: "ifolzkmh",
});

export default pool;
