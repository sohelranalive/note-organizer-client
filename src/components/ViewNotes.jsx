import React from 'react';
import { Link, useLoaderData, useLocation } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const ViewNotes = () => {

    const noteInfo = useLoaderData()
    const { category, date, description, photo, status, title } = noteInfo

    return (
        <div className='w-full px-20 py-10'>
            <div className='bg-slate-400 h-12 w-12 rounded-full flex items-center justify-center'>
                <Link to='/'>
                    <AiOutlineArrowLeft className='h-10 w-10' />
                </Link>
            </div>
            <br />
            <br />
            <div className='bg-slate-400 w-full border-2 rounded-lg'>
                <div className='md:flex h-full'>
                    <div className='md:w-1/2 py-8 px-8'>
                        {
                            photo
                                ? <div className='h-[400px]'>
                                    <img src={photo} className='h-full w-full' />
                                </div>
                                : <div>
                                    no Image
                                </div>
                        }
                    </div>
                    <div className='md:w-1/2 space-y-2 py-8 px-8'>
                        <p className='text-3xl text-justify'><span className='font-bold'>Title:</span> {title}</p>
                        <p className='text-2xl text-justify'><span className='font-bold'>Description:</span> {description}</p>
                        <p className='text-2xl text-justify'><span className='font-bold'>Added Date:</span> {date}</p>
                        <p className='text-2xl text-justify'><span className='font-bold'>Category:</span> {category}</p>
                        <p className='text-2xl text-justify'><span className='font-bold'>Current Status:</span> {status}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewNotes;