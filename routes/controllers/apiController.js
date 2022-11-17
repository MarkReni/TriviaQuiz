import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import { Randomize } from "../../randomFunction.js";

const getQuestion = async ({ response }) => {

    const data = {};

    const topics = await topicService.listTopics();

    let questionCount = 0;

    for(const topic of topics) {
        const questions = await questionService.listQuestions(topic.id);

        questionCount += questions.length;

    };

    if(questionCount !== 0) {

        let chosen_index_topics = Randomize(topics.length);

        let questions = await questionService.listQuestions(topics[chosen_index_topics].id);

        // Could be optimized!
        while(questions.length === 0) {
            chosen_index_topics = Randomize(topics.length);
            questions = await questionService.listQuestions(topics[chosen_index_topics].id);
        };

        const chosen_index_questions = Randomize(questions.length);
        const chosen_question = questions[chosen_index_questions];

        data.questionId = chosen_question.id;
        data.questionText = chosen_question.question_text;
        data.answerOptions = [];

        const question_answers = await answerService.listAnswers(chosen_question.id);

        for (const answer of question_answers) {
            data.answerOptions.push(
                {
                    optionId: answer.id,
                    optionText: answer.option_text,
                }
            );
        };
    };
    
    response.body = data;
};

const postResponse = async ({ request, response }) => {
    const data = {};

    const body = request.body({ type: "json" });
    const document = await body.value;

    const correct_answers = await answerService.getCorrect(document.questionId);

    if(correct_answers.some(answer => answer.id === Number(document.optionId))) {
        data.correct = true;
        
    } else {
        data.correct = false;
    };

    response.body = data;
};


export { getQuestion, postResponse };