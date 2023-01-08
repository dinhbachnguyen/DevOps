import axios from 'axios';
import { useState } from 'react';
import Loginform from './Component/Loginform';
import LoggedInform from './Component/LoggedInform';

function App() {
  const frontPort = window.location.port
  var port = 5000
  if (parseInt(frontPort) === 3030)
    port = 8080
  console.info('app port = '+ frontPort + typeof(frontPort))
  console.info('back access = '+port)
  const [user, setuser] = useState(null)

  const handleClick = async ()=>{
    const newUser = {
      username: document.getElementById('username_input').value,
      firstname: document.getElementById('firstname_input').value,
      lastname: document.getElementById('lastname_input').value
    }
    if(newUser.username.length ===0 || newUser.firstname.length === 0 || newUser.lastname.length === 0)
      window.alert('You must fill every information to log in ')
      else{
        axios.post(`http://localhost:${port}/user`, newUser)
        .then(()=>{
          setuser(newUser)
        })
        .catch((data)=>{
          window.alert('user already exist')
        })
      }
  }
  
  const editclicked = async()=>{
    const editedUser = {
      username : user.username,
      firstname : document.getElementById('edit_firstname').value,
      lastname : document.getElementById('edit_lastname').value
    }
    try {
      await axios.post(`http://localhost:${port}/user/update/${user.username}`, editedUser)
      const {data: updated} = await axios.get(`http://localhost:${port}/user/${user.username}`)
      setuser(updated.msg)
      console.info(user)      
    } catch (error) {
      window.alert(error)
    }
  }

  const deleteClicked = async()=>{
    try{
      await axios.post(`http://localhost:${port}/user/delete/${user.username}`)
      setuser(null)
      console.info(user)
    }
    catch(err){
      console.error(err)
    }
  }

  return (
    <div className="App">
      {user ? <LoggedInform user={user} editclicked={editclicked} deleteClicked={deleteClicked}/>
      :
       <Loginform onClick = {handleClick}/>}
    </div>
  );
}

export default App;
