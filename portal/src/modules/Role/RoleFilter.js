import React, {Component} from "react";
import {Button, Form, Input, Modal, Switch} from "antd";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import queryString from "querystring";
import formLayout from "../../core/config/formLayout";
import {closeRoleFilter, setRoleSearchQuery} from "../../actions/role/roleActions";

class RoleFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            errors: {},
            loading: false
        }

        this.resetFilter = this.resetFilter.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.roles.searchQuery !== this.props.roles.searchQuery) {
            let {searchQuery} = this.props.roles;
            let query = queryString.parse(searchQuery);
            this.setState({
                id: query.id,
                name: query.name,
            })
        }
    }

    onSubmit() {
        let data = {
            id: this.state.id,
            name: this.state.name
        }
        this.props.setRoleSearchQuery(data)
        this.props.closeRoleFilter()
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
        }
        this.setState({...data})
        this.props.setRoleSearchQuery(data)
        this.props.closeRoleFilter()
    }

    render() {
        const {searchParams, showRoleFilter} = this.props.roles
        return (
            <>
                <Modal footer={null}
                       title='Filter'
                       visible={showRoleFilter}
                       maskClosable={false} onCancel={() => this.props.closeRoleFilter()}>
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

RoleFilter.propTypes = {
    setRoleSearchQuery: PropTypes.func.isRequired,
    closeRoleFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    roles: state.roles
})

export default connect(mapStateToProps,
    {
        setRoleSearchQuery,
        closeRoleFilter
    })
(RoleFilter)