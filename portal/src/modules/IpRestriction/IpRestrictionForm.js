import React, {Component} from "react";
import {Button, Form, Input, Modal, Space, Switch} from "antd";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    closeIpRestrictionForm,
    createIpRestriction,
    setUpdateIpRestriction, updateIpRestriction
} from "../../actions/ip-restriction/ipRestrictionActions";
import {toast} from "react-toastify";
import isEmpty from "../../core/validation/is-empty";
import formLayout from "../../core/config/formLayout";


class IpRestrictionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            ip: '',
            status: true,
            errors: {},
            loading: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.closeIpRestrictionForm = this.closeIpRestrictionForm.bind(this)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.ipRestrictions.showIpRestrictionForm.modalIp !== this.props.ipRestrictions.showIpRestrictionForm.modalIp) {
            const {modalIp} = this.props.ipRestrictions.showIpRestrictionForm;
            if (!isEmpty(modalIp)) {
                this.setState({id: modalIp.id, name: modalIp.name, ip: modalIp.ip, status: modalIp.status})
            }
        }
    }

    async onSubmit() {
        const data = {
            name: this.state.name,
            ip: this.state.ip,
            status: this.state.status
        }
        this.setState({loading: true})

        if (this.state.id !== null) {
            await updateIpRestriction(this.state.id,data)
                .then(res => {
                    this.props.setUpdateIpRestriction(res.data)
                    toast.success(`${res.data.ip} - Updated.`);
                    this.setState({loading: false})
                    this.closeIpRestrictionForm()
                })
                .catch(err => {
                    toast.error('Can not updated.')
                    this.setState({errors: JSON.parse(err.response.data.errors), loading: false})
                })
        } else {
            await this.props.createIpRestriction(data)
                .then(res => {
                    console.log(res)
                    toast.success(`${res.data.ip} - Created.`);
                    this.setState({loading: false})
                    this.closeIpRestrictionForm()
                })
                .catch(err => {
                    toast.error('Can not created.')
                    this.setState({errors: JSON.parse(err.response.data.errors), loading: false})
                })
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    closeIpRestrictionForm() {
        this.setState({
            id: null,
            name: '',
            ip: '',
            status: true,
            errors: {},
            loading: false
        })
        this.props.closeIpRestrictionForm();
    }

    render() {
        const {showIpRestrictionForm} = this.props.ipRestrictions
        const {ip} = this.state
        return (
            <>
                <Modal footer={null}
                       title={this.state.id ? `Update - ${showIpRestrictionForm.modalIp.ip}` : 'Create Ip'}
                       visible={showIpRestrictionForm.show}
                       maskClosable={false} onCancel={this.closeIpRestrictionForm}>
                    <Form {...formLayout} onFinish={this.onSubmit}>
                        <Form.Item
                            label='Name'
                            hasFeedback
                            validateStatus={this.state.errors.name ? 'error' : ''}
                            help={this.state.errors.name ?? ''}
                            style={{
                                marginBottom: 1
                            }}
                        >
                            <Input placeholder="Enter Name" name="name" value={this.state.name}
                                   onChange={this.onChange} id="error"/>
                        </Form.Item>
                        <Form.Item
                            label='Ip Address'
                            hasFeedback
                            validateStatus={this.state.errors.ip ? 'error' : ''}
                            help={this.state.errors.ip ?? ''}
                            style={{
                                marginBottom: 1
                            }}
                        >
                            <Input placeholder="Enter Ip Address" name="ip" value={this.state.ip}
                                   onChange={this.onChange} id="error"/>
                        </Form.Item>
                        <Form.Item name="switch"
                                   label="Status"
                                   valuePropName="checked"
                        >
                            <Switch defaultChecked={this.state.status} name="status" onChange={() => this.setState({
                                status: event.target.value
                            })}/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={this.state.loading}
                                className="ant-btn ant-btn-success mt-2">
                            {this.state.id ? 'Update' : 'Create'}
                        </Button>
                    </Form>
                </Modal>
            </>
        )
    }
}

IpRestrictionForm.propTypes = {
    createIpRestriction: PropTypes.func.isRequired,
    closeIpRestrictionForm: PropTypes.func.isRequired,
    setUpdateIpRestriction: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    ipRestrictions: state.ipRestrictions
})
export default connect(mapStateToProps,
    {
        createIpRestriction,
        closeIpRestrictionForm,
        setUpdateIpRestriction
    })
(IpRestrictionForm)