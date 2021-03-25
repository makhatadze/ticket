import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {toast} from "react-toastify";
import TextFieldGroup from "../../components/TextFieldGroup/TextFieldGroup";
import {loginUser} from "../../actions/auth/authActions";
import {Button} from "antd";
import './Login.scss';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            loading: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
        this.props.getCu
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    async onSubmit(e) {
        e.preventDefault();

        const userData = {
            username: this.state.username,
            password: this.state.password
        };

        this.setState({loading: true,errors: {}});

        await this.props.loginUser(userData).then((res) => {
            this.setState({loading: false, errors: {}})
            toast.success(res)
            this.props.history.push('/dashboard');
        }).catch(err => {
            toast.error(err)
            this.setState({errors: this.props.auth.errors, loading: false});
            console.log(this.state.errors)
        })
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="auth">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Ticket System</h1>
                            <p className="lead text-center">
                                Sign in to your account
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Enter UserName"
                                    name="username"
                                    type="text"
                                    errors={this.state.errors.username}
                                    value={this.state.username}
                                    onChange={this.onChange}
                                />
                                <TextFieldGroup
                                    placeholder="Enter Password"
                                    name="password"
                                    type="password"
                                    errors={this.state.errors.password}
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                <div className="login-button">
                                    <Button type="primary" htmlType="suit" loading={this.state.loading}>
                                        Log In
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});


export default (connect(mapStateToProps, {loginUser})(Login))
