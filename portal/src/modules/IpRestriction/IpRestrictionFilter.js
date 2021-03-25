import React, {Component} from "react";
import {Button, Form, Input, Modal, Switch} from "antd";
import {
    closeIpRestrictionFilter,
    setIpRestrictionSearchQuery
} from "../../actions/ip-restriction/ipRestrictionActions";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import isEmpty from "../../core/validation/is-empty";
import queryString from "querystring";
import formLayout from "../../core/config/formLayout";

class IpRestrictionFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            ip: '',
            errors: {},
            loading: false
        }

        this.resetFilter = this.resetFilter.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.closeIpRestrictionFilter = this.closeIpRestrictionFilter.bind(this)

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.ipRestrictions.searchQuery !== this.props.ipRestrictions.searchQuery) {
            let {searchQuery} = this.props.ipRestrictions;
            let query = queryString.parse(searchQuery);
            this.setState({
                id: query.id,
                name: query.name,
                ip: query.ip
            })


        }
    }

    onSubmit() {
        let data = {
            id: this.state.id,
            name: this.state.name,
            ip: this.state.ip
        }
        this.props.setIpRestrictionSearchQuery(data)
        this.closeIpRestrictionFilter()
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
            ip: ''
        }
        this.setState({...data})
        this.props.setIpRestrictionSearchQuery(data)
        this.closeIpRestrictionFilter()
    }

    closeIpRestrictionFilter() {
        this.props.closeIpRestrictionFilter()
    }

    render() {
        const {searchParams, showIpRestrictionFilter} = this.props.ipRestrictions
        return (
            <>
                <Modal footer={null}
                       title='Filter'
                       visible={showIpRestrictionFilter}
                       maskClosable={false} onCancel={this.closeIpRestrictionFilter}>
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
                            label='Ip Address'
                            hasFeedback
                            validateStatus={this.state.errors.ip ? 'error' : ''}
                            help={this.state.errors.ip ?? ''}
                            style={{
                                marginBottom: 1
                            }}
                        >
                            <Input placeholder="Enter Ip Address" name="ip" value={this.state.ip}
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

IpRestrictionFilter.propTypes = {
    setIpRestrictionSearchQuery: PropTypes.func.isRequired,
    closeIpRestrictionFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    ipRestrictions: state.ipRestrictions
})

export default connect(mapStateToProps,
    {
        setIpRestrictionSearchQuery,
        closeIpRestrictionFilter
    })
(IpRestrictionFilter)