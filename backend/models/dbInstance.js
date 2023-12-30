import query from "../query.js";

export const createUserTable = async () => {
  await query(`CREATE TABLE IF NOT EXISTS users(
      user_id UUID NOT NULL PRIMARY KEY,
      firstName VARCHAR(20),
      lastName VARCHAR(20),
      email VARCHAR(50) NOT NULL,
      password VARCHAR(150),
      role VARCHAR(20) NOT NULL
  );`);
};
