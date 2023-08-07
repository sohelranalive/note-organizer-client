import { FaEdit, FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { FcViewDetails } from 'react-icons/fc';
import { MdDone } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import EditNote from './EditNote';
import { useContext, useState } from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../providers/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Note = ({ note, open, refetch }) => {

    const notify = () => toast("Deleted Successfully");
    const notify2 = () => toast("Wow, Task Complete");

    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)
    const [noteId, setNoteId] = useState('')

    const { _id, title, description, photo, date, category } = note;

    let noteColor = ''

    if (category == 'important') {
        noteColor = 'red'
    }
    if (category == 'moderate') {
        noteColor = 'orange'
    }
    if (category == 'average') {
        noteColor = 'amber'
    }
    if (category == 'default') {
        noteColor = 'lime'
    }

    const handleDeleteNote = (id) => {

        if (!user) {
            return Swal.fire({
                title: 'Opps, Sorry!',
                text: "You need to login fist to delete note",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Swal.fire(
                    //     'Deleted!',
                    //     'Your file has been deleted.',
                    //     'success'
                    // )
                    navigate('/login')
                }
            })
        }

        Swal.fire({
            title: 'Delete Note?',
            text: "You Can't Revert this action",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://note-oraganizer-server.vercel.app/note?id=${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        if (data.deletedCount) {
                            notify()
                            refetch()
                        }
                    })
            }
        })
    }

    const handleEditNote = (id) => {

        if (!user) {
            return Swal.fire({
                title: 'Opps, Sorry!',
                text: "You need to login fist to modify note",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Swal.fire(
                    //     'Deleted!',
                    //     'Your file has been deleted.',
                    //     'success'
                    // )
                    navigate('/login')
                }
            })
        }

        setNoteId(id)
        setIsOpen(!isOpen)
    }

    const handleNoteStatus = (id) => {

        if (!user) {
            return Swal.fire({
                title: 'Opps, Sorry!',
                text: "You need to login fist to complete task",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Swal.fire(
                    //     'Deleted!',
                    //     'Your file has been deleted.',
                    //     'success'
                    // )
                    navigate('/login')
                }
            })
        }

        const updateStatus = { status: 'complete' }
        fetch(`https://note-oraganizer-server.vercel.app/note?id=${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateStatus)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    notify2()
                    refetch()
                }
            })
    }

    return (
        <div className={`bg-${noteColor}-500 rounded-lg p-8 relative`}>
            {open ? <>
                <div className='flex justify-end'>
                    <button onClick={() => handleNoteStatus(_id)} className="h-10 w-10 bg-red-200 rounded-full">
                        <MdDone className='h-full w-full text-black' />
                    </button>
                </div>
                <h1 className="text-justify text-2xl">{title}</h1>
                <hr className="mt-2 mb-2 border-black" />
                <p className="text-justify">{description}</p>
                <br />
                {photo && <span>Photo: <a href={`${photo}`} className='underline' target='_blank'>{photo}</a></span>}
                <br />
                <br />
                <p>{date}</p>
                <br />
                <br />
                <div className="absolute bottom-6 flex items-center space-x-4">
                    <button onClick={() => handleDeleteNote(_id)} className="h-10 w-10 bg-black p-2 rounded-full">
                        <FaTrashAlt className='h-full w-full text-white' />
                    </button>
                    <button onClick={() => handleEditNote(_id)} className="h-10 w-10 bg-black p-2 rounded-full">
                        <FaRegEdit className='h-full w-full text-white' />
                    </button>
                    <Link to={`/details/${_id}`} className='border p-2 rounded-md bg-red-200 text-black'>
                        View Details
                    </Link>
                </div>
                <ToastContainer />
            </>
                : <>
                    <h1 className="text-justify text-2xl">{title}</h1>
                    <hr className="mt-2 mb-2 border-black" />
                    <p className="text-justify">{description}</p>
                    <br />
                    {photo && <span>Photo: <a href={`${photo}`} className='underline' target='_blank'>{photo}</a></span>}
                    <br />
                    <br />
                    <p>{date}</p>
                    <br />
                    <br />
                    <div className="absolute bottom-6 space-x-4">
                        <button onClick={() => handleDeleteNote(_id)} className="h-10 w-10 bg-black p-2 rounded-full">
                            <FaTrashAlt className='h-full w-full text-white' />
                        </button>
                    </div>
                </>}
            {isOpen && <EditNote noteId={noteId} setIsOpen={setIsOpen} refetch={refetch}></EditNote>}
        </div>
    );
};

export default Note;