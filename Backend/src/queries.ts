export const addPatient =
    "INSERT INTO participant_info (gender, year_of_birth, num_edu, language, participant_code, uuid) VALUES ($1, $2, $3, $4, $5, $6)";

export const addUserEntry =
    "INSERT INTO user_entries (email, uuid) VALUES ($1, $2)";

export const checkEmail = "SELECT * FROM login_info WHERE email = $1";

export const checkPassword =
    "SELECT (password_hash = crypt($1, password_hash)) AS password_match FROM login_info WHERE email = $2";

export const getUsers = "SELECT * FROM participant_info";

export const addData =
    "INSERT INTO data (uuid, section, q_id, question, answer) VALUES ($1, $2, $3, $4, $5)";

export const getAnswer =
    "SELECT d.answer FROM data d WHERE d.uuid = $1 AND d.section = $2 AND d.q_id = $3";

export const addOutcome =
    "INSERT INTO outcomes (uuid, section, outcome) VALUES ($1, $2, $3)";

export const addOutcome2 =
    "INSERT INTO outcomes (uuid, section, outcome) VALUES ($2, $3, $1)";

export const appendOutcome =
    "UPDATE outcomes SET outcome = outcome || $1 WHERE uuid = $2 AND section = $3";

export const getOutcomes = "SELECT * FROM outcomes WHERE uuid = $1";

export const deleteOutcomes = "DELETE FROM outcomes WHERE uuid = $1";

export const deleteOutcome =
    "DELETE FROM outcomes WHERE uuid = $1 AND section = $2";

export const getParticipantInfo =
    "SELECT * FROM participant_info WHERE uuid = $1";

export const deleteParticipantInfo =
    "DELETE FROM participant_info WHERE uuid = $1";

export const getData =
    "SELECT section, q_id, question, answer FROM data WHERE uuid = $1;";

export const deleteData = "DELETE FROM data WHERE uuid = $1;";

export const deleteOneData =
    "DELETE FROM data WHERE uuid = $1 AND section = $2 AND q_id = $3;";

export const regiserLoginInfo =
    "INSERT INTO login_info (email, password_hash) VALUES ($1, crypt($2, gen_salt('md5')))";

export const checkCode = "SELECT * FROM code WHERE code = $1";

export const addAnamnesticOutcome =
    "INSERT INTO anamnestic_outcomes (uuid, outcome, q_id) VALUES ($1, $2, $3)";

export const deleteOneAnamnesticOutcome =
    "DELETE FROM anamnestic_outcomes WHERE uuid = $1 AND q_id = $2;";

export const deleteAnamnesticOutcome =
    "DELETE FROM anamnestic_outcomes WHERE uuid = $1";

export const getAnamnesticOutcomes =
    "SELECT * FROM anamnestic_outcomes WHERE uuid = $1";
