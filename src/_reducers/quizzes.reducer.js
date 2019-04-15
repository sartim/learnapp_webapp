import {quizConstants} from '../_constants';

export function quizzes(state = {}, action) {
  switch (action.type) {
    case quizConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case quizConstants.GETALL_SUCCESS:
      return {
        items: action.quizzes
      };
    case quizConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case quizConstants.DELETE_REQUEST:
      return {
        ...state,
        items: state.items.map(quiz =>
          quiz.id === action.id
            ? { ...quiz, deleting: true }
            : quiz
        )
      };
    case quizConstants.DELETE_SUCCESS:
      return {
        items: state.items.filter(quiz => quiz.id !== action.id)
      };
    case quizConstants.DELETE_FAILURE:
      return {
        ...state,
        items: state.items.map(quiz => {
          if (quiz.id === action.id) {
            const { deleting, ...quizCopy } = quiz;
            return { ...quizCopy, deleteError: action.error };
          }

          return quiz;
        })
      };
    default:
      return state
  }
}

export function quiz(state = {}, action) {
  switch (action.type) {
    case quizConstants.QUIZ_REQUEST:
      return {};
    case quizConstants.QUIZ_SUCCESS:
      return action.quiz;
    case quizConstants.QUIZ_FAILURE:
      return {};
    default:
      return state
  }
}

export function questions(state = {}, action) {
    switch (action.type) {
        case quizConstants.QUIZ_QUESTIONS_REQUEST:
            return {};
        case quizConstants.QUIZ_QUESTIONS_SUCCESS:
            return action.questions;
        case quizConstants.QUIZ_QUESTIONS_FAILURE:
            return {};
        default:
            return state
    }
}
