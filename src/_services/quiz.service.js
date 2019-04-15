import config from 'config';
import { authHeader } from '../_helpers';
import {handleResponse} from "../_helpers/response-handler";

export const quizService = {
    getQuizzes,
    getQuizById,
    getQuizQuestions,
    getMyCreatedQuizzes,
    create,
    deleteQuestion,
    delete: _delete
};

function getQuizzes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/quiz/`, requestOptions).then(handleResponse);
}

function getQuizById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/quiz/?id=` + id, requestOptions).then(handleResponse);
}

function getQuizQuestions(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/quiz/${id}/questions`, requestOptions).then(handleResponse);
}

function getMyCreatedQuizzes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/quiz/?owned=true`, requestOptions).then(handleResponse);
}

function create(quiz) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(quiz)
    };
    return fetch(`${config.apiUrl}/quiz/`, requestOptions).then(handleResponse);
}

function deleteQuestion(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/question/?id=${id}`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`${config.apiUrl}/quiz/?id=${id}`, requestOptions).then(handleResponse);
}

