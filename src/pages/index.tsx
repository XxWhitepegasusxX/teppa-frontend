import Modal from "react-modal"
import { NextPage } from "next/types"
import { useState } from "react"
import { Header } from "../components/Header"
import { List } from "../components/List"
import { FiX } from "react-icons/fi"
import axios from "axios"


interface Data{
  users: User[]
}

interface User{
  username: string,
  password: string,
  email: string,
  created_at: {
    seconds: number,
    nanoseconds: number,
  }
}

const Home: NextPage = () => {
  const [isModalOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  function handleCloseModal(){
      setIsOpen(false)
  }
  async function addUser(username: string, password: string, email: string){
    handleCloseModal()
    await axios.post('https://teppadev-fullstack-backend.herokuapp.com/users', {
      username,
      password,
      email
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
    setEmail('')
    setUsername('')
    setPassword('')
}

  return (
    <>
      <Modal className="react-modal-content" overlayClassName={'react-modal-overlay'} onRequestClose={handleCloseModal} isOpen={isModalOpen}>
        <FiX className="close-modal" onClick={handleCloseModal}/>
        <div className="modal-container">
            <h2>Register new User</h2>  
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type='email' className="email-input"></input>
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" type='text' className="username-input"></input>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type='text' className="password-input"></input>
            <button onClick={() => addUser(username, password, email)}>Register</button>
        </div>
      </Modal>
      <Header setIsOpen={setIsOpen}/>
      <List addUser={addUser}/>
    </>
  )
}

export default Home