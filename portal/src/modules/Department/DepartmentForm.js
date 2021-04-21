import React, {Component} from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import isEmpty from "../../core/validation/is-empty";
import {Button, Form, Input, Modal, Radio, Select, Switch} from "antd";
import Spinner from "../../components/Spinner/Spinner";
import formLayout from "../../core/config/formLayout";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {closeDepartmentForm, createDepartment} from "../../actions/department/departmentActions";
import {toast} from "react-toastify";


class DepartmentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            name: '',
            type: 1,
            heads: [],
            members: [],
            errors: {},
            loading: false,
        }

        this.changeHeads = this.changeHeads.bind(this);
        this.changeMembers = this.changeMembers.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.closeDepartmentForm = this.closeDepartmentForm.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.departments.showDepartmentForm.modalDepartment !== this.props.departments.showDepartmentForm.modalDepartment) {
            const {modalDepartment} = this.props.departments.showDepartmentForm;
            if (!isEmpty(modalDepartment)) {
                if (modalDepartment.id !== undefined) {
                    this.setState({
                        id: modalDepartment.id,
                        name: modalDepartment.name,
                        type: modalDepartment.type,
                        heads: modalDepartment.heads && modalDepartment.heads.map((el) => el.id),
                        members: modalDepartment.members && modalDepartment.members.map((el) => el.id),
                    })
                }
            }
        }
    }

    changeHeads(heads) {
        const members = this.state.members.filter(element => !heads.includes(element))
        this.setState({
            members: members,
            heads: heads
        })
    }

    changeMembers(members) {
        const heads = this.state.heads.filter(element => !members.includes(element))
        this.setState({
            members: members,
            heads: heads
        })
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    async onSubmit() {
        const data = {
            name: this.state.name,
            type: this.state.type,
            heads: this.state.heads,
            members: this.state.members
        }
        this.setState({
            loading: true,
            errors: {}
        });
        if (this.state.id !== null) {

        } else {
            this.props.createDepartment(data)
                .then(res => {
                    toast.success(`${res.data.name} - Created`);
                    this.closeDepartmentForm();
                })
                .catch(err => {
                    toast.error('Can not created.')
                    this.setState({errors: JSON.parse(err.response.data.errors), loading: false})
                })
        }
    }

    closeDepartmentForm() {
        this.setState({
            id: null,
            name: '',
            type: 1,
            heads: [],
            members: [],
            errors: {},
            loading: false,
        });
        this.props.closeDepartmentForm();
    }

    render() {
        const {showDepartmentForm} = this.props.departments;
        const {Option} = Select;

        const selectHeads = [];
        const selectMembers = [];
        let content;
        if (showDepartmentForm.loading || isEmpty(showDepartmentForm.modalDepartment)) {
            content = (
                <Spinner/>
            )
        } else {
            showDepartmentForm.modalDepartment.users.forEach(el => {
                selectHeads.push(<Option key={el.id} value={el.id}>
                    {el.name}
                </Option>)
                selectMembers.push(<Option key={el.id} value={el.id}>
                    {el.name}
                </Option>)
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
                        label='Type'>
                        <Radio.Group value={this.state.type} name="type" onChange={this.onChange}>
                            <Radio.Button value={1}>Default</Radio.Button>
                            <Radio.Button value={2}>Group</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="Heads"
                        hasFeedback
                        validateStatus={this.state.errors.heads ? 'error' : ''}
                        help={this.state.errors.heads ?? ''}
                        style={{
                            marginBottom: 1
                        }}
                    >
                        <Select
                            mode="multiple"
                            size="default"
                            allowClear
                            value={this.state.heads}
                            onChange={this.changeHeads}
                            style={{width: "100%"}}
                            placeholder="Select Heads"
                        >
                            {selectHeads}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Members"
                        hasFeedback
                        validateStatus={this.state.errors.members ? 'error' : ''}
                        help={this.state.errors.members ?? ''}
                        style={{
                            marginBottom: 1
                        }}
                    >
                        <Select
                            mode="multiple"
                            size="default"
                            allowClear
                            value={this.state.members}
                            onChange={this.changeMembers}
                            style={{width: "100%"}}
                            placeholder="Select Members"
                        >
                            {selectMembers}
                        </Select>
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
                       title={this.state.id ? `Update - ${showDepartmentForm.modalDepartment.name}` : 'Create Department'}
                       visible={showDepartmentForm.show}
                       maskClosable={false} onCancel={this.closeUserForm}>
                    {content}
                </Modal>
            </>
        )
    }
}

DepartmentForm.propTypes = {
    createDepartment: PropTypes.func.isRequired,
    closeDepartmentForm: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    departments: state.departments
})

export default connect(mapStateToProps, {
    createDepartment,
    closeDepartmentForm
})(DepartmentForm);