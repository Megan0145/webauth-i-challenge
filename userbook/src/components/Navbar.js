import React from 'react';
import { Link, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

export default function Navbar(props) {
    return(
        <div>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </nav>
            <main>
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
            </main>
        </div>
    );
}