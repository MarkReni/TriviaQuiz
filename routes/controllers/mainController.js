import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as responseService from "../../services/responseService.js";

const showMain = async ({ render }) => {

  const topics = await topicService.listTopics();

  let questionCount = 0;
  let responseCount = 0;

  for(const topic of topics) {
    const questions = await questionService.listQuestions(topic.id);

    for(const question of questions) {
      const responses = await responseService.listResponses(question.id);
      responseCount += responses.length;
    }

    questionCount += questions.length;
  };


  render("main.eta", { numTopics: topics.length, numQuestions: questionCount, numResponses: responseCount });
};

export { showMain };
