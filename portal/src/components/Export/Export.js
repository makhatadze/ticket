import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Button, Col,Row, Form, Input, Modal, Switch} from "antd";
import formLayout from "../../core/config/formLayout";
import generateTitle from "../../core/generate/generateTitle";

const Export = ({
                    title,
                    show,
                    exportKeys,
                    onSubmit,
                    onChange,
                    onCancel
                }) => {
    const switchKeys = [];
    exportKeys.forEach((item, key) => {
        switchKeys.push(
            <Col span={12} key={item.key}>
                <Form.Item name={item.key}
                           key={key}
                           label={generateTitle(item.key)}
                >
                    <Switch checked={item.checked}
                            name={item.key}
                            onChange={onChange}
                    />
                </Form.Item>
            </Col>
        )
    })

    return (
        <Modal footer={null}
               title={title}
               visible={show}
               maskClosable={false} onCancel={onCancel}>
            <Form {...formLayout} className="ant-advanced-search-form" onFinish={onSubmit}>
                <Row gutter={24}>
                    {switchKeys}
                </Row>
                <Button type="primary" htmlType="submit"
                        className="ant-btn ant-btn-success mt-2">
                    Export
                </Button>
            </Form>
        </Modal>
    );
};

Export.propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool,
    exportKeys: PropTypes.array,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

Export.defaultProps = {
    title: 'Export',
    show: false
};

export default Export;
