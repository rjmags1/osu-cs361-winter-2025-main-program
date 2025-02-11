import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const ConnectionPool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
    user: "postgres",
    host: "127.0.0.1",
    database: "cs361-project",
    password: "postgres",
    port: 5432,
});

export default ConnectionPool;
