import React from 'react'

import {useState} from 'react'



function signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const onSubmit = (e)=>{
        e.preventDefault();
        console.log(email, password)
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
                    <label>Email Address</label>
                    <input  value={password} onChange={e => setPassword(e.target.value)}  type="password" className="form-control" />
                </div>
                <button className="btn btn-primary">sign up</button>
            </form>
        </div>
    )
}

export default signup
