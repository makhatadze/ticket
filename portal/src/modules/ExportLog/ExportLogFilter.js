import React, {Component} from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {closeExportLogFilter, setExportLogSearchQuery} from "../../actions/export-log/exportLogActions";
import {Button, DatePicker, Form, Input, Modal, Radio, Select} from "antd";
import formLayout from "../../core/config/formLayout";
import moment from "moment/moment";
import queryString from "querystring";
import {EXPORT_MODULES} from "../../actions/export-log/exportLogTypes";

class ExportLogFilter extends Component{
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.resetFilter = this.resetFilter.bind(this);
        this.onChange = this.onChange.bind(this);
        this.changeStartTime = this.changeStartTime.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeEndTime = this.changeEndTime.bind(this);
        this.state = {
            id: '',
            type: '',
            start_time: '',
            end_time: '',
            errors: {}
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.exportLog.searchQuery !== this.props.exportLog.searchQuery) {
            let {searchQuery} = this.props.exportLog;
            let query = queryString.parse(searchQuery);
            this.setState({
                id: query.id,
                type: query.type,
                start_time: query.start_time,
                end_time: query.end_time,
                errors: {}
            })
        }
    }

    onSubmit() {
        let data = {
            id: this.state.id,
            type: this.state.type,
            start_time: this.state.start_time,
            end_time: this.state.end_time
        }
        this.props.setExportLogSearchQuery(data)
        this.props.closeExportLogFilter()
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    changeType(type) {
        console.log(type)
        this.setState({type: type})
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
            type: '',
            start_time: '',
            end_time: ''
        }
        this.setState({...data})
        this.props.setExportLogSearchQuery(data)
        this.props.closeExportLogFilter()
    }

    render() {
        const {searchParams, showExportLogFilter} = this.props.exportLog;
        const {Option} = Select;
        const selectTypes = [];
        for (const [key, value] of Object.entries(EXPORT_MODULES)) {
            selectTypes.push(<Option key={key} value={key}>
                    {value}
                </Option>)
        }
        return (
            <>
                <Modal footer={null}
                       title='Filter'
                       visible={showExportLogFilter}
                       maskClosable={false} onCancel={() => this.props.closeExportLogFilter()}>
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
                                onChange={this.changeType}
                                style={{width: "100%"}}
                                placeholder="Select Role"
                            >
                                {selectTypes}
                            </Select>
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
                                        name="end_time"
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


ExportLogFilter.propTypes = {
    setExportLogSearchQuery: PropTypes.func.isRequired,
    closeExportLogFilter: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    exportLog: state.exportLog
})


export default connect(mapStateToProps,{
    setExportLogSearchQuery,
    closeExportLogFilter
})(ExportLogFilter)