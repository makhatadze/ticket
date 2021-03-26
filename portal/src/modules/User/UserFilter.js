import React, {Component} from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {closeUserFilter, setUserSearchQuery} from "../../actions/user/userActions";
import queryString from "querystring";
import {Button, Form, Input, Radio, Modal, DatePicker} from "antd";
import formLayout from "../../core/config/formLayout";
import moment from "moment/moment";
import isEmpty from "../../core/validation/is-empty";

class UserFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            active: '',
            username: '',
            start_time: '',
            end_time: '',
            errors: {}
        }

        this.resetFilter = this.resetFilter.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.changeStartTime = this.changeStartTime.bind(this);
        this.changeEndTime = this.changeEndTime.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users.searchQuery !== this.props.users.searchQuery) {
            let {searchQuery} = this.props.users;
            let query = queryString.parse(searchQuery);
            this.setState({
                id: query.id,
                name: query.name,
                username: query.username,
                active: query.active,
                start_time: query.start_time,
                end_time: query.end_time,
                errors: {}
            })
        }
    }

    onSubmit() {
        let data = {
            id: this.state.id,
            name: this.state.name,
            username: this.state.username,
            active: this.state.active,
            start_time: this.state.start_time,
            end_time: this.state.end_time
        }
        this.props.setUserSearchQuery(data)
        this.props.closeUserFilter()
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeStartTime(value, dateString) {
        this.setState({
            start_time: dateString
        })
    }

    changeEndTime(value, dateString) {
        this.setState({
            end_time: dateString
        })
    }

    resetFilter() {
        let data = {
            id: '',
            name: '',
            username: '',
            start_time: '',
            end_time: ''
        }
        this.setState({...data})
        this.props.setUserSearchQuery(data)
        this.props.closeUserFilter()
    }

    render() {
        const {searchParams, showUserFilter} = this.props.users

        return (
            <>
                <Modal footer={null}
                       title='Filter'
                       visible={showUserFilter}
                       maskClosable={false} onCancel={() => this.props.closeUserFilter()}>
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
                            label='Username'
                            hasFeedback
                            validateStatus={this.state.errors.username ? 'error' : ''}
                            help={this.state.errors.username ?? ''}
                            style={{
                                marginBottom: 1
                            }}
                        >
                            <Input placeholder="Enter UserName" name="username" value={this.state.username}
                                   onChange={this.onChange} id="error"/>
                        </Form.Item>
                        <Form.Item
                            label='Status'>
                            <Radio.Group value={this.state.active} name="active" onChange={this.onChange}>
                                <Radio.Button value="">All</Radio.Button>
                                <Radio.Button value="1">Active</Radio.Button>
                                <Radio.Button value="0">Block</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <div className="row mb-2">
                            <div className="col">
                                <div className="form-outline d-flex flex-column">
                                    <label className="form-label">Start Time</label>
                                    <DatePicker
                                        allowClear={false}
                                        name="start_time"
                                        value={this.state.start_time !== '' ? moment(this.state.start_time, "YYYY/MM/DD") : ''}
                                        onChange={this.changeStartTime}
                                        onOk={this.changeStartTime}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-outline d-flex flex-column">
                                    <label className="form-label">End Time</label>
                                    <DatePicker
                                        name="start_time"
                                        value={this.state.end_time !== '' ? moment(this.state.end_time, "YYYY/MM/DD") : ''}
                                        onChange={this.changeEndTime}
                                        onOk={this.changeEndTime}
                                    />
                                </div>
                            </div>
                        </div>
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

UserFilter.propTypes = {
    setUserSearchQuery: PropTypes.func.isRequired,
    closeUserFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps, {
    setUserSearchQuery,
    closeUserFilter
})(UserFilter)