/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  message,
  Card,
  Checkbox,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import axios from "axios";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Content } = Layout;

const SignIn = () => {
  const navigate = useHistory();

  const onFinish = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        values
      );
      console.log("Success:", response.data);
      localStorage.setItem("token", response.data.token);
      message.success("login successful!");
      navigate.push("/dashboard");
      // Optionally redirect to another page or clear the form here
    } catch (error) {
      console.error("Error:", error);
      message.error("Registration failed. Please try again.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div style={{padding:"0"}} className="layout-default ant-layout layout-sign-up">
        <Content className="p-0 main_container">
          <div className="signup_page">
            <div className="header_text">
              <div className="">
                <Title>Sign In</Title>
              </div>
            </div>
            <Card
              className="card-signup header-solid h-full ant-card pt-0"
              bordered="false"
            >
              <Form
                name="signin"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                className="signup-form"
              >
            
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input className="signup-input" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password className="signup-input" />
                </Form.Item>


                <Form.Item>
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                  >
                    SIGN UP
                  </Button>
                </Form.Item>
              </Form>
              {/* <p className="font-semibold text-muted text-center">
                Dont have an account?{" "}
                <Link to="/sign-up" className="font-bold text-dark">
                  Sign Up
                </Link>
              </p> */}
            </Card>
          </div>

        </Content>
      </div>
    </>
  );
};
export default SignIn;
