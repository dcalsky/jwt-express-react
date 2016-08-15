import React from 'react'


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
        console.log(e)
    }

    render() {
        return (
            <div>
            <form onSubmit={::this.handleFormSubmit}>
                <input type="text" onChange={::this.handleChangeUsername} placeholder="Username" />
                <input type="text" onChange={::this.handleChangePassword} placeholder="Password" />
                <button type="submit">Submit</button>
            </form>
            </div>
        )
    }
}