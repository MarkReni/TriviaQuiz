import { validasaur } from "../deps.js";

const re = /^\S+(.*)/;

const topicValidationRules = {
    name: [validasaur.required, validasaur.minLength(1), validasaur.match(re)],
};

const questionValidationRules = {
    question_text: [validasaur.required, validasaur.minLength(1), validasaur.match(re)],
};

const answerValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1), validasaur.match(re)],
};

const registrationValidationRules = {
    email: [validasaur.required, validasaur.isEmail],
    password: [validasaur.required, validasaur.minLength(4)]
};


export { topicValidationRules, questionValidationRules, answerValidationRules, registrationValidationRules };