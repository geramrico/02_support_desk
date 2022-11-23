import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa";
import { toast } from "react-hot-toast"

import Spinner from '../components/Spinner'

import { useSelector, useDispatch } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isError, isSuccess, message, isLoading } = useSelector(state => state.auth)

    useEffect(() => {

        if (isError) {
            toast.error(message)
        }

        if (user) {
            navigate('/')
        }

        dispatch(reset())

    }, [user, isError, message])

    const handleInputChange = (event) => {

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

    if (isLoading) {
        return <Spinner />
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