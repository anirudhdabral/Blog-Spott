import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Home.css';
import HomeCard from './HomeCards';
import Login from './Login';

function Home() {
    const isLoggedin = useSelector(state => state.isLoggedin);
    
    if (isLoggedin)
        return (
            <div>
                <div className="mt-5 d-flex justify-content-center ">
                    <span className="h2 text-light">Create a <Link to='/add' className="link-info new-blog" >new blog.</Link></span>
                </div>
                <HomeCard />
            </div>
        );
    else
        return (
            <Login />
        )

}

export default Home;