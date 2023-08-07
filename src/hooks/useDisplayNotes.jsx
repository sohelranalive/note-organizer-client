import { useQuery } from '@tanstack/react-query';

const useDisplayNotes = (status) => {
    const { data: allNotes, isLoading: isNotesLoading, refetch } = useQuery({
        queryKey: ['allNotes'],
        queryFn: async () => {
            const response = await fetch(`https://note-oraganizer-server.vercel.app/note?status=${status}`)
            const data = await response.json()
            return data
        }
    })

    return [allNotes, isNotesLoading, refetch]
};

export default useDisplayNotes;