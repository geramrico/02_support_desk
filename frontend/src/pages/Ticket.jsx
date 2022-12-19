import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

import { toast } from "react-hot-toast"

const Ticket = () => {

    const { ticketId } = useParams() //Get id from URL

    const { isLoading, isSuccess, ticket, isError, message } = useSelector(state => state.ticket)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {

        if (isError) { toast.error(message) }

        dispatch(getTicket(ticketId))

    }, [dispatch, isError, message, ticketId])

    if (isLoading) {
        return <Spinner />
    }



    return (
        <>
            <div className="ticket-page">
                <header className="ticket-header">

                    <BackButton url={'/tickets'} />
                    <h2>
                        Ticket ID: {ticket._id}
                        <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                    </h2>
                    <h3>
                        Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
                    </h3>
                    <hr />
                    <div className="ticket-desc">
                        <h3>Description</h3>
                        <p>{ticket.description}</p>
                    </div>

                </header>
            </div>
        </>
    )
}

export default Ticket