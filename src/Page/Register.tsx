import React from 'react';
import { Input, Button, Label, Spinner } from '@fluentui/react-components'
import { Navigate } from 'react-router-dom';
import { Alert } from '@fluentui/react-components/unstable';

const Register = () => {
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [fullName, setName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [zipCode, setZipCode] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [errors, setErrors] = React.useState(new Map<string, string>());
    const [isRegistered, setIsRegistered] = React.useState(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const response = await fetch('https://localhost:7207/v1/authentication/Register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName,
                password,
                email,
                fullName,
                phoneNumber,
                address,
                city,
                state,
                zipCode,
                country
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();

        })
            .catch(err => {
                console.log(err);
                errors.set('userName', 'Username or email already exists');
                setIsSubmitting(false);
                setIsRegistered(false);
            });
        if (response) {
            if (response.errors) {
                setErrors(response.errors);
            }
            else {
                setIsRegistered(true);
            }
            setIsSubmitting(false);
        }
    }
    if (isRegistered) {
        return <Navigate to="/login" />;
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-gradient">Please Register</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col col-sm-6 mb-2'>
                                <div className="d-flex flex-column flex-start">
                                    <Label htmlFor="fullName">
                                        Full Name
                                    </Label>
                                    <Input id="fullName" name="fullName" required
                                        disabled={isSubmitting}
                                        onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                            {/* </div>
                        <div className='row'> */}
                            <div className='col col-sm-6 mb-2'>
                                <div className="d-flex flex-column flex-start">
                                    <Label htmlFor="userName">
                                        User Name
                                    </Label>
                                    <Input id="userName" name="userName" required
                                        disabled={isSubmitting}
                                        onChange={(e) => setUserName(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col col-sm-6 mb-2'>
                                <div className="d-flex flex-column flex-start">
                                    <Label htmlFor="email">
                                        Email
                                    </Label>
                                    <Input id="email" name="email" type='email' required
                                        disabled={isSubmitting}
                                        onChange={e => setEmail(e.target.value)} />
                                </div>
                            </div>
                            <div className='col col-sm-6 mb-2'>
                                <div className="d-flex flex-column flex-start">
                                    <Label htmlFor="phone">
                                        Phone Number
                                    </Label>
                                    <Input id="phoneNumber" name="phoneNumber" required
                                        disabled={isSubmitting}
                                        onChange={(e) => setPhoneNumber(e.target.value)} />
                                </div>
                            </div>

                            {/* </div>
                        <div className='row'> */}
                            <div className='col col-sm-6 mb-2'>
                                <div className="d-flex flex-column flex-start">
                                    <Label htmlFor="password">
                                        Password
                                    </Label>
                                    <Input id="password" name="password" type="password" required
                                        disabled={isSubmitting}
                                        onChange={e => setPassword(e.target.value)} />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <Button type="submit">
                                    Register
                                </Button>
                                <Spinner className="ms-2" size="small" hidden={!isSubmitting} label="Submitting..." aria-hidden="true" role="progressbar" labelPosition="after" />
                            </div>
                        </div>
                        { // If there are errors, show them here 
                            errors.size > 0 &&
                            <div className='row'>
                                <div className='col mt-2'>
                                    {
                                        Array.from(errors).map(([key, value]) => {
                                            return <Alert intent="error">
                                                {value}
                                            </Alert>
                                        })
                                    }
                                </div>
                            </div>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;