import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { UserListPage } from '../pages/UserListPage';
import {ProfileVieWPage} from "../pages/ProfileViewPage";
import {SettingsViewPage} from "../pages/SettingsViewPage";
import {SearchResultsPage} from "../pages/SearchResultsPage";
import {QuizListPage} from "../pages/QuizListPage";
import {QuizCreatePage} from "../pages/QuizCreatePage";
import {QuizManagePage} from "../pages/QuizManagePage";
import {QuizViewPage} from "../pages/QuizViewPage";
import {QuizPortalPage} from "../pages/QuizPortalPage";
import {QuizQuestionPage} from "../pages/QuizQuestionPage";
import {TutorshipRequestListPage} from "../pages/TutorshipRequestListPage";

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div>
                {/*{alert.message &&*/}
                    {/*<div className={`alert ${alert.type}`}>{alert.message}</div>*/}
                {/*}*/}
                <Router history={history}>
                    <div>
                        <PrivateRoute exact path="/" component={HomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute path="/quiz/:id/manage" component={QuizManagePage} />
                        <PrivateRoute path="/quiz/portal" component={QuizPortalPage} />
                        <PrivateRoute path="/quiz/:id/view" component={QuizViewPage} />
                        <PrivateRoute path="/quiz/:id/questions" component={QuizQuestionPage} />
                        <PrivateRoute path="/quiz/create" component={QuizCreatePage} />
                        <PrivateRoute path="/quiz/list" component={QuizListPage} />
                        <PrivateRoute path="/user/list" component={UserListPage} />
                        <PrivateRoute path="/tutorship/request/list" component={TutorshipRequestListPage}/>
                        <PrivateRoute path="/profile" component={ProfileVieWPage}/>
                        <PrivateRoute path="/settings" component={SettingsViewPage}/>
                        <PrivateRoute path="/search" component={SearchResultsPage}/>
                    </div>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
export default App;
