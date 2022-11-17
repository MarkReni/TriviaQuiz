import { assertEquals } from "https://deno.land/std@0.120.0/testing/asserts.ts";
import * as topicService from "../services/topicService.js";
import * as questionService from "../services/questionService.js";
import * as answerService from "../services/answerService.js";
import * as responseService from "../services/responseService.js";


// Test that getting correct answer option works as planned
Deno.test({
    name: "answerService_test1",
    async fn() {
        const res = await answerService.getCorrect(2);
        assertEquals(res[0].id, 2);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

// Test that deleting a topic works as planned
Deno.test({
    name: "topicService_test",
    async fn() {
        await topicService.deleteTopic(2);
        const topics = await topicService.listTopics();
        assertEquals(1, topics.length);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

// Test that deleting an answer works as planned
Deno.test({
    name: "questionService_test",
    async fn() {
        await questionService.deleteQuestion(1);
        const questions = await questionService.listQuestions(1);
        assertEquals(1, questions.length);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

// Test that deleting an answer works as planned
Deno.test({
    name: "answerService_test2",
    async fn() {
        await answerService.deleteAnswer(1);
        const answers = await answerService.listAnswers(2);
        assertEquals(2, answers.length);
    },
    sanitizeResources: false,
    sanitizeOps: false,
});

// Test that adding and deleting a response(answer) works as planned
Deno.test({
    name: "responseService_test",
    async fn() {
        await responseService.addResponse(1, 2, 2);
        await responseService.addResponse(1, 2, 3);
        await responseService.addResponse(1, 2, 2);
        await responseService.addResponse(1, 2, 3);
        const responses = await responseService.listResponses(2);
        assertEquals(4, responses.length);
        await responseService.deleteResponse(3);
        const twoLessResponses = await responseService.listResponses(2);
        assertEquals(2, twoLessResponses.length);
        await responseService.deleteAllResponses(2);
        const noResponses = await responseService.listResponses(2);
        assertEquals(0, noResponses.length);

    },
    sanitizeResources: false,
    sanitizeOps: false,
});