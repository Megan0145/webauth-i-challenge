import React, { useRef } from 'react';

export default function Register(props){
    return(
        <div>
            REGISTER
            <form>
               <input placeholder='Username' />
               <input placeholder='Password' />
               <button>Go</button>
           </form>
        </div>
    );
}