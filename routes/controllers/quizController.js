import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import * as responseService from "../../services/responseService.js";
import { Randomize } from "../../randomFunction.js";

// For function random_question
let chosen_question_id = 0;
let same_question = true;

const addResponse = async ({ response, params, user }) => {
    const user_id = user.id;
    const question_id = params.qId;
    const answer_id = params.oId;
    const topic_id = params.tId;

    await responseService.addResponse(user_id, question_id, answer_id);

    const correct_answers = await answerService.getCorrect(question_id);

    if(correct_answers.some(answer => answer.id === Number(answer_id))) {

        response.redirect(`/quiz/${topic_id}/questions/${question_id}/correct`);

    } else {
        
        response.redirect(`/quiz/${topic_id}/questions/${question_id}/incorrect`);
    };
    
};

const listTopics = async ({ render } ) => {
    const topics = await topicService.listTopics();

    render("quiz.eta", { topics: topics, numTopics: topics.length});
};

const randomQuestion = async ({ params, response, render }) => {

    const topic_id = params.tId;

    const questions = await questionService.listQuestions(topic_id);

    if(questions.length !== 0) {
        let chosen_index = Randomize(questions.length);
        let chosen_question = questions[chosen_index];

        // check that the same question is not asked in a row
        if(chosen_question_id === chosen_question.id && questions.length !== 1) {
            same_question = true;
            while(same_question) {
                chosen_index = Randomize(questions.length);
                chosen_question = questions[chosen_index];

                if(chosen_question_id !== chosen_question.id) {
                    same_question = false;
                };
            };
        };

        chosen_question_id = chosen_question.id;

        if(questions.length === 1){
            response.redirect(`/quiz/${topic_id}/questions/${chosen_question.id}?is_one=1`);
        } else {
            response.redirect(`/quiz/${topic_id}/questions/${chosen_question.id}?is_one=0`);
        };
    
    } else {

        render("messages.eta", {is_question: true});
    };

};

const showCorrect = async ({ render, params }) => {
    const topic_id = params.tId;

    render("messages.eta", {is_question: false, is_correct: true, topic_id: topic_id})
};

const showIncorrect = async ({ render, params }) => {
    const topic_id = params.tId;
    const question_id = params.qId;

    const correct_answers = await answerService.getCorrect(question_id);


    render("messages.eta", {is_question: false, is_correct: false, topic_id: topic_id, correct_answers: correct_answers})
};

const listQuizAnswers = async ({ render, params, request } ) => {
    const topic_id = params.tId;
    const question_id = params.qId;
    const is_one = Number(request.url.searchParams.get("is_one"));

    const question = await questionService.getQuestionById(question_id);

    const answers = await answerService.listAnswers(question_id);

    render("quizAnswers.eta", { answers: answers, numAnswers: answers.length, question: question.question_text, topic_id: topic_id, question_id: question_id, is_one: is_one });
};


export { addResponse, listQuizAnswers, showCorrect, showIncorrect, listTopics, randomQuestion };