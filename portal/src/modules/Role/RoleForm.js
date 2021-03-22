import React, {Component} from "react";
import {Button, Form, Input, Modal, Select, Switch} from "antd";
import slugify from "slugify";
import PropTypes from "prop-types";
import {getRoles} from "../../actions/role/roleActions";
import {connect} from "react-redux";
import formLayout from "../../core/config/formLayout";

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
        this.handleChange= this.handleChange.bind(this)
        this.onSubmit= this.onSubmit.bind(this)
    }

    async onSubmit() {
    }

    setName(e) {
        this.setState({
            name: e.target.value,
            slug: slugify(e.target.value)
        })
    }

    handleChange(value) {
        this.setState({permissions: value})
    }

    render() {
        const {permissions} = this.props.roles;
        const { Option } = Select;

        const selectPermissions = [];

        permissions.forEach(el => {
            selectPermissions.push(<Option key={el.id} value={el.id}>
                {el.name}
            </Option>)
        })

        return (
            <Modal footer={null}
                   title='Create'
                   visible={true}
                   maskClosable={false} onCancel={this.closeIpRestrictionForm}>
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
                        <Input placeholder="" name="slug" value={this.state.slug} id="error"/>
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
    getRoles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    roles: state.roles
})

export default connect(mapStateToProps, {getRoles})(RoleForm)