import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [authError, setAuthError] = useState('')
    const { userSignIn, userGoogleSignIn, userGithubSignIn } = useContext(AuthContext)

    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const onSubmit = data => {
        setAuthError('')
        userSignIn(data.email, data.password)
            .then(result => {
                console.log(result.user);
                reset()
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleGoogleLogIn = () => {
        setAuthError('')

        userGoogleSignIn()
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.code);
                if (error.code == "auth/email-already-in-use") {
                    return setAuthError('Email is already in use. Please try with a unique email.')
                }
                setAuthError('Please try again later')
            })
    }

    const handleGithubLogIn = () => {
        setAuthError('')
        userGithubSignIn()
            .then(result => {
                console.log(result.user);
                navigate(from, { replace: true })
            })
            .then(error => {
                if (error.message == 'auth/email-already-in-use') {
                    return setAuthError('Email is already in use. Please try with a unique email.')
                }
                setAuthError('Please try again later')
            })
    }


    return (
        <div className="bg-black h-[100vh] opacity-90 flex flex-col items-center justify-center">
            <div>
                <h1 className="text-4xl font-bold text-center text-white">Please login here</h1>
            </div>

            <div className="w-1/2">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Please enter your email"
                                className="input input-bordered"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500 font-bold">Email is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="text-red-500 font-bold">Password is required</span>}
                        </div>

                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value='Login'></input>
                        </div>
                    </form>
                    <br />
                    <p className="text-white">New here? <Link to='/register' className="underline">Please register</Link></p>
                    {/* Social Login */}
                    <div className="w-full space-y-4 mt-4 text-white">
                        <button onClick={handleGoogleLogIn} className="w-full border-2 border-[#007E85] py-1 rounded-md flex items-center justify-center hover:bg-[#007E85] hover:text-white">
                            <FcGoogle className='text-3xl' />
                            <span className='text-2xl ms-2'>Login with Google</span>
                        </button>
                        <button onClick={handleGithubLogIn} className="w-full border-2 border-[#007E85] py-1 rounded-md flex items-center justify-center hover:bg-[#007E85] hover:text-white">
                            <BsGithub className='text-3xl' />
                            <span className='text-2xl ms-2'>Login with Github</span>
                        </button>
                    </div>
                    <p className="font-bold text-red-200">{authError}</p>
                </div>
            </div>

        </div>
    );
};

export default Login;