import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getDepartments} from "../../actions/department/departmentActions";
import {Button, Space, Table, Tag} from "antd";
import {Link} from "react-router-dom";
import {DEPARTMENT_TYPES} from "../../actions/department/departmentTypes";

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
                              onClick={(event) => console.log('show')}>Show</Link>
                        <Link to='' className="ant-dropdown-link"
                              onClick={(event) => console.log('edit')}>Edit</Link>
                    </Space>
                </>
            },
        ]

    }

    componentDidMount() {
        this.props.getDepartments();
    }

    render() {
        const {data, searchParams} = this.props.departments

        return (
            <div className="department">
                <div className="row mb-4 action-container">
                    <div className="col">
                        <Button type="primary" onClick={() => console.log('show Form')}>Create Role</Button>
                        <Button className="ml-2" type="primary"
                                onClick={() => console.log('show filter')}>Filter</Button>
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
            </div>
        )
    }
}

Department.propTypes = {
    getDepartments: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    departments: state.departments
})

export default connect(mapStateToProps, {
    getDepartments
})(Department)