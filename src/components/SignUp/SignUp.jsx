import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';


const SignUp = () => {

    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUp = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photoURL = e.target.photo.value;
        const terms = e.target.terms.checked;

        setErrorMessage('');
        setSuccess(false);

        if (password.length < 6) {
            setErrorMessage('Password Should Be 6 Characters Or Longer');
            return;
        }

        if(!terms){
            setErrorMessage('Please Accept Our Terms And Conditions'); 
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('At Least One Uppercase, One lowercase, one number and one special character needed');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true);

                // send verification email 

                sendEmailVerification(auth.currentUser)
                .then(()=> console.log('verification email send'))

                //update profile name and photoURL
                const profile = {displayName: name, photoURL: photoURL}
                updateProfile(auth.currentUser, profile)
                .then(()=> console.log('user profile updated'))
                .catch(error => console.log("User Profile Updated Interrupted"))
            })
            .catch(error => {
                console.log("ERROR:", error.message);
                setErrorMessage(error.message);
                setSuccess(false);
            });
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto my-12">
            <h3 className="text-3xl font-bold ml-4">Sign Up Now!</h3>
            <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input name='name' type="text" placeholder="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input name='photo' type="text" placeholder="photo" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder="password"
                        className="input input-bordered"
                        required />
                    <button onClick={() => setShowPassword(!showPassword)} className='btn btn-xs absolute right-2 top-12'>{showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}</button>
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label justify-start cursor-pointer">
                        <input name='terms' type="checkbox" className="checkbox" />
                        <span className="label-text ml-2">Accept Our Terms And Conditions</span>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </form>
            {
                errorMessage && <p className='text-red-600 text-center mb-6'>{errorMessage}</p>
            }
            {
                success && <p className='text-green-600 text-center mb-6'>Sign Up Is Successful.</p>
            }
            <p className='font-bold text-center mb-8'>Already have an account? <Link to='/login' className='underline'>Login</Link></p>
        </div>
    );
};

export default SignUp;