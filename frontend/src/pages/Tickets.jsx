import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getTickets, reset } from '../features/tickets/ticketSlice'

import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'



const Tickets = () => {

    const { isLoading, isSuccess, tickets } = useSelector(state => state.ticket)

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

        dispatch(getTickets())

    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }
    console.log(tickets)

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