import React from 'react'
import {useState} from 'react'
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
function signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {doRequest,errors} = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (e)=>{
        e.preventDefault();
         await doRequest();
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <h1>Sign In</h1>
                <div className="form-group">
                    <label>Email Address</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="form-control" />
                </div>

                <div className="form-group">
                    <label>password</label>
                    <input  value={password} onChange={e => setPassword(e.target.value)}  type="password" className="form-control" />
                </div>
                {errors}
                <button className="btn btn-primary">signin</button>
            </form>
        </div>
    )
}

export default signup
