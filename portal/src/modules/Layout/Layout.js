import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {withRouter} from "react-router";
import {getCurrentProfile} from "../../actions/profile/profileActions";
import isEmpty from "../../core/validation/is-empty";
import Spinner from "../../components/Spinner/Spinner";
import CHeader from "../../components/Header/Header";
import Sider from "antd/es/layout/Sider";
import Layout, {Content, Footer} from "antd/es/layout/layout";
import './Layout.scss';
import NavLeft from "../../components/NavLeft/NavLeft";

class CLayout extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
        this.props.getCurrentProfile()
    }

    render() {
        const {currentProfile, loading} = this.props.profile
        let layoutContent;
        if (isEmpty(currentProfile) || loading) {
            layoutContent = <Spinner/>
        } else {
            // Check if logged in user has profile data
            if (!isEmpty(currentProfile)) {
                layoutContent = (
                    <>
                        <Layout className="layout-wrapper">
                            <Sider className="nav" trigger={null} collapsible collapsed={this.props.layout.collapsed}>
                                <NavLeft/>
                            </Sider>
                            <Layout className="main-wrapper">
                                <CHeader/>
                                <Content className="content">
                                    {this.props.children}
                                </Content>
                                <Footer className="footer">
                                    <p>Copyright © 2021</p>
                                </Footer>
                            </Layout>
                        </Layout>
                    </>
                )
            } else {
                // User is logged in but has no profile
                layoutContent = (
                    <div>
                        <p>Copyright © 2021</p>
                    </div>
                );
            }
        }
        return (
            <>
                {layoutContent}
            </>
        )
    }
}


CLayout.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth,
    layout: state.layout,
});

export default withRouter(connect(mapStateToProps,{getCurrentProfile})(CLayout));