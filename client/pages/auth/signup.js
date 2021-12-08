import React from 'react'

import {useState} from 'react'
import axios from 'axios'


function signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err,setErr] = useState([]);

    const onSubmit = async (e)=>{
        e.preventDefault();
        try{
            const res = await axios.post('/api/users/signup', {email, password});

            console.log(res.data);
        }
        catch(err){
            console.log(err.response.data);
            setErr(err.response.data.errors);
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1>Sign Up</h1>
                <div className="form-group">
                    <label>Email Address</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <label>password</label>
                    <input  value={password} onChange={e => setPassword(e.target.value)}  type="password" className="form-control" />
                </div>
                {err.length > 0 && (<div className="alert alert-danger">
                    <h4>Oooops</h4>
                    <ul className="my-0">
                        {err.map(er => <li key={er.message}>{er.message}</li>)}

                    </ul>

                </div>)}
                <button className="btn btn-primary">sign up</button>
            </form>
        </div>
    )
}

export default signup
