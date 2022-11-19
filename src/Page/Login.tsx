import React from 'react';
import { Input, Button, Label } from '@fluentui/react-components'
import { Navigate } from 'react-router-dom';
import AppConstants from '../AppConstants';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [errors, setErrors] = React.useState(new Map<string, string>());
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    // if jwt cookie exists, redirect to home page
    React.useEffect(() => {
        const jwt = document.cookie.split(';').find(c => c.trim().startsWith('jwt='));
        if (jwt) {
            setIsAuthenticated(true);
        }
    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const response = await fetch(AppConstants.API_ENDPOINT + '/v1/authentication/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                phoneNumber,
                password
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).catch(err => {
            console.log(err);
            errors.set('userName', 'Username or password is incorrect');
            setIsSubmitting(false);
            setIsAuthenticated(false);
        });
        if (response) {
            if (response.errors) {
                setErrors(response.errors);
                console.log(response.errors);
            }
            else {
                localStorage.setItem('jwt', response.token)
                localStorage.setItem('user', JSON.stringify(response))
                console.log('users', response) // undefined
                setIsAuthenticated(true);
            }
            setIsSubmitting(false);
        }
    }
    if (isAuthenticated) {
        return <Navigate to="/" />
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className='text-gradient'>Please Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col col-sm-6 mb-2'>
                                <div className="d-flex flex-column flex-start">
                                    <Label htmlFor="email">
                                        Phone Number
                                    </Label>
                                    <Input id="phoneNumber" name="phoneNumber" required type='tel'
                                        disabled={isSubmitting}
                                        onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* <div className='row'>
                            <div className='col col-sm-6 mb-2'>
                                <div className="d-flex flex-column flex-start">
                                    <Label htmlFor="email">
                                        Email
                                    </Label>
                                    <Input id="email" name="email" required type='email'
                                        disabled={isSubmitting}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>
                        </div> */}
                        {/* <div className='row'>
                            <div className='col col-sm-6 mb-2'>
                                <div className="d-flex flex-column flex-start">
                                    <Label htmlFor="userName">
                                        User Name
                                    </Label>
                                    <Input id="userName" name="userName" required />
                                </div>
                            </div>
                        </div> */}
                        <div className='row'>
                            <div className='col col-sm-6 mb-2'>
                                <div className="d-flex flex-column flex-start">
                                    <Label htmlFor="password">
                                        Password
                                    </Label>
                                    <Input id="password" name="password" type="password" required
                                        disabled={isSubmitting}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <Button type="submit">
                                    Log In
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;