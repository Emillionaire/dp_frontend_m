import { useState } from "react";
import { RegistrationForm } from './RegistrationTypes';
import {useNavigate} from 'react-router-dom';
import backendUrl from "../../url";

export default function RegistrationPage() {
    // States
    const [form, setForm] = useState<RegistrationForm>({
        email: '',
        username: '',
        password: ''
    })
    const navigate = useNavigate();
    const [validationEmail, setValidationEmail] = useState('');
    const [validationLogin, setValidationLogin] = useState('');
    const [validationPassword, setValidationPassword] = useState('');

    // Login, password and email validator
    function handleInputChange(element: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = element.target

        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }))

        if (name == 'email') {
            const isValid = /^[\w\.-]+@[\w\.-]+\.\w+$/.test(value);
            if (isValid) {
                setValidationEmail('');
            } else {
                setValidationEmail('Enter the correct e-mail address.')
            }
        }

        if (name == 'username') {
            const isValid = /^[a-zA-Z][a-zA-Z0-9]{3,19}$/.test(value);
            if (isValid) {
                setValidationLogin('');
            } else {
                setValidationLogin('Incorrect login. Login must contain only letters and numbers.');
            }
        }

        if (name == 'password') {
            const isValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/.test(value);
            if (isValid) {
                setValidationPassword('');
            } else {
                setValidationPassword('Incorrect password! Password must contain one capital letter, one small letter and a number.');
        }        
    }}

    // Send data for registration
    async function handleSubmit(element: React.FormEvent<HTMLFormElement>) {
        element.preventDefault()
        let response = await fetch(`${backendUrl}api/v1/users/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(form)
          });
        if (response.ok) {
            let result = await response.json();
            localStorage.setItem('token', result.access)
            alert('Registration done, please log in with your login/pass.')
            return navigate("/");
        } else {
            alert('Data wrong.');
        }}

  return (
    <div>
        Registration form
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='login'>Login: </label>
                <input type="login" id='username' name='username' value={form.username} onChange={handleInputChange}/>
                {validationLogin && <p>{validationLogin}</p>}
            </div>
            <div>
                <label htmlFor='email'>Email: </label>
                <input type="email" id='email' name='email' value={form.email} onChange={handleInputChange}/>
                {validationEmail && <p>{validationEmail}</p>}
            </div>
            <div>
                <label htmlFor='password'>Password: </label>
                <input type="password" id='password' name='password' value={form.password} onChange={handleInputChange}/>
                {validationPassword && <p>{validationPassword}</p>}
            </div>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}
