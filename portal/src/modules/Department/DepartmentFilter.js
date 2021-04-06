import React, {Component} from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Form, Input, Modal, Select} from "antd";
import formLayout from "../../core/config/formLayout";
import {closeDepartmentFilter, setDepartmentSearchQuery} from "../../actions/department/departmentActions";

class DepartmentFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            type: '',
            errors: {},
            loading: false
        }

        this.resetFilter = this.resetFilter.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)

    }

    onSubmit() {
        let data = {
            id: this.state.id,
            name: this.state.name,
            type: this.state.type
        }
        this.props.setDepartmentSearchQuery(data)
        this.props.closeDepartmentFilter()
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    resetFilter() {
        let data = {
            id: '',
            name: '',
            type: ''
        }
        this.setState({...data})
        this.props.setDepartmentSearchQuery(data)
        this.props.closeDepartmentFilter()
    }

    render() {
        const {searchParams, showDepartmentFilter} = this.props.departments
        const {Option} = Select;

        return (
            <>
                <Modal footer={null}
                       title='Filter'
                       visible={showDepartmentFilter}
                       maskClosable={false} onCancel={() => this.props.closeDepartmentFilter()}>
                    <Form {...formLayout} onFinish={this.onSubmit}>
                        <Form.Item
                            label='ID'
                            hasFeedback
                            validateStatus={this.state.errors.id ? 'error' : ''}
                            help={this.state.errors.id ?? ''}
                            style={{
                                marginBottom: 1
                            }}
                        >
                            <Input placeholder="Enter ID" name="id" value={this.state.id}
                                   onChange={this.onChange} id="error"/>
                        </Form.Item>
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
                            label="Type"
                            hasFeedback
                            validateStatus={this.state.errors.type ? 'error' : ''}
                            help={this.state.errors.type ?? ''}
                            style={{
                                marginBottom: 1
                            }}
                        >
                            <Select
                                size="default"
                                allowClear
                                value={this.state.type}
                                onChange={(event,data) => this.setState({type: data.value})}
                                style={{width: "100%"}}
                                placeholder="Select Role"
                            >
                                <Option key="0" value="">All</Option>
                                <Option key="1" value="1">Default</Option>
                                <Option key="2" value="2">Group</Option>
                            </Select>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={searchParams.loading}
                                className="ant-btn ant-btn-success mt-2">
                            Search
                        </Button>
                        <Button type="primary" onClick={() => this.resetFilter()}
                                className="ant-btn ant-btn-success mt-2 ml-2">
                            Reset
                        </Button>
                    </Form>
                </Modal>
            </>
        )
    }
}

DepartmentFilter.propTypes = {
    closeDepartmentFilter: PropTypes.func.isRequired,
    setDepartmentSearchQuery: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    departments: state.departments
})

export default connect(
    mapStateToProps,
    {
        closeDepartmentFilter,
        setDepartmentSearchQuery
    }
)
(DepartmentFilter)

