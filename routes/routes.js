import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "../routes/controllers/topicController.js";
import * as questionController from "../routes/controllers/questionController.js";
import * as answerController from "../routes/controllers/answerController.js";
import * as registrationController from "../routes/controllers/registrationController.js";
import * as loginController from "../routes/controllers/loginController.js";
import * as quizController from "../routes/controllers/quizController.js";
import * as apiController from "../routes/controllers/apiController.js";


const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);

router.get("/topics/:id", questionController.listQuestions);
router.post("/topics/:id/questions", questionController.addQuestion);
router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestion);

router.get("/topics/:id/questions/:qId", answerController.listAnswers);
router.post("/topics/:id/questions/:qId/options", answerController.addAnswer);
router.post("/topics/:tId/questions/:qId/options/:oId/delete", answerController.deleteAnswer);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/quiz", quizController.listTopics);
router.get("/quiz/:tId", quizController.randomQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.listQuizAnswers);
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.addResponse);
router.get("/quiz/:tId/questions/:qId/correct", quizController.showCorrect);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.showIncorrect);

router.get("/api/questions/random", apiController.getQuestion);
router.post("/api/questions/answer", apiController.postResponse);


export { router };
