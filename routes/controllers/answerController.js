import * as answerService from "../../services/answerService.js";
import * as questionService from "../../services/questionService.js";
import * as responseService from "../../services/responseService.js";
import { validasaur } from "../../deps.js";
import * as valRules from "../../validation/validationRules.js";

const addAnswer = async ({ response, request, params, render }) => {
    const body = request.body({ type: "form" });
    const value = await body.value;
    const option_text = value.get("option_text");
    const is_correct = value.get("is_correct");
    const question_id = params.qId;
    const topic_id = params.id;

    const [passes, errors] = await validasaur.validate(
        {
            option_text: option_text,
        },
        valRules.answerValidationRules
    );

    if (!passes) {
        const data = { answers: await answerService.listAnswers(question_id) };
        const question = await questionService.getQuestionById(question_id);
        data.question = question.question_text;
        data.option_text = option_text;
        data.question_id = question_id;
        data.topic_id = topic_id;
        data.validationErrors = errors;

        render("answer.eta", data);

    } else if(is_correct) {
        await answerService.addAnswer(question_id, option_text, true);

        response.redirect(`/topics/${topic_id}/questions/${question_id}`);
    } else {
        await answerService.addAnswer(question_id, option_text, false);

        response.redirect(`/topics/${topic_id}/questions/${question_id}`);
    };
};

const deleteAnswer = async ({ response, params } ) => {
    const answer_id = params.oId;

    await responseService.deleteResponse(answer_id);

    await answerService.deleteAnswer(answer_id);

    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};

const listAnswers = async ({ render, params } ) => {
    const topic_id = params.id;
    const question_id = params.qId;

    const question = await questionService.getQuestionById(question_id);

    const answers = await answerService.listAnswers(question_id);

    render("answer.eta", { answers: answers, numAnswers: answers.length, question: question.question_text, topic_id: topic_id, question_id: question_id });
};


export { addAnswer, deleteAnswer, listAnswers };