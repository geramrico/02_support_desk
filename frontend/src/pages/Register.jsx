import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { toast } from "react-hot-toast"



import { useSelector, useDispatch } from 'react-redux'
import { register, reset } from '../features/auth/authSlice'


function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    // Destructure variables from state formData
    const { name, email, password, password2 } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //Brought from state (features/auth)
    const { user, isLoading, isSuccess, isError, message } = useSelector(state => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        //Redirect when logged in
        if (isSuccess && user) {
            navigate('/')
        }

        dispatch(reset())

    }, [isError, isSuccess, user, message, navigate, dispatch])

    // Update state om form changes
    const handleInputChange = (event) => {
        //console.log(formData);
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (password !== password2) {
            toast.error('Passwords do not match!')
        } else {
            const userData = {
                name,
                email,
                password
            }
            //Send action to storage 
            dispatch(register(userData))
        }
    }


    return (
        <>
            {/*Heading Section*/}
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>Please create an account</p>
            </section>

            {/*Form Section*/}
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="name"
                            value={name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            required />
                    </div>
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
                        <input
                            type="password"
                            className="form-control"
                            name="password2"
                            id="password2"
                            value={password2}
                            onChange={handleInputChange}
                            placeholder="Confirm your password"
                            required />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register