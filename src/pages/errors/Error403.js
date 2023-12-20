import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Error403 = () => {
  return (
    <div>
      <h1>You do not have permission to perform this action.</h1>
      <Link to='/'>
        <Button>Click here to return to the home page.</Button>
      </Link>
    </div>
  );
}

export default Error403