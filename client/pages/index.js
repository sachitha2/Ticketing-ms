import React from 'react'
import buildClient from '../api/build-client';
const  LandingPage = ({currentUser}) => {
    console.log('current user is '+currentUser)
    return currentUser ? (
        <h1>Welcome to the app </h1>
    ):(
        <h1>Please sign in</h1>
    )
}

LandingPage.getInitialProps = async context => {
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser/');
    console.log(data)
    return data;
};

export default LandingPage
