import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "qsqdgxvf",
  password: "bWWQievWHAzVcnVnNps5X6C2ltlUnyfT",
  host: "tuffi.db.elephantsql.com",
  port: 5432,
  database: "qsqdgxvf",
});

export default pool;
