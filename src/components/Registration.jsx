import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";

const Registration = () => {

    const navigate = useNavigate()
    const { userSignUp, userProfileUpdate } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [authError, setAuthError] = useState('')

    const onSubmit = data => {

        let photoUrl = ''

        userSignUp(data.email, data.password)
            .then(result => {
                if (result.user) {
                    userProfileUpdate(data.name, photoUrl)
                        .then(() => {
                            reset()
                            navigate('/')
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
            .catch(error => {
                if (error.code == "auth/email-already-in-use") {
                    return setAuthError('Email is already in use. Please try with a unique email.')
                }
                setAuthError('Please try again later')
            })

    }
    return (
        <div className="bg-black h-[100vh] opacity-90 flex flex-col items-center justify-center">
            <div>
                <h1 className="text-4xl font-bold text-center text-white">Please Register here</h1>
            </div>

            <div className="w-1/2">
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                className="input input-bordered"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="text-red-500 font-bold">Phone is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your email"
                                className="input input-bordered"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-red-500 font-bold">Phone is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                {...register("password",
                                    {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                    })}
                            />
                            {errors.password && errors.password.type === "required" && (
                                <span className="text-red-500 font-bold">Password field is required</span>
                            )}
                            {errors.password && errors.password.type === "minLength" && (
                                <span className="text-red-500 font-bold">Password must be at least 6 characters long</span>
                            )}
                            {errors.password && errors.password.type === "maxLength" && (
                                <span className="text-red-500 font-bold">Password cannot exceed 20 characters</span>
                            )}
                            {errors.password && errors.password.type === "pattern" && (
                                <span className="text-red-500 font-bold">Password must include a capital letter and a special character</span>
                            )}
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value='Register'></input>
                        </div>
                    </form>
                    <br />
                    <p className="text-white">Already a user? <Link to='/login' className="underline">Please login</Link></p>
                    <p className="font-bold text-red-200">{authError}</p>
                </div>
            </div>
        </div>
    );
};

export default Registration;