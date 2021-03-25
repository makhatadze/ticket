import React, {Component} from "react";
import * as Proptypes from "prop-types";
import {connect} from "react-redux";
import {getUsers, showUserForm} from "../../actions/user/userActions";
import { Space, Table, Tag} from "antd";
import {Link} from "react-router-dom";

class User extends Component {
    constructor(props) {
        super(props);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.editUser = this.editUser.bind(this);
        this.showUser = this.showUser.bind(this);
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

    handleTableChange(pagination, filters, sorter) {
        console.log('pagination')
        // let data = {
        //     current: pagination.current,
        //     sort: 'id',
        //     order: 'desc'
        // }
        // if (!isEmpty(sorter)) {
        //     if (sorter.order) {
        //         data = {
        //             ...data,
        //             sort: sorter.field,
        //             order: (sorter.order === 'ascend') ? 'asc' : 'desc'
        //         }
        //     }
        // }
        // this.props.setIpRestrictionSearchQuery(data)

    }

    async showUser(event, data) {
        event.preventDefault();
        console.log(data)
    }

    async editUser(event, data) {
        event.preventDefault()
        console.log(data)

    }

    render() {
        const {data, searchParams} = this.props.users;
        return (
            <div className="users">
                <div className="row mb-4 action-container">
                    {/*<div className="col-sm-6 col-lg-8 action-column-left">*/}
                    {/*    <Button type="primary" onClick={() => this.props.showIpRestrictionForm()}>Create*/}
                    {/*        Ip</Button>*/}
                    {/*    <Button className="ml-2" type="primary"*/}
                    {/*            onClick={() => this.props.showIpRestrictionFilter()}>Filter</Button>*/}
                    {/*</div>*/}
                    {/*<div className="col-6 col-lg-4 action-column-right">*/}
                    {/*    <Button className="ml-2" type="primary"*/}
                    {/*            onClick={() => window.print()}>Print</Button>*/}
                    {/*</div>*/}
                </div>
                <Table
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={data}
                    pagination={searchParams}
                    loading={searchParams.loading}
                    onChange={this.handleTableChange}
                />
            </div>
        )
    }
}

User.propTypes = {
    getUsers: Proptypes.func.isRequired,
    showUserForm: Proptypes.func.isRequired,
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps, {
    getUsers,
    showUserForm,
})(User);
