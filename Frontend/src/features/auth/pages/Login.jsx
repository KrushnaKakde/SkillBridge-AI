import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate('/')
    }

    if (loading) {
        return (
            <main>
                <div className="logo">
                    <img src="/logo.png" alt="SkillBridge AI Logo" className="pulse" />
                </div>
                <h1 style={{ color: '#e6edf3' }}>Signing you in...</h1>
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
                    Ace your next interview with AI-powered preparation
                </p>

                <div className="form-container">
                    <h1>Welcome Back</h1>
                    <form onSubmit={handleSubmit}>
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
                                placeholder='Enter your password'
                                autoComplete="current-password"
                            />
                        </div>
                        <button className='button primary-button'>Sign In</button>
                    </form>
                    <p>
                        Don't have an account? <Link to={"/register"}>Create one</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}

export default Login
