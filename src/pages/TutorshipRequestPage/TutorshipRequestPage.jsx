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

class QuizListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // Add important scripts for layout
        Script.toggle();
        Script.collapse();
        Script.fab();
        this.editQuiz = this.editQuiz.bind(this);
        this.deleteQuiz = this.deleteQuiz.bind(this);
        this.setQuizId = this.setQuizId.bind(this);
        this.manageQuiz = this.manageQuiz.bind(this);

        this.props.dispatch(quizActions.getQuizzes());
    }

    editQuiz(id) {
        console.log("Editing");
    }

    manageQuiz(id) {
        this.props.history.push(`/quiz/${id}/manage`)
    }

    deleteQuiz(id) {
        this.props.dispatch(quizActions.delete(this.state));
    }

    setQuizId(id) {
        return () => this.setState({id: id});
    }

    render() {
        const { quizzes } = this.props;
        let element;
        const confirm = <button className="modal-close btn-flat" onClick={() => this.deleteQuiz(this.state.id)}>Ok</button>;
        const cancel = <button className="modal-close btn-flat">Cancel</button>;
        const breadcrumbs = <Link to="/quiz/list" className="breadcrumb">Quiz List</Link>;
        let results;
        let all_quizzes;
        if (quizzes.items) {
            all_quizzes = quizzes.items.results;
            results = (
                <table className="responsive-table striped highlight">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>CREATOR</th>
                        <th>CREATED DATE</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    { all_quizzes &&
                    <tbody>
                        { all_quizzes.map((quiz, index) =>
                        <tr key={ quiz.id }>
                          <td>{ quiz.id }</td>
                          <td>{ quiz.name }</td>
                          <td>{ quiz.creator }</td>
                          <td>{ quiz.created_date }</td>
                          <td style={{display: 'flex'}}>
                              {/*<button className="btn" onClick={() => this.editQuiz(quiz.id)}>*/}
                              {/*<i className="material-icons">edit</i>*/}
                            {/*</button>*/}
                              <button className="btn green" onClick={() => this.manageQuiz(quiz.id)}>
                                  MANAGE
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
            )
        } else {
            results = (<HorizontalLoader />)
        }

        return (
          <div>
            <Header />
            <FabPage />
            <ModalPage header="Confirm" message="Are you sure you want to delete?" confirm={confirm} cancel={cancel} />
            <div id="main">
              <div className="wrapper">
                <BreadCrumbPage breadcrumbs={breadcrumbs} />
                <SideNav />
                  <section id="content">
                    <div className="container">
                      <div className="section">
                        <div className="col s12">
                            {results}
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
    const { quizzes } = state;

    return { quizzes };
}

const connectedQuizListPage = connect(mapStateToProps)(QuizListPage);
export { connectedQuizListPage as QuizListPage };
