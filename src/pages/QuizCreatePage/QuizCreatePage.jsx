import React from 'react';
import { connect } from 'react-redux';
import SideNav from '../SideNavPage/SideNavPage'
import Header from '../HeaderPage/HeaderPage'
import Script from "../../_helpers/script";
import {Link} from "react-router-dom";
import {BreadCrumbPage} from "../BreadCrumbPage";
import {quizActions} from "../../_actions";

class QuizCreatePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            video_url: "",
            needs_invite: "",
            time_to_take: "",
            submitted: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        // Add important scripts for layout
        Script.toggle();
        Script.collapse();
        Script.fab();
        Script.select();
        Script.custom();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        console.log(this.state)
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { name, description, video_url, needs_invite, time_to_take } = this.state;
        const { dispatch } = this.props;
        if (name && description) {
            dispatch(quizActions.create(this.state));
        }
    }

    render() {
        const { } = this.props;
        const { name, description, video_url, needs_invite, time_to_take, submitted } = this.state;

        const breadcrumbs = <Link to="/" className="breadcrumb">Create</Link>;

        return (
          <div>
            {/*{alert.message &&*/}
                    {/*<div className={`alert ${alert.type}`}>{alert.message}</div>*/}
                {/*}*/}
            <Header />
            <div id="main">
              <div className="wrapper">
                <BreadCrumbPage breadcrumbs={breadcrumbs}/>
                <SideNav />
                  <section id="content">
                    <div className="container">
                      <div className="section">
                        <div className="row">
                          <div className="col s12">
                            <div className="card">
                              <div className="card-header">
                                <div className="col s12">
                                  {/*<h4 className="header">New Article</h4>*/}
                                </div>
                              </div>
                              <div className="card-content">
                                  <div className="row">
                                    <form name="form" onSubmit={this.handleSubmit}>
                                      <div className="row margin">
                                        <div className={'input-field col s12' + (submitted && !name ? ' has-error' : '')}>
                                          <input type="text" name="name" value={name} onChange={this.handleChange}/>
                                          {submitted && !name &&
                                              <div className="help-block">Name is required</div>
                                          }
                                          <label htmlFor="email">Name</label>
                                        </div>
                                      </div>
                                      <div className="row margin">
                                        <div className={'input-field col s12' + (submitted && !description ? ' has-error' : '')}>
                                            <input type="text" name="description" value={description} onChange={this.handleChange}/>
                                            {submitted && !description &&
                                            <div className="help-block">Description is required</div>
                                            }
                                            <label htmlFor="email">Description</label>
                                        </div>
                                      </div>
                                      <div className="row margin">
                                        <div className={'input-field col s12'}>
                                            <input type="text" name="video_url" value={video_url} onChange={this.handleChange}/>
                                            <label htmlFor="video_url">Video Url</label>
                                        </div>
                                      </div>
                                      {/*<div className="row margin">*/}
                                        {/*<div className={'input-field col s12'}>*/}
                                            {/*<input type="checkbox" name="needs_invite" value={needs_invite} onChange={this.handleChange}/>*/}
                                            {/*<label htmlFor="needs_invite">Needs invite</label>*/}
                                        {/*</div>*/}
                                      {/*</div>*/}
                                      <div className="row margin">
                                        <div className={'input-field col s12'}>
                                            <input type="text" name="time_to_take" value={time_to_take} onChange={this.handleChange}/>
                                            <label htmlFor="email">Time To Take</label>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="input-field col s12">
                                            <button className="btn col s12">Save</button>
                                        </div>
                                      </div>
                                    </form>
                                  </div>
                              </div>
                            </div>
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
    const { } = state;

    return {
        alert
    };
}

const connectedQuizCreatePage = connect(mapStateToProps)(QuizCreatePage);
export { connectedQuizCreatePage as QuizCreatePage };
