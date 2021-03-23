import React, {Component} from "react";
import {Button, Form, Input, Modal, Select, Switch} from "antd";
import slugify from "slugify";
import PropTypes from "prop-types";
import {closeRoleForm, createRole, getRoles} from "../../actions/role/roleActions";
import {connect} from "react-redux";
import formLayout from "../../core/config/formLayout";
import isEmpty from "../../core/validation/is-empty";
import {toast} from "react-toastify";

class RoleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            slug: '',
            permissions: [],
            errors: {},
            loading: false
        }


        this.setName = this.setName.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.closeRoleForm = this.closeRoleForm.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.roles.showRoleForm.modalRole !== this.props.roles.showRoleForm.modalRole) {
            const {modalRole} = this.props.roles.showRoleForm;
            if (!isEmpty(modalRole)) {
                console.log(modalRole)
            }
        }
    }

    async onSubmit() {
        const data = {
            name: this.state.name,
            slug: this.state.slug,
            permissions: this.state.permissions
        }
        this.setState({loading: true})
        if (this.state.id !== null) {

        } else {
            await this.props.createRole(data)
                .then(res => {
                    toast.success(`${res.data.name} - Created`);
                    this.setState({loading: false})
                    this.closeRoleForm()
                })
                .catch(err => {
                    toast.error('Can not created.')
                    this.setState({errors: JSON.parse(err.response.data.errors), loading: false})
                })
        }
    }

    // set name and slugify slug by name
    setName(e) {
        this.setState({
            name: e.target.value,
            slug: slugify(e.target.value)
        })
    }

    // permissions change event
    handleChange(value) {
        this.setState({permissions: value})
    }

    // Close role form.
    closeRoleForm() {
        this.setState({
            id: null,
            name: '',
            slug: '',
            permissions: [],
            errors: {},
            loading: false
        })
        this.props.closeRoleForm()
    }


    render() {
        const {permissions, showRoleForm} = this.props.roles;
        const {Option} = Select;

        const selectPermissions = [];

        permissions.forEach(el => {
            selectPermissions.push(<Option key={el.id} value={el.id}>
                {el.name}
            </Option>)
        })

        return (
            <Modal footer={null}
                   title={this.state.id ? `Update - ${showRoleForm.modalRole.name}` : 'Create Role'}
                   visible={showRoleForm.show}
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
                            size="default"
                            placeholder="Please select"
                            defaultValue={this.state.permissions}
                            onChange={this.handleChange}
                            style={{width: '100%'}}
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

RoleForm.propTypes = {
    createRole: PropTypes.func.isRequired,
    closeRoleForm: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    roles: state.roles
})

export default connect(mapStateToProps, {createRole, closeRoleForm})(RoleForm)