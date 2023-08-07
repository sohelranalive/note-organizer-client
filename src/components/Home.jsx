import { useContext, useEffect, useState } from 'react';
import { HiPlus } from 'react-icons/hi';
import { RxCross1 } from 'react-icons/rx';
import AddNote from './AddNote';
import { AuthContext } from '../providers/AuthProvider';
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom';
import useDisplayNotes from '../hooks/useDisplayNotes';
import Note from './Note';
import OpenNotes from './OpenNotes';
import CompleteNotes from './CompleteNotes';

const Home = () => {

    const { user, userLogOut } = useContext(AuthContext)

    const navigate = useNavigate()

    const [showNoteColor, setShowNoteColor] = useState(false)
    const [noteColor, setNoteColor] = useState('default')
    const [isOpen, setIsOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(1);

    const handleNoteColor = () => {
        setShowNoteColor(!showNoteColor)
    }

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const handleAddNote = (noteColor) => {
        if (!user) {
            setShowNoteColor(false)
            return Swal.fire({
                title: 'Opps, Sorry!',
                text: "You need to login fist to add note",
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
        setShowNoteColor(false)
        setNoteColor(noteColor)
        setIsOpen(true)
    }

    const handleLogOut = () => {
        userLogOut()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const [inputValue, setInputValue] = useState('');
    const [dataToShow, setDataToShow] = useState([]);

    useEffect(() => {
        setActiveTab(3);
        if (!inputValue) {
            setActiveTab(1)
            return
        }

        fetch(`https://note-oraganizer-server.vercel.app/allnotes/${inputValue}`)
            .then(res => res.json())
            .then(data => {
                setDataToShow(data)
            })

    }, [inputValue])

    return (
        <>
            <div className="md:flex h-screen">
                {/* sidebar start*/}
                <div className="hidden md:block w-1/12 border bg-slate-100 sticky h-full px-0">
                    <div className="h-28 flex items-center justify-center">
                        {user
                            ? <div className='text-center space-y-2'>
                                <h1 className='text-3xl font-bold italic'>Hi</h1>
                                <h1 className='font-bold'>{user?.displayName}</h1>
                                <button onClick={handleLogOut} className="btn btn-sm bg-secondary hover:bg-red-400">Logout</button>
                            </div>
                            : <h1 className="text-3xl font-bold">Keep</h1>
                        }
                    </div>
                    <div className="h-24 flex items-center justify-center">
                        <button onClick={handleNoteColor} className="h-10 w-10 bg-black p-2 rounded-full">
                            {showNoteColor
                                ? <RxCross1 className='h-full w-full text-white' />
                                : <HiPlus className='h-full w-full text-white' />
                            }
                        </button>
                    </div>
                    {
                        showNoteColor
                        && <div className="py-4 flex flex-col items-center space-y-8">
                            <button onClick={() => handleAddNote('red')} className="h-8 w-8 bg-red-500"></button>
                            <button onClick={() => handleAddNote('orange')} className="h-8 w-8 bg-orange-500"></button>
                            <button onClick={() => handleAddNote('amber')} className="h-8 w-8 bg-amber-500"></button>
                            <button onClick={() => handleAddNote('lime')} className="h-8 w-8 bg-lime-500"></button>
                        </div>
                    }
                </div>
                {isOpen && <AddNote noteColor={noteColor} isOpen={isOpen} setIsOpen={setIsOpen}></AddNote>}
                {/* Side bar end */}

                {/* Main content */}
                <div className="md:w-11/12 overflow-y-auto">
                    {/* search bar */}
                    <div className="h-28 md:px-24 px-12 flex items-center">
                        <input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            type="text"
                            placeholder="Search here"
                            className="input input-bordered input-secondary w-full" />
                    </div>
                    {/* Heading & Buttons*/}
                    <div className="h-24 md:px-24 px-12 flex justify-between items-center">
                        <h1 className="text-5xl font-bold">Notes</h1>
                        <div className="flex border-b border-gray-300 justify-center">
                            <button
                                className={`mx-auto block md:m-0 md:inline py-2 px-4 text-gray-600 hover:text-gray-800 ${activeTab === 1 ? 'border-b-4 border-primary' : ''}`}
                                onClick={() => handleTabClick(1)}
                            >
                                Open
                            </button>
                            <button
                                className={`mx-auto block md:m-0 md:inline py-2 px-4 text-gray-600 hover:text-gray-800 ${activeTab === 2 ? 'border-b-4 border-primary' : ''}`}
                                onClick={() => handleTabClick(2)}
                            >
                                Completed
                            </button>
                        </div>
                    </div>
                    {/* notes */}
                    <div className="w-full py-4 md:px-24 px-12">
                        {activeTab == 1 && <OpenNotes></OpenNotes>}
                        {activeTab == 2 && <CompleteNotes></CompleteNotes>}
                        {activeTab == 3 && <>
                            <table className="table w-full">

                                <thead>
                                    <tr>
                                        <th>Task Title</th>
                                        <th>Task Description</th>
                                        <th>Added Date</th>
                                        <th>Category</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataToShow.map(note => <tr>
                                            <td>{note.title.slice(0, 15)}</td>
                                            <td>{note.description.slice(0, 40)}</td>
                                            <td>{note.date}</td>
                                            <td>{note.status}</td>
                                            <td>{note.category}</td>
                                            <td>
                                                {note.status == 'open'
                                                    ? <Link to={`/details/${note._id}`} className='btn btn-sm bg-blue-400 hover:bg-blue-600'>View</Link>
                                                    : <button className='btn btn-sm bg-blue-400' disabled>View</button>}
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </>
                        }
                    </div>
                </div>
                {/* MainContent end */}
            </div >


            {/* Bottom Menu */}
            < div className="btm-nav md:hidden shadow-2xl" >
                <div className="bg-pink-200 text-pink-600 cursor-default">
                    {user
                        ? <div className='text-center'>
                            <h1 className='text-3xl font-bold italic'>Hi</h1>
                            <h1 className='font-bold'>{user?.displayName}</h1>
                        </div>
                        : <h1 className="text-3xl font-bold">Keep</h1>
                    }
                </div>
                <div className="active bg-blue-200 text-blue-600 border-blue-600 cursor-default">
                    <button onClick={handleLogOut} className="btn btn-sm bg-secondary hover:bg-red-400">Logout</button>
                </div>
                <div className="bg-teal-200 text-teal-600 cursor-default">
                    <div className="h-24 flex items-center justify-center">
                        <button onClick={handleNoteColor} className="h-10 w-10 bg-black p-2 rounded-full">
                            {showNoteColor
                                ? <RxCross1 className='h-full w-full text-white' />
                                : <HiPlus className='h-full w-full text-white' />
                            }
                        </button>
                    </div>
                </div>
            </div >


            {
                showNoteColor
                && <div className='floating-div block md:hidden'>
                    <div className="py-4 flex flex-col items-center space-y-8">
                        <button onClick={() => handleAddNote('red')} className="h-8 w-8 bg-red-500"></button>
                        <button onClick={() => handleAddNote('orange')} className="h-8 w-8 bg-orange-500"></button>
                        <button onClick={() => handleAddNote('amber')} className="h-8 w-8 bg-amber-500"></button>
                        <button onClick={() => handleAddNote('lime')} className="h-8 w-8 bg-lime-500"></button>
                    </div>
                </div>
            }
        </>
    );
};

export default Home;