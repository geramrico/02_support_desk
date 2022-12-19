import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTickets, reset } from '../features/tickets/ticketSlice'

import { toast } from "react-hot-toast"

import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'



const Tickets = () => {

    const { isLoading, isSuccess, tickets, isError, message } = useSelector(state => state.ticket)

    const dispatch = useDispatch()
    //const navigate = useNavigate()

    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        if (isError) { toast.error(message) }
        dispatch(getTickets())
        //eslint-disable-next-line
    }, [dispatch, isError, message])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <BackButton url={'/'} />
            <h1>Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {tickets.map(ticket => {
                    return <TicketItem key={ticket._id} ticket={ticket} />
                })}
            </div>

        </>
    )
}

export default Tickets