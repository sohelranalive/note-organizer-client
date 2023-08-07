import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditNote = ({ noteId, setIsOpen, refetch }) => {

    const notify = () => toast("Note Information Updated");

    const url = `https://note-oraganizer-server.vercel.app/note/${noteId}`

    const [noteInfo, setNoteInfo] = useState([])

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setNoteInfo(data);
            })
    }, [])

    const handleEditNote = (event) => {
        event.preventDefault()
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;

        if (title === noteInfo.title && description === noteInfo.description) {
            return alert('Nothing changed')
        }

        const updatedNoteInfo = {
            title,
            description
        }

        fetch(`https://note-oraganizer-server.vercel.app/note/${noteId}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedNoteInfo)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    notify()
                    setIsOpen(false)
                    refetch()
                }
            })
    }

    const handleCancelEdit = () => {
        setIsOpen(false)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>
            <div className={`relative bg-slate-200 rounded-lg md:w-3/6 w-4/6`}>
                <div className="px-8 py-4">

                    <form onSubmit={handleEditNote}>
                        <h1 className='text-2xl font-bold text-center mb-4'>Edit Note Info</h1>
                        <input
                            name='title'
                            type="text"
                            defaultValue={noteInfo.title}
                            className="input input-bordered input-primary w-full"
                        />
                        <br />
                        <br />
                        <textarea
                            name='description'
                            type="text"
                            defaultValue={noteInfo.description}
                            className="textarea textarea-primary w-full" >
                        </textarea>
                        <br />
                        <br />
                        <div className='flex items-end justify-end py-8'>
                            <button onClick={handleCancelEdit} type='button' className="bg-red-300 px-4 py-2 rounded-md font-bold">Cancel</button>
                            <button type='submit' className="ms-4 bg-green-300 px-4 py-2 rounded-md font-bold">Update</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default EditNote;