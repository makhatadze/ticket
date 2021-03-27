import React, {Component} from "react";
import * as Proptypes from "prop-types";
import {connect} from "react-redux";
import {
    deleteUser,
    getUserById,
    getUsers,
    setUserFormLoading, setUserSearchQuery, showUserFilter,
    showUserForm,
    showUserView
} from "../../actions/user/userActions";
import {Alert, Button, Space, Table, Tag} from "antd";
import {Link} from "react-router-dom";
import './User.scss';
import isEmpty from "../../core/validation/is-empty";
import {getRolePermissions} from "../../actions/role/roleActions";
import UserForm from "./UserForm";
import UserView from "./UserView";
import Modal from "antd/es/modal/Modal";
import {toast} from "react-toastify";
import UserFilter from "./UserFilter";
import Export from "../../components/Export/Export";

class User extends Component {
    constructor(props) {
        super(props);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.editUser = this.editUser.bind(this);
        this.showUser = this.showUser.bind(this);
        this.showUserForm = this.showUserForm.bind(this);
        this.showDeleteUser = this.showDeleteUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.onExportKeyChange = this.onExportKeyChange.bind(this);
        this.state = {
            showDeleteConfirm: false,
            deleteUser: {},
            selectedRowKeys: [],
            exportKeys : [
                {
                    key: 'id',
                    checked: true
                },
                {
                    key: 'name',
                    checked: true
                },
                {
                    key: 'username',
                    checked: true
                },
                {
                    key: 'created_at',
                    checked: true
                },
                {
                    key: 'created_by',
                    checked: true
                },
                {
                    key: 'updated_at',
                    checked: true
                },
                {
                    key: 'updated_by',
                    checked: true
                }

            ]
        }
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
                dataIndex: 'active',
                sorter: true,
                render: active => <>
                    {(active) ? (
                        <Tag color="green" key={active}>
                            Active
                        </Tag>
                    ) : (
                        <Tag color="volcano" key={active}>
                            Block
                        </Tag>
                    )}
                </>
            },
            {
                title: 'User Name',
                dataIndex: 'username',
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (element) => <>
                    <Space size="middle">
                        <Link to='' className="ant-dropdown-link"
                              onClick={(event) => this.showUser(event, element)}>Show</Link>
                        <Link to='' className="ant-dropdown-link"
                              onClick={(event) => this.editUser(event, element)}>Edit</Link>
                        <Link to='' className="ant-dropdown-link"
                              onClick={(event) => this.showDeleteUser(event, element)}>Delete</Link>
                    </Space>
                </>

            }
        ]
    }

    componentDidMount() {
        this.props.getUsers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users.searchQuery !== this.props.users.searchQuery) {
            this.props.getUsers()
        }
    }

    async deleteUser() {
        !isEmpty(this.state.deleteUser) ?
            await deleteUser(this.state.deleteUser.id)
                .then(res => {
                    this.props.getUsers();
                    toast.success(`${res.data.name} - Deleted`);
                    this.setState({showDeleteConfirm: false, deleteUser: {}})
                })
                .catch(err => console.log(err))
            : '';
    }

    showDeleteUser(event, data) {
        event.preventDefault();
        this.setState({showDeleteConfirm: true, deleteUser: data})
    }

    handleTableChange(pagination, filters, sorter) {
        this.setState({selectedRowKeys: []})
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
        this.props.setUserSearchQuery(data)

    }

    async showUser(event, data) {
        event.preventDefault();
        await getUserById(data.id)
            .then(res => {
                this.props.showUserView(res.data)
            })
            .catch(err => console.log(err))
    }

    editUser(event, data) {
        event.preventDefault()
        this.showUserForm(data)
    }

    onExportKeyChange(value,event) {
        this.setState({
            exportKeys: this.state.exportKeys.map(el => el.key === event.target.name ? {key: el.key, checked: !el.checked} : el)
        })
    }

    async showUserForm(data = {}) {
        this.props.setUserFormLoading();
        if (isEmpty(data)) {
            await getRolePermissions()
                .then(res => {
                    this.props.showUserForm({roles: res.data})
                })
                .catch(err => console.log(err))
        } else if (data.id !== undefined) {
            await getUserById(data.id, '?roles-permissions=true')
                .then(res => this.props.showUserForm(res.data))
                .catch(err => console.log(err))
        }
    }



    render() {
        const {data, searchParams} = this.props.users;
        return (
            <div className="users">
                <div className="row mb-4 action-container">
                    <div className="col">
                        <Button type="primary" onClick={() => this.showUserForm()}>Create User</Button>
                        <Button type="primary"
                                onClick={() => this.props.showUserFilter()}>Filter</Button>
                        <Button type="primary"
                                onClick={() => window.print()}>{isEmpty(this.state.selectedRowKeys) ? 'Export Filter' : 'Export Checked'}</Button>
                        <Button type="primary"
                                onClick={() => window.print()}>Export All</Button>
                        <Button type="primary"
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
                <UserForm/>
                <UserView/>
                <UserFilter />
                <Export
                    title='Users Export'
                    show={true}
                    exportKeys={this.state.exportKeys}
                    onSubmit={() => console.log('Submit')}
                    onCancel={() => console.log('Cancel')}
                    onChange={this.onExportKeyChange}
                />
                <Modal
                    title="Delete user"
                    maskClosable={false}
                    visible={this.state.showDeleteConfirm}
                    onOk={this.deleteUser}
                    onCancel={() => this.setState({showDeleteConfirm: false, deleteUser: {}})}
                    okText="Delete"
                    cancelText="Cancel"
                >
                    {isEmpty(this.state.deleteUser) ? '' : (
                        <Alert message={`Are you sure? you want to delete - ${this.state.deleteUser.name}`}
                               type="warning" showIcon/>
                    )}
                </Modal>
            </div>
        )
    }
}

User.propTypes = {
    getUsers: Proptypes.func.isRequired,
    showUserForm: Proptypes.func.isRequired,
    setUserFormLoading: Proptypes.func.isRequired,
    showUserView: Proptypes.func.isRequired,
    setUserSearchQuery: Proptypes.func.isRequired,
    showUserFilter: Proptypes.func.isRequired,
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps, {
    getUsers,
    showUserForm,
    setUserFormLoading,
    showUserView,
    setUserSearchQuery,
    showUserFilter
})(User);
