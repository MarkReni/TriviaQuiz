import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";
import * as responseService from "../../services/responseService.js";
import { validasaur } from "../../deps.js";
import * as valRules from "../../validation/validationRules.js";

const addTopic = async ({ response, request, user, render }) => {
    const body = request.body({ type: "form" });
    const value = await body.value;
    const name = value.get("name");
    const user_id = user.id;

    if(user.admin) {

        const [passes, errors] = await validasaur.validate(
            {
                name: name,
            },
            valRules.topicValidationRules
        );

        if (!passes) {
            const data = { topics: await topicService.listTopics(), };
            data.validationErrors = errors;
            data.name = name;

            render("topic.eta", data)

        } else {
            await topicService.addTopic(user_id, name);

            response.redirect("/topics");
        };

    } else {

        response.redirect("/topics");

    };

};

const deleteTopic = async ({ response, params, user } ) => {
    if(user.admin) {

        const topic_id = params.id;

        const questionIds = await questionService.getQuestionIds(topic_id);

        // Could be optimized!
        for (const id of questionIds) {

            await responseService.deleteAllResponses(id.id);

            await answerService.deleteAllAnswers(id.id);
        }
        
        await questionService.deleteAllQuestions(topic_id);
        await topicService.deleteTopic(topic_id);

        response.redirect("/topics");

    } else {

        response.redirect("/topics");

    };
};

const listTopics = async ({ render } ) => {
    const topics = await topicService.listTopics();

    render("topic.eta", { topics: topics, numTopics: topics.length });
};


export { addTopic, deleteTopic, listTopics };