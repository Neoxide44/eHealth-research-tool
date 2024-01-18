export const checkIfUserExists =
    "SELECT u FROM users u WHERE u.firstname = $1 AND u.lastname = $2 AND u.dob = $3";

export const addUser =
    "INSERT INTO users (firstname, lastname, dob, uuid) VALUES ($1, $2, $3, $4)";

export const getUsers = "SELECT * FROM users";

export const addData =
    "INSERT INTO data (uuid, section, q_id, question, answer) VALUES ($1, $2, $3, $4, $5)";

export const check4BImpaired =
    "SELECT d.answer FROM data d WHERE d.uuid = $1 AND d.section = $2 AND d.q_id = $3";
