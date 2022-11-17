import { executeQuery } from "../database/database.js";

const addResponse = async (user_id, question_id, answer_id) => {
    await executeQuery("INSERT INTO question_answers(user_id, question_id, question_answer_option_id) VALUES($1, $2, $3);", user_id, question_id, answer_id);
};

const deleteAllResponses = async (question_id) => {
    await executeQuery("DELETE FROM question_answers WHERE question_id = $1;", question_id);
};

const deleteResponse = async (answer_id) => {
    await executeQuery("DELETE FROM question_answers WHERE question_answer_option_id = $1;", answer_id);
};

const listResponses = async (question_id) => {
    const res = await executeQuery("SELECT * FROM question_answers WHERE question_id=$1;", question_id);
    
    return res.rows;
};


export { addResponse, deleteAllResponses, deleteResponse, listResponses };