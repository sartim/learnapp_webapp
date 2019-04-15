import React from 'react';
import { connect } from 'react-redux';
import config from 'config';
import { articleActions } from '../../_actions';
import SideNav from '../SideNavPage/SideNavPage'
import Header from '../HeaderPage/HeaderPage'
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import Script from '../../_helpers/script';
import { FabPage } from "../FabPage";
import io from "socket.io-client";
import * as M from "../../../bower_components/admin-assets/js/materialize.min";
import {SocketProvider} from "socket.io-react";
import {BreadCrumbPage} from "../BreadCrumbPage";
import {SpinnerLoader} from "../LoaderPage/SpinnerLoader";
import RightSideNavPage from "../RightSideNavPage/RightSideNavPage";
import {userActions} from "../../_actions/user.actions";
import {quizActions} from "../../_actions/quiz.actions";

am4core.useTheme(am4themes_animated);

let namespace = '/notification';
const socket = io.connect(`${config.apiUrl}`+namespace);
const loggedin_user = JSON.parse(localStorage.getItem('user'));
if (location.pathname !== '/login') {

    socket.on('connect', function() {
        socket.emit('my event', {
            data: Script.decrypt(loggedin_user.user.id)
        });
        // socket.emit('join', {
        //     username: current_user.user.name,
        //     room: 'test room'
        // });
    });

    socket.on('disconnect', function () {
        console.log("disconnected");
        socket.emit('user disconnect', {
            data: 'Disconnected '+ Script.decrypt(loggedin_user.user.full_name)
        });
    });

    socket.on('connection response', function (data) {
        if (data.status === "connect") {
            console.log("Connected");
            if (data.id != Script.decrypt(loggedin_user.user.id)) M.toast({html: data.message});
        }
        if (data.status === "disconnect") {
            console.log("Disconnected");
            if (data.id != Script.decrypt(loggedin_user.user.id)) M.toast({html: data.message});
        }
    });

    socket.on('message', function(data){
        console.log(data);
        if (data.status === "Success") {
            if (data.id !== Script.decrypt(loggedin_user.user.id))
                M.toast({html: 'Success'});
            console.log("Success")
        } else if (data.status === "Warning") {
            if (data.id !== Script.decrypt(loggedin_user.user.id))
                M.toast({html: 'Warning'});
            console.log("Warning")
        }else if (data.status === "Error") {
            if (data.id !== Script.decrypt(loggedin_user.user.id))
                M.toast({html: 'Error'});
            console.log("Error")
        }else if (data.status === "started") {
            if (data.id !== Script.decrypt(loggedin_user.user.id))
                M.toast({html: 'Started Quiz'});
            console.log(data);
        }else if (data.status === "completed") {
            if (data.id !== current_user.user.id)
                M.toast({html: 'Completed Quiz'});
            console.log(data);
        }
    });
}

class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders_today: 0,
            orders_yesterday: 0,
            orders_this_month: 0,
            orders_last_month: 0,
            orders_this_year: 0,
            orders_last_year: 0,
            daily_orders: null
        }
    }

    componentDidMount() {
        // Add important scripts for layout
        Script.toggle();
        Script.collapse();
        Script.tabs();
        Script.fab();

        // Modify some styles on home entry
        document.body.style.display = "block";
        document.documentElement.style.display = "block";
        document.body.style.backgroundColor = "#f9f9f9";

        this.props.dispatch(userActions.getOnlineUsers());
        this.props.dispatch(quizActions.getMyCreatedQuizzes());

        socket.on('stats message', function(data){

        }.bind(this));

        socket.on('online users', function(data) {
            if (data) {
                this.setState({online_users: data});
            }
        }.bind(this));
    }


    render() {
        const {online_users, created_quizzes} = this.props;

        const current_user = JSON.parse(localStorage.getItem('user'));

        let online;
        if (this.state.online_users) {
            online = this.state.online_users.results;
        } else if (online_users.items) {
            online = online_users.items.results;
        }
        const loggedin_user = JSON.parse(localStorage.getItem('user'));
        let view;
        for (const role of loggedin_user.user.roles) {
            const r = Script.decrypt(role);
            if (r === 'TUTOR') {
                view =
                    <div className="container">
                        <div id="card-stats">
                            <div className="row">
                                <div className="col s12 m6 l4">
                                  <div className="card">
                                    <div className="card-content light-blue white-text">
                                      <p className="card-stats-title" style={{'fontSize': '12px'}}>Created Quizzes</p>
                                      <h4 className="card-stats-number">{created_quizzes}</h4>
                                    </div>
                                  </div>
                                </div>
                                <div className="col s12 m6 l4">
                                  <div className="card">
                                    <div className="card-content light-blue lighten-1 white-text">
                                      <p className="card-stats-title" style={{'fontSize': '12px'}}>Pending Quizzes</p>
                                      <h4 className="card-stats-number"></h4>
                                    </div>
                                  </div>
                                </div>
                                <div className="col s12 m6 l4">
                                  <div className="card">
                                    <div className="card-content light-blue white-text">
                                      <p className="card-stats-title" style={{'fontSize': '12px'}}>Completed Quizzes</p>
                                      <h4 className="card-stats-number"></h4>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ;
            } if (r === 'LEARNER') {
                view = '';
            }
        }

        return (
          <SocketProvider socket={socket}>
            <div>
            <FabPage />
            <Header />
            <div id="main">
              <div className="wrapper">
                <BreadCrumbPage />
                <SideNav />
                <section id="content">
                    {view}
                </section>
                <RightSideNavPage online_users={online} current_user={current_user} />
              </div>
            </div>
          </div>
          </SocketProvider>
        );
    }
}

function mapStateToProps(state) {
    const {
        online_users,
        created_quizzes
    } = state;

    return {
        online_users,
        created_quizzes
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
