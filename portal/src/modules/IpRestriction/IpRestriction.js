import React, {Component} from 'react';
import * as Proptypes from "prop-types";
import {connect} from "react-redux";
import {
    getIpRestrictionByIp,
    getIpRestrictions,
    showIpRestrictionForm
} from "../../actions/ip-restriction/ipRestrictionActions";
import {Button, Table, Tag} from "antd";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
import IpRestrictionForm from "./IpRestrictionForm";
import {toast} from "react-toastify";

class IpRestriction extends Component {
    constructor(props) {
        super(props);
        this.handleTableChange = this.handleTableChange.bind(this)
        this.editIpRestriction = this.editIpRestriction.bind(this)
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
                dataIndex: 'status',
                sorter: true,
                render: status => <>
                    {(status) ? (
                        <Tag color="green" key={status}>
                            Active
                        </Tag>
                    ) : (
                        <Tag color="volcano" key={status}>
                            Block
                        </Tag>
                    )}
                </>
            },
            {
                title: 'Ip Address',
                dataIndex: 'ip',
            },
            {
                title: 'Action',
                dataIndex: '',
                key: 'x',
                render: (element) => <Link to='' className="ant-dropdown-link"
                                           onClick={(event) => this.editIpRestriction(event, element)}>Edit</Link>

            }
        ]
    }

    componentDidMount() {
        this.props.getIpRestrictions();
    }

    handleTableChange(pagination, filters, sorter) {
        console.log('Filter IpRestrictions')
    }

    async editIpRestriction(event, data) {
        event.preventDefault()
        await getIpRestrictionByIp(data.id)
            .then(res => this.props.showIpRestrictionForm(res.data))
            .catch(err => toast.error(err.response.data.message))

    }

    render() {
        const {data, searchParams} = this.props.ipRestrictions;

        return (
            <>

                <Button className="mb-4" type="primary" onClick={() => this.props.showIpRestrictionForm()}>Create
                    Ip</Button>
                <Table
                    columns={this.columns}
                    rowKey={record => record.id}
                    dataSource={data}
                    pagination={searchParams}
                    loading={false}
                    onChange={this.handleTableChange}
                />
                <IpRestrictionForm/>
            </>
        );
    }
}

IpRestriction.propTypes = {
    getIpRestrictions: Proptypes.func.isRequired,
    showIpRestrictionForm: Proptypes.func.isRequired,
}

const mapStateToProps = state => ({
    ipRestrictions: state.ipRestrictions
})

export default withRouter(connect(mapStateToProps,
    {
        getIpRestrictions,
        showIpRestrictionForm
    })(IpRestriction))