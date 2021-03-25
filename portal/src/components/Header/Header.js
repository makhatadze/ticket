import React, {Component} from 'react';
import {Layout, Menu, Modal, Popover} from 'antd';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import {logoutUser} from "../../actions/auth/authActions";
import {sliderToggle} from "../../actions/layout/layoutActions";
import "./Header.scss";
import Avatar from "antd/es/avatar/avatar";

const {Header} = Layout;
const {Item} = Menu;

class CHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            layout: {}
        };

        this.toggle = this.toggle.bind(this);
        this.menuClick = this.menuClick.bind(this);

    }

    componentDidMount() {
        this.setState({layout: this.props.layout});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.layout) {
            this.setState({layout: nextProps.layout});
        }
    }

    toggle() {
        this.props.sliderToggle(!this.state.layout.collapsed);
    }

    menuClick({key}) {
        if (key === 'logout') {
            this.props.logoutUser();
        }
        if (key ==='profile') {
            this.props.history.push('profile')
        }
    }


    render() {
        const {layout} = this.state;
        const {currentProfile} = this.props.profile;
        return (
            <Header className="header">
                {layout.collapsed ? (
                        <MenuUnfoldOutlined className="trigger" onClick={this.toggle}/>
                    )
                    : (
                        <MenuFoldOutlined className="trigger" onClick={this.toggle}/>
                    )}
                <Popover content={
                    <>
                        <Menu selectable={false} onClick={this.menuClick}>
                            <Item key="profile">profile</Item>
                        </Menu>
                        <Menu selectable={false} onClick={this.menuClick}>
                            <Item key="logout">logout</Item>
                        </Menu>
                    </>
                }
                         placement="bottom"
                         trigger="hover"
                >
                    <span className="user">hi，{currentProfile.user.name}</span>
                    {/*<Avatar src={require('./../../assets/author.jpg')}></Avatar>*/}
                </Popover>
            </Header>
        )
    }
}

CHeader.propTypes = {
    sliderToggle: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    layout: state.layout,
    profile: state.profile
});


export default connect(mapStateToProps, {sliderToggle, logoutUser})(withRouter(CHeader))