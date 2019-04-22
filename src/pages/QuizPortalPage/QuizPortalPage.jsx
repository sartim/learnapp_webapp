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
import StarRatingComponent from 'react-star-rating-component';


class QuizPortalPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rating: 1
        };
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

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    render() {
        const { quizzes } = this.props;
        const { rating } = this.state;

        const breadcrumbs = <Link to="/quiz/list" className="breadcrumb">Quiz List</Link>;
        let results;
        let all_quizzes;
        if (quizzes.items) {
            all_quizzes = quizzes.items.results;
            results = (
                <div className="row">
                    <div className="col s8">
                        <div className="card-panel">
                            <ul>
                                { all_quizzes &&
                                <li>
                                    { all_quizzes.map((quiz, index) =>
                                        <div key={ quiz.id }>
                                            <div className="row">
                                                <div className="col s3">
                                                    <img src="https://tru-vue.com/wp-content/uploads/2015/11/video-icon.jpg"
                                                         className="responsive" style={{height: '110px', width: '100px'}}/>
                                                </div>
                                                <div className="col s9">
                                                    <h5>{ quiz.name }</h5>
                                                    <div style={{display: 'flex'}}>
                                                        <div className="padding-1">{ quiz.creator }  </div>
                                                        <div className="padding-1">{ quiz.created_date } </div>
                                                    </div>
                                                    <StarRatingComponent
                                                        name={quiz.id}
                                                        starCount={5}
                                                        value={rating}
                                                        onStarClick={this.onStarClick.bind(this)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </li>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="col s4">
                        <div className="card-panel">

                        </div>
                    </div>
                </div>

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
                          <div className="row">
                              <div className="col s3">
                                  <div className="card-panel">
                                      <div className="card-title">
                                          PROGRAMMING
                                      </div>
                                  </div>
                              </div>
                              <div className="col s3">
                                  <div className="card-panel">
                                      SOFTWARE DEVELOPMENT
                                  </div>
                              </div>
                              <div className="col s3">
                                  <div className="card-panel">
                                      <div className="card-title">
                                          DATA SCIENCE
                                      </div>
                                  </div>
                              </div>
                              <div className="col s3">
                                  <div className="card-panel">
                                      INFORMATION SECURITY
                                  </div>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col s12">
                                  {results}
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
    const { quizzes } = state;

    return { quizzes };
}

const connectedQuizPortalPage = connect(mapStateToProps)(QuizPortalPage);
export { connectedQuizPortalPage as QuizPortalPage };
