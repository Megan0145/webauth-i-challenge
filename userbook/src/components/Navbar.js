import React from 'react';
import { Link, Route } from 'react-router-dom';

export default function Navbar(props) {
    return(
        <div>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
            </nav>
            <main>

            </main>
        </div>
    );
}