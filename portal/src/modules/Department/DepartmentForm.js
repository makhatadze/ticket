import React, {Component} from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import isEmpty from "../../core/validation/is-empty";
import {Button, Form, Input, Modal, Select, Switch} from "antd";
import Spinner from "../../components/Spinner/Spinner";
import formLayout from "../../core/config/formLayout";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";


class DepartmentForm extends Component{
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
            headsArray : [],
            membersArray : [],
        }
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
                        heads: modalDepartment.heads.map((el) => el.id),
                        members: modalDepartment.members.map((el) => el.id),
                    })
                }
            }
        }
    }
    changeHeads(heads) {
        let {modalDepartment} = this.props.departments.showDepartmentForm;
        this.setState({heads: heads})

    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {showDepartmentForm} = this.props.departments;
        const {Option} = Select;

        const selectHeads = [];

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

}

const mapStateToProps = state => ({
    departments: state.departments
})

export default connect(mapStateToProps,{

})(DepartmentForm);