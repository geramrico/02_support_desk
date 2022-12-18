import React, { useState } from 'react'
import { useSelector } from 'react-redux'

function NewTicket() {

    const { user } = useSelector(state => state.auth)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [product, setProduct] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()




    }


    return (
        <>
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