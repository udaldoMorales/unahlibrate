import React, {useState} from "react";
import { Form, Input, Button, Checkbox, Row,Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './style.css';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const FormLogin = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (

    <Form className='loginForm'
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
       style={{backgroundColor:"red", alignSelf: "center",justifyContent: "stretch" }}
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input style={{borderRadius:8, height: 50, alignSelf:"center", }} type="email" />
      </Form.Item>

     
      <Form.Item
      className="inputs"
     
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
        style={{borderRadius: 8, height:50}}
          type="password"
          placeholder="&#x1f512; Password"
        />
      </Form.Item>

      <Form.Item >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLogin