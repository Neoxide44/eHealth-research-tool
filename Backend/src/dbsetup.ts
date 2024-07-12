import e from "express";
import pool from "../db";

function db_setup() {
    //Add hashing extension
    pool.query(
        "CREATE EXTENSION IF NOT EXISTS pgcrypto",
        [],
        (error, results) => {
            if (error) throw error;

            //Create unique key
            pool.query(
                "CREATE TABLE IF NOT EXISTS code (code VARCHAR(4) UNIQUE)",
                [],
                (error, results) => {
                    if (error) throw error;

                    //Create login_info
                    pool.query(
                        "CREATE TABLE IF NOT EXISTS login_info (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE, password_hash VARCHAR(255))",
                        [],
                        (error, results) => {
                            if (error) throw error;
                            //Create user_entries
                            pool.query(
                                "CREATE TABLE IF NOT EXISTS user_entries (id SERIAL NOT NULL PRIMARY KEY, email VARCHAR(255) REFERENCES login_info(email), uuid VARCHAR(255) UNIQUE NOT NULL)",
                                [],
                                (error, results) => {
                                    if (error) throw error;
                                    //Create patients
                                    pool.query(
                                        "CREATE TABLE IF NOT EXISTS participant_info (id SERIAL NOT NULL PRIMARY KEY, gender VARCHAR(255), year_of_birth INTEGER, num_edu INTEGER, language VARCHAR(255), participant_code VARCHAR(255), uuid VARCHAR(255) REFERENCES user_entries(uuid))",
                                        [],
                                        (error, results) => {
                                            if (error) throw error;
                                            //Create data
                                            pool.query(
                                                "CREATE TABLE IF NOT EXISTS data (id SERIAL NOT NULL PRIMARY KEY, uuid VARCHAR(255) REFERENCES user_entries(uuid), section VARCHAR(255), q_id INTEGER, question VARCHAR(255), answer VARCHAR(2550))",
                                                [],
                                                (error, results) => {
                                                    if (error) throw error;
                                                    //Create outcomes
                                                    pool.query(
                                                        "CREATE TABLE IF NOT EXISTS outcomes (id SERIAL NOT NULL PRIMARY KEY, uuid VARCHAR(255) NOT NULL REFERENCES user_entries(uuid), section VARCHAR(255), outcome VARCHAR(2550))",
                                                        [],
                                                        (error, results) => {
                                                            if (error)
                                                                throw error;
                                                            pool.query(
                                                                "INSERT INTO code (code) SELECT '0000' WHERE NOT EXISTS (SELECT 1 FROM code WHERE code = '0000');",
                                                                [],
                                                                (
                                                                    error,
                                                                    results
                                                                ) => {
                                                                    if (error)
                                                                        console.log(
                                                                            error
                                                                        );
                                                                }
                                                            );
                                                        }
                                                    );
                                                }
                                            );
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}

export default db_setup;
