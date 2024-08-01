import pool from "../../db";
import { addData } from "../queries";

export function addMissingQuestions(
    uuid: string,
    section: string,
    q_ids: number[],
    questions: string[]
) {
    q_ids.map((q_id, index) => {
        pool.query(
            addData,
            [uuid, section, q_id, questions[index], ""],
            (error, results) => {
                if (error) throw error;
            }
        );
    });
}
