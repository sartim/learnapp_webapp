import React from 'react';
import { connect } from 'react-redux';
import LeftSideNavPage from '../LeftSideNavPage/LeftSideNavPage'
import Header from '../HeaderPage/HeaderPage'
import Script from "../../_helpers/script";
import { FabPage } from "../FabPage";
import Link from "react-router-dom/es/Link";
import {BreadCrumbPage} from "../BreadCrumbPage";
import {quizActions} from "../../_actions";
import {HorizontalLoader} from "../LoaderPage/HorizontalLoader";

class QuizPortalPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // Add important scripts for layout
        Script.toggle();
        Script.collapse();
        Script.fab();
        this.viewQuiz = this.viewQuiz.bind(this);
        this.props.dispatch(quizActions.getQuizzes());
    }

    viewQuiz(id) {
        this.props.history.push(`/quiz/${id}/view`)
    }

    render() {
        const { quizzes } = this.props;
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
                              <button className="btn" onClick={() => this.viewQuiz(quiz.id)}>
                                  <i className="material-icons">remove_red_eye</i>
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
            <div id="main">
              <div className="wrapper">
                <BreadCrumbPage breadcrumbs={breadcrumbs} />
                <LeftSideNavPage />
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

const connectedQuizPortalPage = connect(mapStateToProps)(QuizPortalPage);
export { connectedQuizPortalPage as QuizPortalPage };
