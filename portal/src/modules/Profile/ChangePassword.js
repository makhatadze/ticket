import React, {Component} from "react";
import {Button, Form, Input, Modal, Select} from "antd";
import formLayout from "../../core/config/formLayout";
import {EyeTwoTone, EyeInvisibleOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {resetPassword} from "../../actions/auth/authActions";
import {toast} from "react-toastify";

class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_password: '',
            password: '',
            password_confirmation: '',
            errors: {},
            loading: false
        }
        this.onChange = this.onChange.bind(this)
        this.onResetPassword = this.onResetPassword.bind(this)
    }

    async onResetPassword() {
        const data = {
            current_password: this.state.current_password,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        }
        this.setState({errors: {}, loading: false})
        await this.props.resetPassword(data)
            .then(res => {
                this.setState({
                    current_password: '',
                    password: '',
                    password_confirmation: '',
                    loading: false
                })
                toast.success('Password changed successfully');
            })
            .catch(err => {
                this.setState({errors: JSON.parse(err), loading: false});
            })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-sm-10">
                    <Form {...formLayout} onFinish={this.onResetPassword}>
                        <Form.Item
                            label='Current Password'
                            hasFeedback
                            validateStatus={this.state.errors.current_password ? 'error' : ''}
                            help={this.state.errors.current_password ?? ''}
                            style={{
                                marginBottom: 1
                            }}
                        >
                            <Input.Password
                                placeholder="Enter Current Password"
                                name="current_password"
                                value={this.state.current_password}
                                onChange={this.onChange}
                                iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                id="error"
                            />
                        </Form.Item>
                        <Form.Item
                            label='New Password'
                            hasFeedback
                            validateStatus={this.state.errors.password ? 'error' : ''}
                            help={this.state.errors.password ?? ''}
                            style={{
                                marginBottom: 1
                            }}
                        >
                            <Input.Password
                                placeholder="Enter New Password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                id="error"
                            />
                        </Form.Item>
                        <Form.Item
                            label='New Password Confirmation'
                            hasFeedback
                            validateStatus={this.state.errors.password_confirmation ? 'error' : ''}
                            help={this.state.errors.password_confirmation ?? ''}
                            style={{
                                marginBottom: 1
                            }}
                        >
                            <Input.Password
                                placeholder="Enter New Password Confirmation"
                                name="password_confirmation"
                                value={this.state.password_confirmation}
                                onChange={this.onChange}
                                iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                id="error"
                            />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={this.state.loading}
                                className="ant-btn ant-btn-success mt-2">
                            Change Password
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

ChangePassword.propTypes = {
    resetPassword: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({})

export default connect(mapStateToProps, {resetPassword})(ChangePassword);
