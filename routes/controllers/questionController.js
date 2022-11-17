import * as questionService from "../../services/questionService.js";
import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";
import * as valRules from "../../validation/validationRules.js";

const addQuestion = async ({ response, request, params, render, user }) => {
    const body = request.body({ type: "form" });
    const value = await body.value;
    let question_text = value.get("question_text");
    const user_id = user.id;
    const topic_id = params.id;

    // extra functionality --> append question mark
    if(question_text.charAt(question_text.length - 1) !== "?" && question_text.length !== 0) {
        question_text += "?";
    };

    const [passes, errors] = await validasaur.validate(
        {
            question_text: question_text,
        },
        valRules.questionValidationRules
    );

    if (!passes) {
        const data = { questions: await questionService.listQuestions(topic_id) };
        const topic = await topicService.getTopicById(topic_id);
        data.question_text = question_text;
        data.topic = topic.name;
        data.topic_id = topic_id;
        data.validationErrors = errors;

        render("question.eta", data);

    } else {
        await questionService.addQuestion(user_id, topic_id, question_text);

        response.redirect(`/topics/${topic_id}`);
    }
        
};

const deleteQuestion = async ({ response, params } ) => {
    await questionService.deleteQuestion(params.qId);

    response.redirect(`/topics/${params.tId}`);
};

const listQuestions = async ({ render, params } ) => {
    const topic_id = params.id;

    const topic = await topicService.getTopicById(topic_id);

    const questions = await questionService.listQuestions(topic_id);

    render("question.eta", { questions: questions, numQuestions: questions.length, topic: topic.name, topic_id: topic_id });
};


export { addQuestion, deleteQuestion, listQuestions };