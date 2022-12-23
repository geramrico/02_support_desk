//Hooks
import { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

//State Imports
import { getTicket, reset, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, createNote, reset as notesReset } from '../features/notes/noteSlice'

//Compomnents
import NoteItem from '../components/NoteItem'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

//Functionality & tools Frontend
import { toast } from "react-hot-toast"
import Modal from 'react-modal'
import { useState } from 'react'
import { FaPlus } from 'react-icons/fa'

const customStyles = {
    content: {
        width: '50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

//Mount modal to root element
Modal.setAppElement('#root')

const Ticket = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')

    const { ticketId } = useParams() //Get id from URL

    const { isLoading, isSuccess, ticket, isError, message } = useSelector(state => state.ticket)
    const { notes, isLoading: notesIsLoading } = useSelector(state => state.note)


    const dispatch = useDispatch()
    const navigate = useNavigate()


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
        dispatch(getNotes(ticketId))

    }, [dispatch, isError, message, ticketId])

    function onTicketClose() {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket closed')
        navigate('/tickets')
    }

    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)


    const handleAddNote = (event) => {
        event.preventDefault()

        if(!noteText){
            toast.error('Please add a note')
            return
        }

        //refers to the slice
        dispatch(createNote({ticketId, noteText}))
        setNoteText('')
        closeModal()
    }


    if (isLoading || notesIsLoading) {
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
                    <h3>
                        Product: {ticket.product}
                    </h3>
                    <hr />
                    <div className="ticket-desc">
                        <h3>Description</h3>
                        <p>{ticket.description}</p>
                    </div>
                    <h2>Notes</h2>
                </header>

                {ticket.status !== 'closed' &&
                    (<button className='btn' onClick={openModal}>
                        <FaPlus /> Add Note
                    </button>)}

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Add Note"
                >
                    <h2>Add Note</h2>
                    <button className='btn-close' onClick={closeModal}>X</button>
                    <div className="form-gorup">
                        <form onSubmit={handleAddNote}>
                            <div className="form-group">
                                <textarea
                                    name="note"
                                    id="note"
                                    className='form-control'
                                    placeholder='Note text'
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}/>
                                
                            </div>
                            <div className="form-group">
                                <button className="btn" type='submit'>Submit</button>
                            </div>
                        </form>
                    </div>

                </Modal>

                {notes.map(note => {
                    return <NoteItem key={note._id} note={note} />
                })}

                {ticket.status !== 'closed' && (
                    <button className='btn btn-block btn-danger' onClick={onTicketClose}>Close</button>
                )}


            </div>
        </>
    )
}

export default Ticket