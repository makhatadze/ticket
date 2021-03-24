import React, {Component} from "react";
import * as Proptypes from "prop-types";
import {connect} from "react-redux";
import {closeRoleView} from "../../actions/role/roleActions";
import isEmpty from "../../core/validation/is-empty";
import {Collapse, Modal, Tag} from "antd";


const {Panel} = Collapse;

class RoleView extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const {showRoleView} = this.props.roles
        let content;
        if (isEmpty(showRoleView.modalRole)) {
            content = <></>
        } else {
            let permissions = showRoleView.modalRole.permissions.map((permission) => (
                <Tag className="mb-1" color="blue" key={permission.id}>
                    {permission.name}
                </Tag>
            ))
            content = (
                <Modal footer={null}
                       title={showRoleView.modalRole.name}
                       visible={showRoleView.show}
                       maskClosable={false} onCancel={() => this.props.closeRoleView()}>
                    <p>ID: {showRoleView.modalRole.id}</p>
                    <p>Name: {showRoleView.modalRole.name}</p>
                    <p>IP: {showRoleView.modalRole.ip}</p>
                    {permissions}
                    <Collapse>
                        {(!isEmpty(showRoleView.modalRole.createdBy) && showRoleView.modalRole.createdAt) ? (
                            <Panel key="1" header="Created">
                                <p>{showRoleView.modalRole.createdBy.name}</p>
                                <p>{showRoleView.modalRole.createdAt}</p>
                            </Panel>

                        ) : ''}
                        {(!isEmpty(showRoleView.modalRole.updatedBy) && showRoleView.modalRole.updatedAt) ?
                            <Panel key="2" header="Updated">
                                <p>{showRoleView.modalRole.updatedBy.name}</p>
                                <p>{showRoleView.modalRole.updatedAt}</p>
                            </Panel>
                            : ''}
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


RoleView.propTypes = {
    closeRoleView: Proptypes.func.isRequired
}

const mapStateToProps = state => ({
    roles: state.roles
})

export default connect(mapStateToProps, {
    closeRoleView
})(RoleView)