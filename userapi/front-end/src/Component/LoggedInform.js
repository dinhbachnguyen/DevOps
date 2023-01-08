import React from 'react'

export default function LoggedInform({user, editclicked, deleteClicked}) {
    return (
        <div style={{"textAlign": "center"}}>
            <h3> Hello {user.username}</h3>
            <label>Your First Name : </label>
            <input type='text' defaultValue={user.firstname} id= 'edit_firstname'/>
            <br/>
            <label>Your Last Name : </label>
            <input type='text' defaultValue={user.lastname} id= 'edit_lastname'/>
            <br/>
            <button onClick={editclicked}>
              Edit my data
            </button>
            <br/><br/><br/>
            <button style={{backgrounColor: 'crimson'}} onClick={deleteClicked}>
              delete my account
            </button>
        </div>
    )
}
