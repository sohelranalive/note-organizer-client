import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useDisplayNotes from '../hooks/useDisplayNotes';

const image_hosting_server_url_key = import.meta.env.VITE_IMAGE_HOSTING_SERVER_API
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_server_url_key}`

const AddNote = ({ noteColor, isOpen, setIsOpen }) => {
    const notify = () => toast("New Task Added Successfully");

    const [allNotes, isNotesLoading, refetch] = useDisplayNotes('open')

    const addNoteInfoToDB = async (event) => {
        event.preventDefault()
        const form = event.target;

        let noteCategory = ''

        if (noteColor == 'red') {
            noteCategory = 'important'
        }
        if (noteColor == 'orange') {
            noteCategory = 'moderate'
        }
        if (noteColor == 'amber') {
            noteCategory = 'average'
        }
        if (noteColor == 'lime') {
            noteCategory = 'default'
        }

        const title = form.title.value;

        const description = form.description.value;

        const photoInput = form.querySelector('input[name="photo"]');
        const selectedPhoto = photoInput.files[0];
        const formData = new FormData()
        formData.append('image', selectedPhoto)


        let photoUrl = ''

        const currentDate = new Date()
        const updatedDate = currentDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });

        if (title || description || selectedPhoto) {
            if (selectedPhoto) {
                await fetch(image_hosting_url, {
                    method: 'POST',
                    body: formData
                })
                    .then(res => res.json())
                    .then(responseData => {
                        photoUrl = responseData.data.display_url;
                    })
            }

            const noteInfo = {
                title,
                description,
                photo: photoUrl,
                category: noteCategory,
                date: updatedDate,
                status: 'open'
            }
            // console.log(noteInfo);
            fetch('https://note-oraganizer-server.vercel.app/note', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(noteInfo)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        notify()
                        refetch()
                    }
                })
        }

        setIsOpen(false)
    }

    const handleDelete = () => {
        setIsOpen(false)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto">
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>
            <div className={`relative bg-${noteColor}-500 rounded-lg md:w-3/6 w-4/6`}>
                <div className="px-8 pb-4">

                    <form onSubmit={addNoteInfoToDB}>
                        <div className='text-end py-4'>
                            <button type='submit' className="h-10 w-10 bg-slate-200 p-2 rounded-full">
                                <RxCross1 className='h-full w-full' />
                            </button>
                        </div>
                        <h1 className='text-2xl font-bold text-center mb-4'>Add Note</h1>
                        <input
                            name='title'
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered input-primary w-full"
                        />
                        <br />
                        <br />
                        <textarea
                            name='description'
                            type="text"
                            placeholder="Details"
                            className="textarea textarea-primary w-full" >
                        </textarea>
                        <br />
                        <br />
                        <input
                            name='photo'
                            type="file"
                            placeholder='upload photo'
                            className="file-input file-input-bordered file-input-primary w-full" />
                        <div className='flex items-end justify-end py-8'>
                            <button onClick={handleDelete} type='button' className="bg-red-300 px-4 py-2 rounded-md font-bold">Delete</button>
                            <button type='submit' className="ms-4 bg-green-300 px-4 py-2 rounded-md font-bold">Save</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AddNote;