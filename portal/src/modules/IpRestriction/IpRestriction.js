import React, {Component} from 'react';
import * as Proptypes from "prop-types";
import {connect} from "react-redux";
import {
    getIpRestrictionByIp,
    getIpRestrictions, setIpRestrictionSearchQuery, showIpRestrictionFilter,
    showIpRestrictionForm, showIpRestrictionView
} from "../../actions/ip-restriction/ipRestrictionActions";
import {Button, Space, Table, Tag} from "antd";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import IpRestrictionForm from "./IpRestrictionForm";
import {toast} from "react-toastify";
import IpRestrictionView from "./IpRestrictionView";
import IpRestrictionFilter from "./IpRestrictionFilter";
import isEmpty from "../../core/validation/is-empty";
import './IpRestriction.scss';
import {EXPORT_ALL, EXPORT_FILTER, EXPORT_IDS} from "../../actions/export/exportTypes";
import {closeExportModal, exportData, showExportModal} from "../../actions/export/exportActions";
import Export from "../../components/Export/Export";

class IpRestriction extends Component {
    constructor(props) {
        super(props);
        this.handleTableChange = this.handleTableChange.bind(this)
        this.editIpRestriction = this.editIpRestriction.bind(this)
        this.showIpRestriction = this.showIpRestriction.bind(this)
        this.exportSubmit = this.exportSubmit.bind(this)
        this.onExportKeyChange = this.onExportKeyChange.bind(this)
        this.showExportModal = this.showExportModal.bind(this)
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                sorter: true,
            }, {
                title: 'Name',
                dataIndex: 'name',
                sorter: true
            }, {
                title: 'Status',
                dataIndex: 'status',
                sorter: true,
                render: status => <>
                    {(status) ? (
                        <Tag color="green" key={status}>
                            Active
                        </Tag>
                    ) : (
                        <Tag color="volcano" key={status}>
                            Block
                        </Tag>
                    )}
                </>
            },
            {
                title: 'Ip Address',
                dataIndex: 'ip',
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (element) => <>
                    <Space size="middle">
                        <Link to='' className="ant-dropdown-link"
                              onClick={(event) => this.showIpRestriction(event, element)}>Show</Link>
                        <Link to='' className="ant-dropdown-link"
                              onClick={(event) => this.editIpRestriction(event, element)}>Edit</Link>
                    </Space>
                </>

            }
        ]
        this.state = {
            selectedRowKeys: [],
            exportKeys: [
                {
                    key: 'id',
                    checked: true
                },
                {
                    key: 'name',
                    checked: true
                },
                {
                    key: 'ip',
                    checked: true
                },
                {
                    key: 'status',
                    checked: true
                },
                {
                    key: 'created_at',
                    checked: true
                },
                {
                    key: 'updated_at',
                    checked: true
                },
                {
                    key: 'created_by',
                    checked: true
                },
                {
                    key: 'updated_by',
                    checked: true
                },
            ]
        }
    }

    componentDidMount() {
        this.props.getIpRestrictions();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.ipRestrictions.searchQuery !== this.props.ipRestrictions.searchQuery) {
            this.props.getIpRestrictions()
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
        this.props.setIpRestrictionSearchQuery(data)

    }

    async showIpRestriction(event, data) {
        event.preventDefault();
        await getIpRestrictionByIp(data.id)
            .then(res => this.props.showIpRestrictionView(res.data))
            .catch(err => toast.error(err.response.data.message))
    }

    async editIpRestriction(event, data) {
        event.preventDefault()
        await getIpRestrictionByIp(data.id)
            .then(res => this.props.showIpRestrictionForm(res.data))
            .catch(err => toast.error(err.response.data.message))

    }

    exportSubmit() {
        let keysArray = [];
        this.state.exportKeys.forEach(el => el.checked ? keysArray.push(el.key) : '');
        isEmpty(keysArray) ? toast.error('Keys are empty.') : this.props.exportData(keysArray)
    }

    onExportKeyChange(value, event) {
        this.setState({
            exportKeys: this.state.exportKeys.map(el => el.key === event.target.name ? {
                key: el.key,
                checked: !el.checked
            } : el)
        })
    }

    showExportModal(type = EXPORT_ALL) {

        let payload = {
            title: `Export IpRestrictions - `,
            show: false,
            module: 'ip-restriction',
            type: type,
            searchQuery: this.props.ipRestrictions.searchQuery,
            ids: this.state.selectedRowKeys
        }
        this.props.showExportModal(type, payload)
    }

    render() {
        const {data, searchParams,searchQuery} = this.props.ipRestrictions;

        return (
            <div className="ip-restriction">
                <div className="row mb-4 action-container">
                    <div className="col">
                        <Button type="primary" onClick={() => this.props.showIpRestrictionForm()}>Create
                            Ip</Button>
                        <Button className="ml-2" type="primary"
                                onClick={() => this.props.showIpRestrictionFilter()}>Filter</Button>
                        {(!isEmpty(searchQuery) || !isEmpty(this.state.selectedRowKeys)) ? (
                            <Button type="primary"
                                    onClick={() => {
                                        isEmpty(this.state.selectedRowKeys) ?
                                            this.showExportModal(EXPORT_FILTER) : this.showExportModal(EXPORT_IDS)
                                    }}>{isEmpty(this.state.selectedRowKeys)
                                ? 'Export Filter' : 'Export Checked'}</Button>
                        ) : (
                            ''
                        )}
                        <Button type="primary"
                                onClick={() => this.showExportModal(EXPORT_ALL)}>Export All</Button>
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
                    rowSelection={{
                        type: "checkbox",
                        onChange: (selectedRowKeys, selectedRows) => this.setState({selectedRowKeys: selectedRowKeys}),
                        selectedRowKeys: this.state.selectedRowKeys
                    }}
                />
                <IpRestrictionForm/>
                <IpRestrictionView/>
                <IpRestrictionFilter/>
                <Export
                    title={this.props.export.title}
                    show={this.props.export.show}
                    exportKeys={this.state.exportKeys}
                    loading={this.props.export.loading}
                    onSubmit={this.exportSubmit}
                    onCancel={this.props.closeExportModal}
                    onChange={this.onExportKeyChange}
                />
            </div>
        );
    }
}

IpRestriction.propTypes = {
    getIpRestrictions: Proptypes.func.isRequired,
    showIpRestrictionForm: Proptypes.func.isRequired,
    showIpRestrictionView: Proptypes.func.isRequired,
    showIpRestrictionFilter: Proptypes.func.isRequired,
    setIpRestrictionSearchQuery: Proptypes.func.isRequired,
    showExportModal: Proptypes.func.isRequired,
    closeExportModal: Proptypes.func.isRequired,
    exportData: Proptypes.func.isRequired,
}

const mapStateToProps = state => ({
    ipRestrictions: state.ipRestrictions,
    export: state.export
})

export default withRouter(connect(mapStateToProps, {
    getIpRestrictions,
    showIpRestrictionForm,
    showIpRestrictionView,
    showIpRestrictionFilter,
    setIpRestrictionSearchQuery,
    showExportModal,
    closeExportModal,
    exportData,
})(IpRestriction))
