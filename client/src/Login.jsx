import React from "react";
import request from "./utils/request";

const initialState = {
  username: null,
  password: null,
  token: null,
  message: null
};

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }
  handleChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  handleChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  // success: username, token
  // error: code, message
  handleLoginSubmit(e) {
    e.preventDefault();
    request({
      method: "POST",
      url: "/api/user/login",
      body: {
        username: this.state.username,
        password: this.state.password
      },
      success: (err, res) => {
        const { token, username, message } = res.body;
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
        this.setState({
          token: token,
          message: message
        });
      }
    });
  }
  handleLoginOut() {
    this.setState({
      token: null,
      username: null,
      password: null
    });
    localStorage.setItem("token", null);
    localStorage.setItem("username", null);
  }
  // success: username, token
  // error: code, message
  handleRegisterSubmit(e) {
    e.preventDefault();
    request({
      method: "POST",
      url: "/api/user/register",
      body: {
        username: this.state.username,
        password: this.state.password
      },
      success: (err, res) => {
        if (err) {
          throw err;
        } else {
          const { token, username, message } = res.body;
          localStorage.setItem("username", username);
          localStorage.setItem("token", token);
          this.setState({
            token: token,
            message: message
          });
        }
      }
    });
  }
  // success: content
  // error: code, message
  handleAction1() {
    request({
      method: "POST",
      url: "/api/user/action1",
      auth: `Bearer ${localStorage.getItem("token")}`,
      success: (err, res) => {
        console.log(res);
        const { message } = res.body;
        this.setState({
          message: message
        });
      }
    });
  }
  // success: content
  // error: code, message
  handleAction2() {
    request({
      method: "POST",
      url: "/api/user/action2",
      auth: `Bearer ${localStorage.getItem("token")}`,
      success: (err, res) => {
        console.log(res.body);
        const { message } = res.body;
        this.setState({
          message: message
        });
      }
    });
  }
  render() {
    return (
      <div className="login1">
        <p>登陆</p>
        <form onSubmit={::this.handleLoginSubmit}>
          <input
            type="text"
            onChange={::this.handleChangeUsername}
            placeholder="Username"
          />
          <input
            type="password"
            onChange={::this.handleChangePassword}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
        <button onClick={::this.handleLoginOut}>Logout</button>
        <p>注册</p>
        <form onSubmit={::this.handleRegisterSubmit}>
          <input
            type="text"
            onChange={::this.handleChangeUsername}
            placeholder="Username"
          />
          <input
            type="password"
            onChange={::this.handleChangePassword}
            placeholder="Password"
          />
          <button type="submit">Register</button>
        </form>
        <p>token: {this.state.token}</p>
        <p>message: {this.state.message}</p>
        <button onClick={::this.handleAction1}>user action1</button>
        <button onClick={::this.handleAction2}>admin action2</button>
      </div>
    );
  }
}
