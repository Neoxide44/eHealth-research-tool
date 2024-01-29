export const checkIfUserExists =
    "SELECT u FROM patients p WHERE p.firstname = $1 AND p.lastname = $2 AND p.dob = $3";

export const addPatient =
    "INSERT INTO patients (first_name, last_name, dob, uuid) VALUES ($1, $2, $3, $4)";

export const addUserEntry =
    "INSERT INTO user_entries (email, uuid) VALUES ($1, $2)";

export const checkEmail = "SELECT * FROM login_info WHERE email = $1";

export const checkPassword =
    "SELECT (password_hash = crypt($1, password_hash)) AS password_match FROM login_info WHERE email = $2";

export const getUsers = "SELECT * FROM patients";

export const addData =
    "INSERT INTO data (uuid, section, q_id, question, answer) VALUES ($1, $2, $3, $4, $5)";

export const check4BImpaired =
    "SELECT d.answer FROM data d WHERE d.uuid = $1 AND d.section = $2 AND d.q_id = $3";

export const getAnswer =
    "SELECT d.answer FROM data d WHERE d.uuid = $1 AND d.section = $2 AND d.q_id = $3";

export const addOutcome =
    "INSERT INTO outcomes (uuid, section, outcome) VALUES ($1, $2, $3)";
