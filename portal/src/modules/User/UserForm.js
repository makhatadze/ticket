import React,{Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {closeUserForm, createUser} from "../../actions/user/userActions";
import {Button, Form, Input, Modal, Select} from "antd";
import isEmpty from "../../core/validation/is-empty";
import formLayout from "../../core/config/formLayout";

class UserForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            username: '',
            active: '',
            password: '',
            password_confirmation: '',
            role: '',
            permissions: [],
            errors: {},
            loading: false
        }
    }

    render() {
        const {roles, showUserForm} = this.props.users;
        const {Option} = Select;

        return (
            <Modal footer={null}
                   title={this.state.id ? `Update - ${showUserForm.modalUser.name}` : 'Create Role'}
                   visible={showUserForm.show}
                   maskClosable={false} onCancel={this.closeRoleForm}>
                <Form {...formLayout} onFinish={this.onSubmit}>
                    <Form.Item
                        label='Name'
                        hasFeedback
                        validateStatus={this.state.errors.name ? 'error' : ''}
                        help={this.state.errors.name ?? ''}
                        style={{
                            marginBottom: 1
                        }}
                    >
                        <Input placeholder="Enter Name" name="name" value={this.state.name}
                               onChange={this.setName} id="error"/>
                    </Form.Item>
                    <Form.Item
                        label='Slug'
                        hasFeedback
                        validateStatus={this.state.errors.slug ? 'error' : ''}
                        help={this.state.errors.slug ?? ''}
                        style={{
                            marginBottom: 1
                        }}
                    >
                        <Input placeholder="Enter name and auto generate" name="slug" value={this.state.slug}
                               id="error"/>
                    </Form.Item>
                    <Form.Item
                        label='Permissions'
                        hasFeedback
                        validateStatus={this.state.errors.permissions ? 'error' : ''}
                        help={this.state.errors.permissions ?? ''}
                        style={{
                            marginBottom: 1
                        }}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            size="default"
                            placeholder="Please select"
                            defaultValue={this.state.permissions}
                            onChange={this.handleChange}
                            style={{width: '100%'}}
                            value={this.state.permissions}
                        >
                            {selectPermissions}
                        </Select>
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={this.state.loading}
                            className="ant-btn ant-btn-success mt-2">
                        {this.state.id ? 'Update' : 'Create'}
                    </Button>
                </Form>
            </Modal>
        )
    }
}


UserForm.prototype = {
    createUser: PropTypes.func.isRequired,
    closeUserForm: PropTypes.func.isRequired
}

const mapStateToProps = state =>({
    users: state.users
})

export default connect(mapStateToProps,{
    createUser,
    closeUserForm
})(UserForm);
