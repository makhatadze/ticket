import React, {Component} from 'react';
import {Button, Space, Table, Tag} from "antd";
import {Link} from "react-router-dom";
import {
    getRoleByIp,
    getRoles,
    setRoleSearchQuery,
    showRoleFilter,
    showRoleForm,
    showRoleView
} from "../../actions/role/roleActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import RoleForm from "./RoleForm";
import {toast} from "react-toastify";
import RoleView from "./RoleView";
import RoleFilter from "./RoleFilter";
import isEmpty from "../../core/validation/is-empty";
import './Role.scss';

class Role extends Component {
    constructor(props) {
        super(props);


        this.editRole = this.editRole.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this)
        this.showRole = this.showRole.bind(this)
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                sorter: true,
            },
            {
                title: 'Name',
                dataIndex: 'name',
                sorter: true,
            },
            {
                title: 'Permissions',
                dataIndex: 'permissions',
                render: permissions =>
                    <>
                        {permissions.map((permission, item) => (
                            <Tag className="mb-1" color="blue" key={permission.id}>
                                {permission.name}
                            </Tag>
                        ))}
                    </>,
                maxWidth: '40%'

            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (element) => <>
                    <Space size="middle">
                        <Link to='' className="ant-dropdown-link"
                              onClick={(event) => this.showRole(event, element)}>Show</Link>
                        <Link to='' className="ant-dropdown-link"
                              onClick={(event) => this.editRole(event, element)}>Edit</Link>
                    </Space>
                </>
            },
        ]

    }

    componentDidMount() {
        let {searchQuery} = this.props.roles
        this.props.getRoles(searchQuery);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.roles.searchQuery !== this.props.roles.searchQuery) {
            this.props.getRoles()
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

    // Show edit role modal
    async editRole(event, data) {
        event.preventDefault()
        await getRoleByIp(data.id)
            .then(res => this.props.showRoleForm(res.data))
            .catch(err => toast.error(err.response.data.message))
    }

    // Show view modal
    async showRole(event, data) {
        event.preventDefault();
        await getRoleByIp(data.id)
            .then(res => this.props.showRoleView(res.data))
            .catch(err => toast.error(err.response.data.message))
    }

    render() {
        const {data, searchParams} = this.props.roles
        return (
            <div className="role">
                <div className="row mb-4 action-container">
                    <div className="col-sm-6 col-lg-8 action-column-left">
                        <Button type="primary" onClick={() => this.props.showRoleForm()}>Create Role</Button>
                        <Button className="ml-2" type="primary"
                                onClick={() => this.props.showRoleFilter()}>Filter</Button>
                    </div>
                    <div className="col-6 col-lg-4 action-column-right">
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
        );
    }
}

Role.propTypes = {
    getRoles: PropTypes.func.isRequired,
    showRoleForm: PropTypes.func.isRequired,
    showRoleView: PropTypes.func.isRequired,
    showRoleFilter: PropTypes.func.isRequired,
    setRoleSearchQuery: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    roles: state.roles
})

export default withRouter(connect(mapStateToProps,
    {
        getRoles,
        showRoleForm,
        showRoleView,
        showRoleFilter,
        setRoleSearchQuery
    })
(Role));
