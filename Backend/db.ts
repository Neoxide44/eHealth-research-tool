import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "db",
    database: "postgres",
    password: "password",
    port: 5432,
});
export default pool;
