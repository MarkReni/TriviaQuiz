import { executeQuery } from "../database/database.js";

const addTopic = async (user_id, name) => {
    await executeQuery("INSERT INTO topics(user_id, name) VALUES($1, $2);", user_id, name);
};

const deleteTopic = async (id) => {
    await executeQuery("DELETE FROM topics WHERE id=$1", id);
};

const getTopicById = async (topic_id) => {
    const res = await executeQuery("SELECT * FROM topics WHERE id=$1;", topic_id);
    
    return res.rows[0];
};

const listTopics = async () => {
    const res = await executeQuery("SELECT * FROM topics ORDER BY name ASC;");
    
    return res.rows;
};


export { addTopic, deleteTopic, getTopicById, listTopics };