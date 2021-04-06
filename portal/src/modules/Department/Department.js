import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    getDepartmentById,
    getDepartments, setDepartmentFormLoading,
    setDepartmentSearchQuery,
    showDepartmentFilter, showDepartmentForm, showDepartmentView
} from "../../actions/department/departmentActions";
import {Button, Space, Table, Tag} from "antd";
import {Link} from "react-router-dom";
import {DEPARTMENT_TYPES} from "../../actions/department/departmentTypes";
import isEmpty from "../../core/validation/is-empty";
import DepartmentFilter from "./DepartmentFilter";
import {toast} from "react-toastify";
import DepartmentView from "./DepartmentView";
import {getAllUsers} from "../../actions/user/userActions";

class Department extends Component {
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
                title: 'Type',
                dataIndex: 'type',
                sorter: false,
                render: element => (
                    <>{DEPARTMENT_TYPES[element]}</>
                )
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (element) => <>
                    <Space size="middle">
                        <Link to='' className="ant-dropdown-link"
                              onClick={(event) => this.showDepartment(event, element)}>Show</Link>
                        <Link to='' className="ant-dropdown-link"
                              onClick={(event) => console.log('edit')}>Edit</Link>
                    </Space>
                </>
            },
        ]
        this.handleTableChange = this.handleTableChange.bind(this)
        this.showDepartmentForm = this.showDepartmentForm.bind(this)
    }

    componentDidMount() {
        this.props.getDepartments();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.departments.searchQuery !== this.props.departments.searchQuery) {
            this.props.getDepartments()
        }
    }

    async showDepartment(event, data) {
        event.preventDefault();
        await getDepartmentById(data.id)
            .then(res => this.props.showDepartmentView(res.data))
            .catch(err => toast.error(err.response.data.message))
    }

    async showDepartmentForm(data = {}) {
        this.props.setDepartmentFormLoading();
        getAllUsers()
            .then(res => {
                let usersObject = {'users': res.data};
                if (isEmpty(data)) {
                    this.props.showDepartmentForm({...usersObject})
                } else {
                    console.log('Edit')
                }
            })
            .catch(err => console.log(err))

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
        this.props.setDepartmentSearchQuery(data)
    }

    render() {
        const {data, searchParams} = this.props.departments

        return (
            <div className="department">
                <div className="row mb-4 action-container">
                    <div className="col">
                        <Button type="primary" onClick={() => this.showDepartmentForm()}>Create Department</Button>
                        <Button className="ml-2" type="primary"
                                onClick={() => this.props.showDepartmentFilter()}>Filter</Button>
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
                <DepartmentFilter/>
                <DepartmentView/>
            </div>
        )
    }
}

Department.propTypes = {
    getDepartments: PropTypes.func.isRequired,
    setDepartmentSearchQuery: PropTypes.func.isRequired,
    showDepartmentFilter: PropTypes.func.isRequired,
    showDepartmentView: PropTypes.func.isRequired,
    setDepartmentFormLoading: PropTypes.func.isRequired,
    showDepartmentForm: PropTypes.func.isRequired,

}

const mapStateToProps = state => ({
    departments: state.departments
})

export default connect(mapStateToProps, {
    getDepartments,
    setDepartmentSearchQuery,
    showDepartmentFilter,
    showDepartmentView,
    setDepartmentFormLoading,
    showDepartmentForm
})(Department)