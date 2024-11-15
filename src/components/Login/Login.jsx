import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../../firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {

    const [success, setSuccess] = useState(false);
    const [loginError, setLoginError] = useState('');
    const emailRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setSuccess(false);
        setLoginError('');

        // login user
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);

                if (!result.user.emailVerified) {
                    setLoginError('Please Verify Your Email Address')
                }
                else {
                    setSuccess(true);
                }
            })
            .catch(error => {
                console.log("ERROR: ", error.message);
                setLoginError(error.message);
            });

    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if(!email){
            console.log('Please Provide A Valid Email Address');
        }
        else {
            sendPasswordResetEmail(auth, email)
            .then(()=> {
                alert('Password Reset Email Send, Please Check Your Email');
            })
            .catch(error => {
                console.log(error.message);
            })
        }
    }

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="email" placeholder="email" className="input input-bordered" ref={emailRef} required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                                <label onClick={handleForgetPassword} className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                        </form>

                        {
                            success && <p className='text-green-600 font-bold text-center mb-8'>User Login Successful</p>
                        }
                        {
                            loginError && <p className="text-red-600 text-center font-bold mb-8">{loginError}</p>
                        }

                        <p className='text-center font-bold mb-8'>New To This Website? Please <Link className='underline' to='/signUp'>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;