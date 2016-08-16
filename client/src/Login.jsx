import React from 'react'
import request from './utils/auth.js'

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            username: null,
            password: null
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
    handleFormSubmit(e) {
        e.preventDefault()
        request({
            method: 'POST',
            url: 'http://localhost:3000/api/user/login',
            body: {
                username: this.state.username,
                password: this.state.password
            },
            success: (err, res) => {
                console.log(res.body)
                localStorage.setItem('token', res.body.token)
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
            <form onSubmit={::this.handleFormSubmit}>
                <input type="text" onChange={::this.handleChangeUsername} placeholder="Username" />
                <input type="text" onChange={::this.handleChangePassword} placeholder="Password" />
                <button type="submit">Submit</button>
            </form>
                <button onClick={::this.handleAction1}>action1</button>
                <button onClick={::this.handleAction2}>action2</button>
            </div>
        )
    }
}