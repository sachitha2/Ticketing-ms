import React from 'react'
import axios from 'axios';
const  LandingPage = ({currentuser}) => {
    console.log(currentuser);
    return (
        <div>
            index page
        </div>
    )
}

LandingPage.getInitialProps = async ({req}) =>{
    console.log(req);
    if(typeof window === 'undefined'){
        // we are on the server
        // req should be made to vjn url
        const {data} = await axios.get(
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser/',{
                headers: req.headers
            }
        );
        console.log(data);
        return data;
    }else{
        //we are on the browser
        // req can be made  with a url of ''
        const {data} = await axios.get('/api/users/currentuser');
        return data;
    }

    return {};
};

export default LandingPage
