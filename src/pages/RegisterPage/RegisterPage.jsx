import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import Script from "../../_helpers/script";

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                role: '',
                first_name: '',
                last_name: '',
                phone: '',
                email: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        Script.select();
    }

    componentWillMount() {
         document.body.style.height = "100%";
         document.body.style.display = "table-cell";
         document.body.style.backgroundColor = "#0098e1";
         document.body.style.verticalAlign = "middle";
         document.documentElement.style.display = "table";
         document.documentElement.style.margin = "auto";
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        console.log("Submitting");
        if (user.role && user.first_name && user.last_name && user.email && user.phone && user.password) {
            dispatch(userActions.register(user));
        }
    }

    handleRoleChange(event) {
        this.setState({user:{role: event.target.value}});
        console.log(this.state);
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div id="login-page" className="row">
                <div className="col s12 z-depth-4 card-panel">
                    <form className="login-form" name="form" onSubmit={this.handleSubmit}>
                        <div className="row">
                            <div className="input-field col s12 center">
                              <p className="center login-form-text">SIGNUP</p>
                            </div>
                        </div>
                        <div className={'form-group' + (submitted && !user.role ? ' has-error' : '')}>
                            <div className="input-field">
                                <select value={this.state.user.role} onChange={this.handleRoleChange}>
                                  <option value="" disabled selected>Choose your role</option>
                                  <option key={'LEARNER'} value={'LEARNER'}>LEARNER</option>
                                  <option key={'TUTOR'} value={'TUTOR'}>TUTOR</option>
                                </select>
                                <label>Role</label>
                                {submitted && !user.role &&
                                    <div className="help-block">Select a role</div>
                                }
                            </div>
                        </div>
                        <div className={'form-group' + (submitted && !user.first_name ? ' has-error' : '')}>
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" className="form-control" name="first_name" value={user.first_name} onChange={this.handleChange} />
                            {submitted && !user.first_name &&
                                <div className="help-block">First Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.last_name ? ' has-error' : '')}>
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" className="form-control" name="last_name" value={user.last_name} onChange={this.handleChange} />
                            {submitted && !user.last_name &&
                                <div className="help-block">Last Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                            {submitted && !user.email &&
                                <div className="help-block">Username is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.phone ? ' has-error' : '')}>
                            <label htmlFor="phone">Phone Number</label>
                            <input type="text" className="form-control" name="phone" value={user.phone} onChange={this.handleChange} />
                            {submitted && !user.phone &&
                                <div className="help-block">Phone Number is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                            {submitted && !user.password &&
                                <div className="help-block">Password is required</div>
                            }
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <button className="btn col s12">Register</button>
                                {registering &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
