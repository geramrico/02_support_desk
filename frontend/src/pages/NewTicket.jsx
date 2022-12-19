import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"
import { createTicket, reset } from '../features/tickets/ticketSlice'

import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewTicket() {

    const { user } = useSelector(state => state.auth)
    const { isLoading, isError, isSuccess, message } = useSelector(state => state.ticket)

    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            dispatch(reset())
            navigate('/tickets')
        }
        dispatch(reset())
    }, [dispatch, isError, isSuccess, navigate, message])


    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(createTicket({ product, description }))
    }


    if (isLoading) {
        <Spinner />
    }

    return (
        <>
        <BackButton url={'/'}/>
            {/*Heading Section*/}
            <section className="heading">
                <h1>
                    New Ticket
                </h1>
            </section>


            {/*Heading Section*/}
            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Customer Name</label>
                    <input type="text" className="form-control" value={name} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Customer email</label>
                    <input type="text" className="form-control" value={email} disabled />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">

                        <label htmlFor="product">Product</label>
                        <select
                            name="product"
                            id="product"
                            value={product}
                            onChange={(e) => setProduct(e.target.value)}>

                            <option value="">Select a product</option>
                            <option value="iPhone">iPhone</option>
                            <option value="Macbook Pro">Macbook Pro</option>
                            <option value="iPad Air">iPad Air</option>
                            <option value="iPod">iPod</option>

                        </select>

                    </div>
                    <div className="form-group">

                        <label htmlFor="description">Description</label>
                        <textarea
                            name="description"
                            id="description"
                            className='form-control'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Submit</button>
                    </div>
                </form>

            </section>
        </>
    )
}

export default NewTicket