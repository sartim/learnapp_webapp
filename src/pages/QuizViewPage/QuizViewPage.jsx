import React from 'react';
import { connect } from 'react-redux';
import LeftSideNavPage from '../LeftSideNavPage/LeftSideNavPage'
import Header from '../HeaderPage/HeaderPage'
import Script from "../../_helpers/script";
import { FabPage } from "../FabPage";
import Link from "react-router-dom/es/Link";
import {PaginationPage} from "../PaginationPage";
import {BreadCrumbPage} from "../BreadCrumbPage";
import {ModalPage} from "../ModalPage";
import {quizActions} from "../../_actions";
import {HorizontalLoader} from "../LoaderPage/HorizontalLoader";

class QuizViewPage extends React.Component {

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
        this.props.dispatch(quizActions.getQuizById(quiz_id));
        this.begin = this.begin.bind(this);
    }

    begin(id) {
        this.props.history.push(`/quiz/${id}/questions`)
    }

    render() {
        const { quiz } = this.props;
        const breadcrumbs = <a href="#" className="breadcrumb">View Quiz Video</a>;

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
                              <div className="col 12">
                                  <iframe width="700" height="315" src={quiz.video_url}
                                          frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                          allowfullscreen>
                                  </iframe>
                              </div>
                          </div>
                          <div className="row">
                              <button className="btn col 12" onClick={() => this.begin(quiz.id)}> BEGIN</button>
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
    const { quiz } = state;

    return { quiz };
}

const connectedQuizViewPage = connect(mapStateToProps)(QuizViewPage);
export { connectedQuizViewPage as QuizViewPage };
