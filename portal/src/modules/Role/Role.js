import React, {Component} from 'react';
import {Button, Space, Table, Tag} from "antd";
import {Link} from "react-router-dom";
import {getRoleByIp, getRoles, showRoleForm, showRoleView} from "../../actions/role/roleActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import RoleForm from "./RoleForm";
import {toast} from "react-toastify";
import RoleView from "./RoleView";


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
        console.log('Filter')
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
            <>
                <Button className="mb-4" type="primary" onClick={() => this.props.showRoleForm()}>Create Role</Button>
                <Table
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={data}
                    pagination={searchParams}
                    loading={false}
                    onChange={this.handleTableChange}
                />
                <RoleForm/>
                <RoleView/>
            </>
        );
    }
}

Role.propTypes = {
    getRoles: PropTypes.func.isRequired,
    showRoleForm: PropTypes.func.isRequired,
    showRoleView: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    roles: state.roles
})

export default withRouter(connect(mapStateToProps,
    {
        getRoles,
        showRoleForm,
        showRoleView
    })
(Role));