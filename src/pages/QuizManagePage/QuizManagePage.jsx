import React from 'react';
import { connect } from 'react-redux';
import SideNav from '../SideNavPage/SideNavPage'
import Header from '../HeaderPage/HeaderPage'
import Script from "../../_helpers/script";
import { FabPage } from "../FabPage";
import Link from "react-router-dom/es/Link";
import {PaginationPage} from "../PaginationPage";
import {BreadCrumbPage} from "../BreadCrumbPage";
import {ModalPage} from "../ModalPage";
import {quizActions} from "../../_actions";
import {HorizontalLoader} from "../LoaderPage/HorizontalLoader";

class QuizManagePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // Add important scripts for layout
        Script.toggle();
        Script.collapse();
        Script.fab();

        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.setQuizId = this.setQuizId.bind(this);
        const quiz_id = this.props.match.params.id;
        this.props.dispatch(quizActions.getQuizById(quiz_id));
        this.props.dispatch(quizActions.getQuizQuestions(quiz_id));
    }

    manageQuiz(id) {
        this.props.history.push(`/quiz/${id}/manage`)
    }

    deleteQuestion(id) {
        this.props.dispatch(quizActions.deleteQuestion(this.state));
    }

    setQuizId(id) {
        return () => this.setState({id: id});
    }

    render() {
        const { quiz, questions } = this.props;
        const { name, description, video_url, needs_invite, time_to_take, submitted } = this.state;
        const breadcrumbs = <a href="#" className="breadcrumb">Manage Quiz</a>;

        let all_questions;
        if (questions) {
            all_questions = questions.results;
            console.log(all_questions);
        }
        return (
          <div>
            <Header />
            <FabPage />
            <div id="main">
              <div className="wrapper">
                <BreadCrumbPage breadcrumbs={breadcrumbs} />
                <SideNav />
                  <section id="content">
                    <div className="container">
                      <div className="section">
                          <div className="row">
                              <div className="col s4 z-depth-4 card-panel padding-3">
                                  <form name="form" onSubmit={this.handleSubmit}>
                                      <div className="row">
                                          <h6>Name</h6>
                                          <div className={'input-field col s12'}>
                                              <input type="text" name="name" value={quiz.name} onChange={this.handleChange}/>
                                              {submitted && !name &&
                                              <div className="help-block">Name is required</div>
                                              }
                                          </div>
                                      </div>
                                      <div className="row">
                                          <h6>Description</h6>
                                          <div className={'input-field col s12'}>
                                              <input type="text" name="description" value={quiz.description} onChange={this.handleChange}/>
                                              {submitted && !description &&
                                              <div className="help-block">Description is required</div>
                                              }
                                          </div>
                                      </div>
                                      <div className="row">
                                          <h6>Video Url</h6>
                                          <div className={'input-field col s12'}>
                                              <input type="text" name="video_url" value={quiz.video_url} onChange={this.handleChange}/>
                                          </div>
                                      </div>
                                      {/*<div className="row margin">*/}
                                      {/*<div className={'input-field col s12'}>*/}
                                      {/*<input type="checkbox" name="needs_invite" value={needs_invite} onChange={this.handleChange}/>*/}
                                      {/*<label htmlFor="needs_invite">Needs invite</label>*/}
                                      {/*</div>*/}
                                      {/*</div>*/}
                                      <div className="row">
                                          <h6>Time To Take</h6>
                                          <div className={'input-field col s12'}>
                                              <input type="text" name="time_to_take" value={quiz.time_to_take} onChange={this.handleChange}/>
                                          </div>
                                      </div>
                                      <div className="row">
                                          <div className="input-field col s12">
                                              <button className="btn col s12">Update</button>
                                          </div>
                                      </div>
                                  </form>
                              </div>
                              <div className="col s8 z-depth-4 card-panel padding-3">
                                  <table>
                                      <thead>
                                      <th>ID</th>
                                      <th>Question</th>
                                      <th>Options</th>
                                      </thead>
                                      { all_questions &&
                                      <tbody>
                                      { all_questions.map((question, index) =>
                                          <tr key={ question.id }>
                                              <td>{ question.id }</td>
                                              <td>{ question.question }</td>
                                              <td>{ question.choices }</td>
                                              <td style={{display: 'flex'}}>
                                                  <button className="btn green" onClick={() => this.editQuestion(question.id)}>
                                                      <i className="material-icons">edit</i>
                                                  </button>
                                                  <button data-target="modal-popup"
                                                          className="btn red modal-trigger"
                                                          onClick={this.setQuizId(quiz.id)}>
                                                      <i className="material-icons">delete</i>
                                                  </button>
                                              </td>
                                          </tr>
                                      )}
                                      </tbody>
                                      }
                                  </table>
                              </div>
                          </div>
                      </div>
                    </div>
                  </section>
              </div>
            </div>
          </div>
        );
    }
}

function mapStateToProps(state) {
    const { quiz, questions } = state;

    return { quiz, questions };
}

const connectedQuizManagePage = connect(mapStateToProps)(QuizManagePage);
export { connectedQuizManagePage as QuizManagePage };
