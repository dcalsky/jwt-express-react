import React from 'react'
import request from './utils/auth.js'

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: null,
            password: null,
            token: null
        }
    }
    handleChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    handleChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    handleLoginSubmit(e) {
        e.preventDefault()
        request({
            method: 'POST',
            url: 'http://localhost:3000/api/user/login',
            body: {
                username: this.state.username,
                password: this.state.password
            },
            success: (err, res) => {
                const {token, username} = res.body
                localStorage.setItem('username', username)
                localStorage.setItem('token', token)
                this.setState({
                    token: token
                })
            }
        })
    }
    handleLoginOut() {
        this.setState({
            token: null,
            username: null,
            password: null
        })
        localStorage.setItem('token', null)
        localStorage.setItem('username', null)
    }
    handleRegisterSubmit(e) {
        e.preventDefault()
        request({
            method: 'POST',
            url: 'http://localhost:3000/api/user/register',
            body: {
                username: this.state.username,
                password: this.state.password,
            },
            success: (err, res) => {
                const {token, username} = res.body
                localStorage.setItem('username', username)
                localStorage.setItem('token', token)
                this.setState({
                    token: token
                })
            }
        })
    }
    handleAction1() {
        request({
            method: 'POST',
            url: 'http://localhost:3000/api/user/action1',
            auth: `Bearer ${localStorage.getItem('token')}`,
            success: (err, res) => {
                console.log(res.body)
            }
        })
    }
    handleAction2() {
        request({
            method: 'POST',
            url: 'http://localhost:3000/api/user/action2',
            auth: `Bearer ${localStorage.getItem('token')}`,
            success: (err, res) => {
                console.log(res.body)
            }
        })
    }
    render() {
        return (
            <div>
                <p>登陆</p>
            <form onSubmit={::this.handleLoginSubmit}>
                <input type="text" onChange={::this.handleChangeUsername} placeholder="Username" />
                <input type="text" onChange={::this.handleChangePassword} placeholder="Password" />
                <button type="submit">Login</button>
            </form>
                <button onClick={::this.handleLoginOut}>Logout</button>
                <p>注册</p>
                <form onSubmit={::this.handleRegisterSubmit}>
                    <input type="text" onChange={::this.handleChangeUsername} placeholder="Username" />
                    <input type="text" onChange={::this.handleChangePassword} placeholder="Password" />
                    <button type="submit">Register</button>
                </form>
                <p>token: {this.state.token}</p>
                <button onClick={::this.handleAction1}>user action1</button>
                <button onClick={::this.handleAction2}>admin action2</button>
            </div>
        )
    }
}