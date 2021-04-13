import React, {Component} from "react";
import {connect} from "react-redux";
import isEmpty from "../../core/validation/is-empty";
import Spinner from "../../components/Spinner/Spinner";
import * as PropTypes from "prop-types";
import {closeUserForm, createUser, setUpdateUser, updateUser} from "../../actions/user/userActions";
import {Button, Form, Input, Modal, Select, Switch} from "antd";
import formLayout from "../../core/config/formLayout";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {toast} from "react-toastify";

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)
        this.changeRole = this.changeRole.bind(this)
        this.changePermission = this.changePermission.bind(this)
        this.closeUserForm = this.closeUserForm.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            id: null,
            name: '',
            username: '',
            active: true,
            password: '',
            password_confirmation: '',
            role: '',
            permissions: [],
            errors: {},
            loading: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users.showUserForm.modalUser !== this.props.users.showUserForm.modalUser) {
            const {modalUser} = this.props.users.showUserForm;
            if (!isEmpty(modalUser)) {
                if (modalUser.id !== undefined) {
                    console.log(modalUser)
                    this.setState({
                        id: modalUser.id,
                        name: modalUser.name,
                        username: modalUser.username,
                        active: modalUser.active,
                        role: modalUser.role !== null ? modalUser.role.id : '',
                        permissions: modalUser.permissions.map((el) => el.id)
                    })
                }
            }
        }
    }

    async onSubmit() {
        const data = {
            name: this.state.name,
            username: this.state.username,
            active: this.state.active,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
            role: this.state.role,
            permissions: this.state.permissions
        }
        this.setState({loading: true, errors: {}})
        if (this.state.id !== null) {
            await updateUser(this.state.id,data)
                .then(res => {
                    this.props.setUpdateUser(res.data);
                    toast.success(`${res.data.name} - Updated.`)
                    this.closeUserForm();
                })
                .catch(err => {
                    toast.error('Can not updated.');
                    this.setState({errors: JSON.parse(err.response.data.errors), loading: false})
                })
        } else {
            await this.props.createUser(data)
                .then(res => {
                    toast.success(`${res.data.name} - Created`);
                    this.closeUserForm();
                })
                .catch(err => {
                    toast.error('Can not created.')
                    this.setState({errors: JSON.parse(err.response.data.errors), loading: false})
                })
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeRole(role) {
        let {modalUser} = this.props.users.showUserForm;
        let permissions = [];
        if (!isEmpty(modalUser.role)) {
            if (modalUser.role.id === role) {
                permissions = modalUser.permissions.map(el => el.id)
            }
        }
        this.setState({role: role, permissions: permissions})
    }

    changePermission(permissionsArray) {
        this.setState({permissions: permissionsArray})
    }

    closeUserForm() {
        this.setState({
            id: null,
            name: '',
            username: '',
            active: true,
            password: '',
            password_confirmation: '',
            role: '',
            permissions: [],
            errors: {},
            loading: false
        });
        this.props.closeUserForm();
    }

    render() {
        const {showUserForm} = this.props.users;
        const {Option} = Select;

        const selectRoles = [];
        const selectPermissions = [];

        let content;
        if (showUserForm.loading || isEmpty(showUserForm.modalUser)) {
            content = (
                <Spinner/>
            )
        } else {
            showUserForm.modalUser.roles.forEach(el => {
                selectRoles.push(<Option key={el.id} value={el.id}>
                    {el.name}
                </Option>)
                if (el.id === this.state.role) {
                    el.permissions.forEach(permission => {
                        selectPermissions.push(<Option key={permission.id} value={permission.id}>
                            {permission.name}
                        </Option>)
                    })
                }
            })
            content = (
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
                               onChange={this.onChange} id="error"/>
                    </Form.Item>
                    <Form.Item
                        label='Username'
                        hasFeedback
                        validateStatus={this.state.errors.username ? 'error' : ''}
                        help={this.state.errors.username ?? ''}
                        style={{
                            marginBottom: 1
                        }}
                    >
                        <Input placeholder="Enter Username" name="username" value={this.state.username}
                               onChange={this.onChange} id="error"/>
                    </Form.Item>
                    <Form.Item
                        label='Password'
                        extra={this.state.id ? 'If you want to change password, enter password and password confirmation': ''}
                        hasFeedback
                        validateStatus={this.state.errors.password ? 'error' : ''}
                        help={this.state.errors.password ?? ''}
                        style={{
                            marginBottom: 1
                        }}
                    >
                        <Input.Password
                            placeholder="Enter Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                            id="error"
                        />
                    </Form.Item>
                    <Form.Item
                        label='Password Confirmation'
                        hasFeedback
                        validateStatus={this.state.errors.password_confirmation ? 'error' : ''}
                        help={this.state.errors.password_confirmation ?? ''}
                        style={{
                            marginBottom: 1
                        }}
                    >
                        <Input.Password
                            placeholder="Enter Password"
                            name="password_confirmation"
                            value={this.state.password_confirmation}
                            onChange={this.onChange}
                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                            id="error"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Role"
                        hasFeedback
                        validateStatus={this.state.errors.role ? 'error' : ''}
                        help={this.state.errors.role ?? ''}
                        style={{
                            marginBottom: 1
                        }}
                    >
                        <Select
                            size="default"
                            allowClear
                            value={this.state.role}
                            onChange={this.changeRole}
                            style={{width: "100%"}}
                            placeholder="Select Role"
                        >
                            {selectRoles}
                        </Select>
                    </Form.Item>
                    {(this.state.role) ? (
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
                                onChange={this.changePermission}
                                style={{width: '100%'}}
                                value={this.state.permissions}
                            >
                                {selectPermissions}
                            </Select>
                        </Form.Item>
                    ) : ''}
                    <Form.Item name="switch"
                               label="Active"
                    >
                        <Switch checked={this.state.active} name="active"
                                onChange={() => this.setState({
                                    active: !this.state.active
                                })}
                        />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={this.state.loading}
                            className="ant-btn ant-btn-success mt-2">
                        {this.state.id ? 'Update' : 'Create'}
                    </Button>
                </Form>
            )
        }
        return (
            <>
                <Modal footer={null}
                       title={this.state.id ? `Update - ${showUserForm.modalUser.name}` : 'Create User'}
                       visible={showUserForm.show}
                       maskClosable={false} onCancel={this.closeUserForm}>
                    {content}
                </Modal>
            </>
        )
    }
}


UserForm.propTypes = {
    createUser: PropTypes.func.isRequired,
    closeUserForm: PropTypes.func.isRequired,
    setUpdateUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps, {
    createUser,
    closeUserForm,
    setUpdateUser
})(UserForm);
