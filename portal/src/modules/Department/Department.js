import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getDepartments} from "../../actions/department/departmentActions";
import {Button, Table} from "antd";

class Department extends Component {
    constructor(props) {
        super(props);
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