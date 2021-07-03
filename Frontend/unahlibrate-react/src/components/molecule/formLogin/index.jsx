import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./style.css";
import "../../../styles/FormLog.css";
import "../../../styles/util.css";

const FormLogin = ({ valoresIniciales, actualizarEstado }) => {
  const onFinish = (values) => {
    actualizarEstado(values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={valoresIniciales}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        style={{ alignSelf: "center" }}
        name="correo"
        rules={[
          {
            required: true,
            message: "El correo es requerido",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          style={{ borderRadius: 8, height: 50, alignSelf: "center" }}
          type="email"
          placeholder="Correo"
        />
      </Form.Item>

      <Form.Item
        className="inputs"
        name="contrasenia"
        rules={[
          {
            required: true,
            message: "La contraseña es requerida",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          style={{ borderRadius: 8, height: 50 }}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>

      <Form.Item style={{ margin: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ margin: 0, height: 35, borderRadius: 8 }}
        >
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLogin;