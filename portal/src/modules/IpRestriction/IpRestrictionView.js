import React, {Component} from "react";
import {Button, Form, Input, Modal, Switch, Collapse, Tag} from "antd";
import * as PropTypes from "prop-types";
import {closeIpRestrictionView} from "../../actions/ip-restriction/ipRestrictionActions";
import {connect} from "react-redux";
import isEmpty from "../../core/validation/is-empty";

const {Panel} = Collapse;

class IpRestrictionView extends Component {
    constructor(props) {
        super(props);
        this.closeIpRestrictionView = this.closeIpRestrictionView.bind(this)
    }

    closeIpRestrictionView() {
        this.props.closeIpRestrictionView();
    }


    render() {
        const {showIpRestrictionView} = this.props.ipRestrictions;

        let content;
        if (isEmpty(showIpRestrictionView.modalIp)) {
            content = <></>
        } else {
            content = (
                <Modal footer={null}
                       title='Show'
                       visible={showIpRestrictionView.show}
                       maskClosable={false} onCancel={this.closeIpRestrictionView}>
                    <p>ID: {showIpRestrictionView.modalIp.id}</p>
                    <p>Name: {showIpRestrictionView.modalIp.name}</p>
                    <p>IP: {showIpRestrictionView.modalIp.ip}</p>
                    <p>Status: {' '}
                        {(showIpRestrictionView.modalIp.status) ? (
                            <Tag color="green" key={status}>
                                Active
                            </Tag>
                        ) : (
                            <Tag color="volcano" key={status}>
                                Block
                            </Tag>
                        )}
                    </p>
                    <Collapse>
                        <Panel key="1" header="Created">
                            <p>{showIpRestrictionView.modalIp.createdBy.name}</p>
                            <p>{showIpRestrictionView.modalIp.createdAt}</p>
                        </Panel>
                        <Panel key="2" header="Updated">
                            <p>{showIpRestrictionView.modalIp.updatedBy.name}</p>
                            <p>{showIpRestrictionView.modalIp.updatedAt}</p></Panel>
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

IpRestrictionView.propTypes = {
    closeIpRestrictionView: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    ipRestrictions: state.ipRestrictions
})

export default connect(mapStateToProps, {closeIpRestrictionView})(IpRestrictionView);