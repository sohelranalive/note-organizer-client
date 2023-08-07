import React from 'react';
import useDisplayNotes from '../hooks/useDisplayNotes';
import Note from './Note';

const OpenNotes = () => {

    const [allNotes, isNotesLoading, refetch] = useDisplayNotes('open')

    console.log(isNotesLoading);

    return (
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
            {
                allNotes?.map(note => <Note key={note._id} note={note} open={true} refetch={refetch}></Note>)
            }
        </div>
    );
};

export default OpenNotes;