import { useState } from "react";
import { AuthForm } from "./LoginTypes";
import { Link, useNavigate } from "react-router-dom";
import backendUrl from "../../url";

const Login = () => {
    // States
    const [form, setForm] = useState<AuthForm>({
        username: '',
        password: ''
    })
    const navigate = useNavigate();

    function handleInputChange(element: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = element.target
        
        setForm(PrevForm => ({
            ...PrevForm,
            [name]: value
        }))
    }

    async function handleSubmit(element: React.FormEvent<HTMLFormElement>) {
        element.preventDefault()
        let response = await fetch(`${backendUrl}api/v1/token/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(form)
          });
        if (response.ok) {
            let result = await response.json();
            localStorage.setItem('token', result.access)
            localStorage.setItem('username', form.username)
            return navigate("/cloud");
        } else {
            alert("Wrong login/password.");
        }}
    
  return (
    <div>
        <div>File cloud.</div>
        <div>If you already have account - log in, please.</div>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='login'>Login</label>
                <input type="login" id='username' name='username' value={form.username} onChange={handleInputChange}/>
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <input type="password" id='password' name='password' value={form.password} onChange={handleInputChange}/>
            </div>
            <button type='submit'>Log in</button>
            <Link to={'registration/'}><button>Sign Up</button></Link>
        </form>
    </div>
  )
};

export default Login;