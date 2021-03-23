import React, {Component} from 'react';
import {Button, Table, Tag} from "antd";
import {Link} from "react-router-dom";
import {getRoles, showRoleForm} from "../../actions/role/roleActions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import RoleForm from "./RoleForm";


class Role extends Component {
    constructor(props) {
        super(props);

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
                render: (e) => <Link to='' className="ant-dropdown-link" onClick={(e) => this.editRole(e)}>Edit</Link>
            },
        ]

        this.editRole = this.editRole.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this)
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

    editRole(event) {
        event.preventDefault()
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
                <RoleForm />
            </>
        );
    }
}

Role.propTypes = {
    getRoles: PropTypes.func.isRequired,
    showRoleForm: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    roles: state.roles
})

export default withRouter(connect(mapStateToProps,{getRoles,showRoleForm})(Role));