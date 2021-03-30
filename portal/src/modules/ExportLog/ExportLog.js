import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getExportLogs} from "../../actions/export-log/exportLogActions";
import {Button, Space, Table, Tag} from "antd";
import {Link} from "react-router-dom";
import {EXPORT_MODULES} from "../../actions/export-log/exportLogTypes";
import RoleForm from "../Role/RoleForm";
import RoleView from "../Role/RoleView";
import RoleFilter from "../Role/RoleFilter";
import isEmpty from "../../core/validation/is-empty";
const baseUrl = process.env.MIX_SITE_URL;

class ExportLog extends Component {
    constructor(props) {
        super(props);
        this.handleTableChange = this.handleTableChange.bind(this)
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                sorter: true,
            },
            {
                title: 'User',
                dataIndex: 'createdBy',
                sorter: false,
                render: element => (
                    <>{element.name}</>
                )
            },
            {
                title: 'Type',
                dataIndex: 'type',
                sorter: false,
                render: element => (
                    <>{EXPORT_MODULES[`${element}`]}</>
                )
            },
            {
                title: 'Action',
                dataIndex: 'file',
                key: 'x',
                render: (element) => <>
                    <Space size="middle">
                        <Link to="" onClick={(event => {
                            event.preventDefault();
                            location.href = `${baseUrl}/storage${element.path}`
                        })} className="ant-dropdown-link">Download</Link>
                    </Space>
                </>
            }
        ];
    }

    componentDidMount() {
        this.props.getExportLogs();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.exportLog.searchQuery !== this.props.exportLog.searchQuery) {
            this.props.getExportLogs()
        }
    }


    handleTableChange(pagination, filters, sorter) {
        let data = {
            current: pagination.current,
            sort: 'id',
            order: 'desc'
        }
        if (!isEmpty(sorter)) {
            if (sorter.order) {
                data = {
                    ...data,
                    sort: sorter.field,
                    order: (sorter.order === 'ascend') ? 'asc' : 'desc'
                }
            }
        }
        this.props.setRoleSearchQuery(data)
    }

    render() {
        const {data, searchParams} = this.props.exportLog;
        return (
            <div className="export-log">
                <div className="row mb-4 action-container">
                    <div className="col">
                        <Button className="ml-2" type="primary"
                                onClick={() => this.props.showRoleFilter()}>Filter</Button>
                        <Button className="ml-2" type="primary"
                                onClick={() => window.print()}>Print</Button>
                    </div>
                </div>
                <Table
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={data}
                    pagination={searchParams}
                    loading={searchParams.loading}
                    onChange={this.handleTableChange}
                />
                <RoleForm/>
                <RoleView/>
                <RoleFilter/>
            </div>
        )
    }
}


ExportLog.propTypes = {
    getExportLogs: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    exportLog: state.exportLog
})

export default connect(mapStateToProps, {
    getExportLogs
})(ExportLog)