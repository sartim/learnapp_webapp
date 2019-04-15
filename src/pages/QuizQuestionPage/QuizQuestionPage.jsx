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

class QuizQuestionPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        // Add important scripts for layout
        Script.toggle();
        Script.collapse();
        Script.fab();
        const quiz_id = this.props.match.params.id;
        this.props.dispatch(quizActions.getQuizQuestions(quiz_id));
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let string = event.target.value.split(',');
        this.setState({
            id: parseInt(string[0]),
            choice: string[1]
        });

        console.log(this.state);
        const questions = JSON.parse(localStorage.getItem('questions'));
        let q_array = [];
        for (let v of questions) {
            if (this.state.id == v.id) {
                v['choice'] = this.state.choice;
            }
            q_array.push(v);
        }
        console.log(q_array)

    }

    handleSubmit(e) {
        e.preventDefault();
    }

    render() {
        const { questions } = this.props;
        const breadcrumbs = <a href="#" className="breadcrumb">View Quiz</a>;

        let all_questions;
        if (questions) {
            all_questions = questions.results;
            const questions_ = localStorage.getItem('questions');
            if (!questions_) {

                localStorage.setItem('questions', JSON.stringify(all_questions));
            }
        }

        let question;

        // let question =
        //     <form onSubmit={this.handleSubmit}>
        //     <p>
        //         <label>
        //             <input className="with-gap" name={question.id + choice.a} type="radio" value={question.id + ','+ choice.a } checked={this.state.choice === choice.a } onChange={this.handleChange}/>
        //             <span>{choice.a}</span>
        //         </label>
        //     </p>
        //     <p>
        //         <label>
        //             <input className="with-gap" name={question.id + choice.b} type="radio" value={question.id + ','+ choice.b} checked={this.state.choice === choice.b } onChange={this.handleChange} />
        //             <span>{choice.b}</span>
        //         </label>
        //     </p>
        //     <p>
        //         <label>
        //             <input className="with-gap" name={question.id + choice.c} type="radio" value={question.id + ','+ choice.c} checked={this.state.choice === choice.c } onChange={this.handleChange} />
        //             <span>{choice.c}</span>
        //         </label>
        //     </p>
        //     <p>
        //         <label>
        //             <input className="with-gap" name={choice.d + choice.c} type="radio" value={question.id + ','+ choice.d} checked={this.state.choice === choice.d} onChange={this.handleChange} />
        //             <span>{choice.d}</span>
        //         </label>
        //     </p>
        // </form>
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
                              <div className="col 12">
                                  {question}
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
    const { questions } = state;

    return { questions };
}

const connectedQuizQuestionPage = connect(mapStateToProps)(QuizQuestionPage);
export { connectedQuizQuestionPage as QuizQuestionPage };
