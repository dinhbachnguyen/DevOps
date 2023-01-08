import React from 'react'

export default function Loginform({onClick}) {
    return (
        <div style= {{'textAlign': 'center'}}>
            <label>Enter Your User Name : </label>
            <input type = "text"  id = 'username_input'/>
            <br/>
            <label>Enter Your First Name : </label>
            <input type = "text"  id = 'firstname_input'/>
            <br/>
            <label>Enter Your Last Name : </label>
            <input type = "text"  id = 'lastname_input'/>
            <br/>
            <button onClick={onClick}>
              Validate
            </button>
        </div>
    )
}
