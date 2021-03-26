import React, {Component} from "react";
import * as Proptypes from "prop-types";
import {connect} from "react-redux";
import {closeUserView} from "../../actions/user/userActions";
import isEmpty from "../../core/validation/is-empty";
import {Collapse, Modal, Tag} from "antd";

class UserView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {showUserView} = this.props.users
        let content;
        if (isEmpty(showUserView.modalUser)) {
            content = <></>
        } else {
            let permissions = showUserView.modalUser.permissions.map((permission) => (
                <Tag className="mb-1" color="blue" key={permission.id}>
                    {permission.name}
                </Tag>
            ))
            content = (
                <Modal footer={null}
                       title={showUserView.modalUser.name}
                       visible={showUserView.show}
                       maskClosable={false} onCancel={() => this.props.closeUserView()}>
                    <p>ID: {showUserView.modalUser.id}</p>
                    <p>Name: {showUserView.modalUser.name}</p>
                    <p>UserName: {showUserView.modalUser.username}</p>
                    <p>Status: {showUserView.modalUser.active ? (
                        <Tag color="green" key={showUserView.modalUser.id}>
                            Active
                        </Tag>
                    ) : (
                        <Tag color="volcano" key={showUserView.modalUser.id}>
                            Block
                        </Tag>
                    )
                    }</p>
                    <p>Created At: {showUserView.modalUser.created_at}</p>
                    <p>Updated At: {showUserView.modalUser.updated_at}</p>
                    <p>Role: {isEmpty(showUserView.modalUser.role) ? '' : (
                        <Tag color="magenta" key={showUserView.modalUser.role.id}>
                            {showUserView.modalUser.role.name}
                        </Tag>
                    )}
                    </p>
                    <p>Permissions: </p>
                    {permissions}
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

UserView.propTypes = {
    closeUserView: Proptypes.func.isRequired
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps, {
    closeUserView
})(UserView)