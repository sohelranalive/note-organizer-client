import { Link, useRouteError } from 'react-router-dom';
import error_logo from '../assets/404-error.png'

const ErrorPage = () => {

    const { error } = useRouteError()


    return (
        <div className='h-[100vh] w-full text-white error-bg'>

            <div className='flex justify-center items-center h-[70vh]'>
                <div className='h-80 w-80'>
                    <img src={error_logo} className='h-full w-full' alt="" />
                </div>
            </div>

            <div className='text-center h-[30vh]'>
                <h1 className='text-3xl font-bold text-center'>{error?.message}</h1>
                <br />
                <Link className="border-2 px-3 rounded-lg hover:bg-[#AB1318] py-3 bg-slate-900 text-white" to='/'>Back to homepage</Link>
            </div>
        </div>
    );
};

export default ErrorPage;