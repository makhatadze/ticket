import React, {Component} from "react";
import {connect} from "react-redux";
import * as PropTypes from "prop-types";
import isEmpty from "../../core/validation/is-empty";


class DepartmentForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            type: 1,
            heads: [],
            members: [],
            errors: {},
            loading: false
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.departments.showDepartmentForm.modalDepartment !== this.props.departments.showDepartmentForm.modalDepartment) {
            const {modalDepartment} = this.props.departments.showDepartmentForm;
            if (!isEmpty(modalDepartment)) {
                if (modalDepartment.id !== undefined) {
                    this.setState({
                        id: modalDepartment.id,
                        name: modalDepartment.name,
                        type: modalDepartment.type,
                        heads: modalDepartment.heads.map((el) => el.id),
                        members: modalDepartment.members.map((el) => el.id),
                    })
                }
            }
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <h1>12345</h1>
        )
    }
}

export default DepartmentForm;