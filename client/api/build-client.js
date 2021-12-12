import axios from "axios";


export default ({req})=>{
    if(typeof window === 'undefined'){
        //server

        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    }else{
        //client in the browser
        return axios.create({
            baseURL:'/'
        });
    }
}