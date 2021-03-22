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
import queryString from "querystring";
import isEmpty from "../../core/validation/is-empty";

class IpRestriction extends Component {
    constructor(props) {
        super(props);
        this.handleTableChange = this.handleTableChange.bind(this)
        this.editIpRestriction = this.editIpRestriction.bind(this)
        this.showIpRestriction = this.showIpRestriction.bind(this)
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
            current: pagination.current
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

    render() {
        const {data, searchParams} = this.props.ipRestrictions;

        return (
            <>

                <Button className="mb-4" type="primary" onClick={() => this.props.showIpRestrictionForm()}>Create
                    Ip</Button>
                <Button className="mb-4 ml-2" type="primary"
                        onClick={() => this.props.showIpRestrictionFilter()}>Filter</Button>
                <Table
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={data}
                    pagination={searchParams}
                    loading={false}
                    onChange={this.handleTableChange}
                />
                <IpRestrictionForm/>
                <IpRestrictionView/>
                <IpRestrictionFilter/>
            </>
        );
    }
}

IpRestriction.propTypes = {
    getIpRestrictions: Proptypes.func.isRequired,
    showIpRestrictionForm: Proptypes.func.isRequired,
    showIpRestrictionView: Proptypes.func.isRequired,
    showIpRestrictionFilter: Proptypes.func.isRequired,
    setIpRestrictionSearchQuery: Proptypes.func.isRequired
}

const mapStateToProps = state => ({
    ipRestrictions: state.ipRestrictions
})

export default withRouter(connect(mapStateToProps,
    {
        getIpRestrictions,
        showIpRestrictionForm,
        showIpRestrictionView,
        showIpRestrictionFilter,
        setIpRestrictionSearchQuery
    })(IpRestriction))