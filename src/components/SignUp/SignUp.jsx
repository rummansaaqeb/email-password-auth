import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';

const SignUp = () => {

    const [errorMessage, setErrorMessage] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setErrorMessage('');

        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);
        })
        .catch(error => {
            console.log("ERROR:", error.message);
            setErrorMessage(error.message);
        });
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto my-12">
            <h3 className="text-3xl font-bold ml-4">Sign Up Now!</h3>
            <form onSubmit={handleSignUp} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign Up</button>
                </div>
            </form>
            {
                errorMessage && <p className='text-red-600 text-center'>{errorMessage}</p>
            }
        </div>
    );
};

export default SignUp;