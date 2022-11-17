import { executeQuery } from "../database/database.js";

const addQuestion = async (user_id, topic_id, question_text) => {
    await executeQuery("INSERT INTO questions(user_id, topic_id, question_text) VALUES($1, $2, $3);", user_id, topic_id, question_text);
};

const deleteQuestion = async (question_id) => {
    await executeQuery("DELETE FROM questions WHERE id=$1;", question_id);
};

const deleteAllQuestions = async (topic_id) => {
    await executeQuery("DELETE FROM questions WHERE id in (SELECT questions.id FROM questions WHERE topic_id=$1);", topic_id);
};

const getQuestionById = async (question_id) => {
    const res = await executeQuery("SELECT * FROM questions WHERE id=$1;", question_id);
    
    return res.rows[0];
};

const getQuestionIds = async (topic_id) => {
    const res = await executeQuery("SELECT id FROM questions WHERE topic_id=$1;", topic_id);
    
    return res.rows;
};

const listQuestions = async (topic_id) => {
    const res = await executeQuery("SELECT * FROM questions WHERE topic_id=$1;", topic_id);
    
    return res.rows;
};


export { addQuestion, deleteAllQuestions, deleteQuestion, getQuestionById, getQuestionIds, listQuestions } ;