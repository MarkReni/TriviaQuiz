import { executeQuery } from "../database/database.js";

const addAnswer = async (question_id, option_text, is_correct) => {
    await executeQuery("INSERT INTO question_answer_options(question_id, option_text, is_correct) VALUES($1, $2, $3);", question_id, option_text, is_correct);
};

const deleteAnswer = async (option_id) => {
    await executeQuery("DELETE FROM question_answer_options WHERE id=$1;", option_id);
};

const deleteAllAnswers = async (question_id) => {
    await executeQuery("DELETE FROM question_answer_options WHERE id in (SELECT question_answer_options.id FROM question_answer_options WHERE question_id=$1);", question_id);
};

const getCorrect = async (question_id) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE question_id=$1 AND is_correct = TRUE;", question_id);

    return res.rows;
};

const listAnswers = async (question_id) => {
    const res = await executeQuery("SELECT * FROM question_answer_options WHERE question_id=$1;", question_id);
    
    return res.rows;
};


export { addAnswer, deleteAllAnswers, deleteAnswer, getCorrect, listAnswers };