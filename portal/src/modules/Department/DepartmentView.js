import React, {Component} from "react";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import isEmpty from "../../core/validation/is-empty";
import {Collapse, Modal, Tag} from "antd";
import {closeDepartmentView} from "../../actions/department/departmentActions";
import {DEPARTMENT_TYPES} from "../../actions/department/departmentTypes";

class DepartmentView extends Component {

    render() {
        const {showDepartmentView} = this.props.departments;
        const {Panel} = Collapse;

        let content;
        if (isEmpty(showDepartmentView.modalDepartment)) {
            content = <></>
        } else {
            let heads = showDepartmentView.modalDepartment.heads.map((head) => (
                <Tag className="mb-1" color="green" key={head.id}>
                    {head.name}
                </Tag>
            ))
            let members = showDepartmentView.modalDepartment.members.map((member) => (
                <Tag className="mb-1" color="green" key={member.id}>
                    {member.name}
                </Tag>
            ))
            content = (
                <Modal footer={null}
                       title='Show'
                       visible={showDepartmentView.show}
                       maskClosable={false} onCancel={this.props.closeDepartmentView}>
                    <p>ID: {showDepartmentView.modalDepartment.id}</p>
                    <p>Name: {showDepartmentView.modalDepartment.name}</p>
                    <p>Type: {DEPARTMENT_TYPES[showDepartmentView.modalDepartment.type]}</p>
                    <Collapse>
                        <Panel key="1" header="Created">
                            <p>{showDepartmentView.modalDepartment.createdBy.name}</p>
                            <p>{showDepartmentView.modalDepartment.createdAt}</p>
                        </Panel>
                        <Panel key="2" header="Updated">
                            <p>{showDepartmentView.modalDepartment.updatedBy.name}</p>
                            <p>{showDepartmentView.modalDepartment.updatedAt}</p>
                        </Panel>
                        <Panel key="3" header="Heads">
                            {heads}
                        </Panel>
                        <Panel key="4" header="Member">
                            {members}
                        </Panel>
                    </Collapse>
                </Modal>
            )
        }
        return (
            <>
                {content}
            </>
        )
    }
}

DepartmentView.propTypes = {
    closeDepartmentView: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    departments: state.departments
})

export default connect(mapStateToProps, {closeDepartmentView})(DepartmentView);