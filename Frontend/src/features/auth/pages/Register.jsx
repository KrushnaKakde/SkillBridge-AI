import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import "../auth.form.scss"

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate("/")
    }

    if (loading) {
        return (
            <main>
                <div className="logo">
                    <img src="/logo.png" alt="SkillBridge AI Logo" className="pulse" />
                </div>
                <h1 style={{ color: '#e6edf3' }}>Creating your account...</h1>
            </main>
        )
    }

    return (
        <main>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <div className="logo">
                    <img src="/logo.png" alt="SkillBridge AI Logo" />
                </div>
                <h1 className="app-title">
                    SkillBridge <span>AI</span>
                </h1>
                <p className="app-subtitle">
                    Start your AI-powered interview prep journey
                </p>

                <div className="form-container">
                    <h1>Create an Account</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                id="username"
                                name="username"
                                placeholder='e.g. john_doe'
                                autoComplete="username"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                name="email"
                                placeholder='you@example.com'
                                autoComplete="email"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                id="password"
                                name="password"
                                placeholder='At least 6 characters'
                                autoComplete="new-password"
                            />
                        </div>

                        <button className='button primary-button'>Create Account</button>
                    </form>

                    <p>
                        Already have an account? <Link to={"/login"}>Sign in</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Register
