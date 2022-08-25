import axios from 'axios'
import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import Modal from "react-modal"

interface User{
    user: {
        username: string,
        password: string,
        created_at: {
            seconds: number,
            nanoseconds: number,
        }
        id: string,
    }
}
interface ModalProps{
    id: string,
    username: string,
    isUserModalOpen: boolean,
    setUserModalOpen: (arg: boolean) => void,
}

export default function UserModal({id, username, isUserModalOpen, setUserModalOpen}: ModalProps){
    const [newEmail, setNewEmail] = useState('')
    const [newUsername, setNewUsername] = useState('')
    const [newPassword, setNewPassword] = useState('')

    async function editUser(){

        const data ={
            id: id,
            update: {
                email: newEmail,
                username: newUsername,
                password: newPassword,
            }
        }
        setUserModalOpen(false)
        await axios.put('https://teppadev-fullstack-backend.herokuapp.com/users', data).then(response => console.log(response)).catch(e => console.log("Deu este Erro", e))
        setNewEmail('')
        setNewUsername('')
        setNewPassword('')
    }

    return (
        <Modal className="react-modal-content" overlayClassName='react-modal-overlay' onRequestClose={() => setUserModalOpen(false)} isOpen={isUserModalOpen} >
            <FiX className="close-modal" onClick={() => setUserModalOpen(false)}/>
            <div className="modal-container">
                <h2>Edit user {username}</h2>  
                <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Set a new Email" type='email' className="email-input"></input>
                <input value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="Set a new Username" type='text' className="username-input"></input>
                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Set a new Password" type='text' className="password-input"></input>
                <button onClick={() => editUser()}>Edit</button>
            </div>
        </Modal>
    )
}