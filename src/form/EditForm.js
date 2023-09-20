import { Button, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'

const EditForm = (props) => {
    const [user, setUser] = useState(props.currentUser)

useEffect(() => {
    setUser(props.currentUser)
  }, [props])

const handleInputChange = (e) => {
const {name, value} = e.target
setUser({...user, [name]: value })
}

  return (
    <form 
    onSubmit={(event) => {
        event.preventDefault()
        props.updateUser(user.id, user)
      }}>
     <TextField
          type="text"
          label="Name"
          variant="outlined"
          size="small"
          name="name"
          value={user.name}
          style={{marginTop:'20px'}}
          onChange={handleInputChange}
        />
        <br />
        <TextField
      size="small"
          type="text"
          label="Username"
          name="username"
          value={user.username}
          variant="outlined"
          style={{marginTop:'20px'}}
          onChange={handleInputChange}
        />
        <br />
        <Button type='submit' variant="contained" color="primary"  style={{marginTop:'20px'}} >
        Update user
        </Button>
        <Button
        onClick={() => props.setEditing(false)}
      >
        Cancel
      </Button>
  </form>
  )
}

export default EditForm
