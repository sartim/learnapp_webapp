import {quizConstants} from '../_constants';
import {quizService} from '../_services';
import {alertActions} from "./alert.actions";
import { history } from '../_helpers';

export const quizActions = {
    getQuizzes,
    getQuizById,
    getQuizQuestions,
    getMyCreatedQuizzes,
    create,
    deleteQuestion,
    delete: _delete
};

function getQuizzes() {
    return dispatch => {
        dispatch(request());

        quizService.getQuizzes()
            .then(
                quizzes => dispatch(success(quizzes)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: quizConstants.GETALL_REQUEST } }
    function success(quizzes) { return { type: quizConstants.GETALL_SUCCESS, quizzes } }
    function failure(error) { return { type: quizConstants.GETALL_FAILURE, error } }
}

function getQuizById(quiz_id) {
    return dispatch => {
        dispatch(request());

        quizService.getQuizById(quiz_id)
            .then(
                quiz => {
                    dispatch(success(quiz));
                },
                error => dispatch(failure(error.toString()))
            )
    };

    function request() { return { type: quizConstants.QUIZ_REQUEST } }
    function success(quiz) { return { type: quizConstants.QUIZ_SUCCESS, quiz }}
    function failure(error) { return { type: quizConstants.QUIZ_FAILURE, error }}
}

function getQuizQuestions(quiz_id) {
    return dispatch => {
        dispatch(request());

        quizService.getQuizQuestions(quiz_id)
            .then(
                questions => {
                    dispatch(success(questions));
                },
                error => dispatch(failure(error.toString()))
            )
    };

    function request() { return { type: quizConstants.QUIZ_QUESTIONS_REQUEST } }
    function success(questions) { return { type: quizConstants.QUIZ_QUESTIONS_SUCCESS, questions }}
    function failure(error) { return { type: quizConstants.QUIZ_QUESTIONS_FAILURE, error }}
}

function getMyCreatedQuizzes() {
    return dispatch => {
        dispatch(request());

        quizService.getMyCreatedQuizzes()
            .then(
                questions => {
                    dispatch(success(questions));
                },
                error => dispatch(failure(error.toString()))
            )
    };

    function request() { return { type: quizConstants.QUIZ_QUESTIONS_REQUEST } }
    function success(questions) { return { type: quizConstants.QUIZ_QUESTIONS_SUCCESS, questions }}
    function failure(error) { return { type: quizConstants.QUIZ_QUESTIONS_FAILURE, error }}
}


function create(quiz_create) {
    return dispatch => {
        dispatch(request(quiz_create));

        quizService.create(quiz_create)
            .then(
                article_create => {
                    dispatch(success(article_create));
                    dispatch(alertActions.success('Quiz created successfully'));
                    history.push(`/quiz/list`);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(quiz_create) { return { type: quizConstants.CREATE_REQUEST, quiz_create } }
    function success(quiz_create) { return { type: quizConstants.CREATE_SUCCESS, quiz_create } }
    function failure(error) { return { type: quizConstants.CREATE_FAILURE, error } }
}

function deleteQuestion() {
    return dispatch => {
        dispatch(request(id));

        quizService.deleteQuestion(id)
            .then(
                question => {
                    dispatch(success(id));
                    console.log("Deleted!")
                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: quizConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: quizConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: quizConstants.DELETE_FAILURE, id, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        quizService.delete(id)
            .then(
                quiz => {
                    dispatch(success(id));
                    console.log("Deleted!")
                },
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: quizConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: quizConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: quizConstants.DELETE_FAILURE, id, error } }
}

