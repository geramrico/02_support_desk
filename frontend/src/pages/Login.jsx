import { useState } from "react"
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-hot-toast"

import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    const handleInputChange = (event) => {
        console.log(formData);
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const loginData = {
            email,
            password
        }

        dispatch(login(loginData))
    }

    return (
        <>
            {/*Heading Section*/}
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
            </section>

            {/*Form Section*/}
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            id="email"
                            value={email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            id="password"
                            value={password}
                            onChange={handleInputChange}
                            placeholder="Enter a password"
                            required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Login</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login