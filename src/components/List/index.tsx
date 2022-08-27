/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import UserModal from "../UserModal";

type Users =  User[]

export interface User{
  username: string,
  password: string,
  email: string,
  created_at: {
    seconds: number,
    nanoseconds: number,
  }
  id: string,
}

export function List(addUser: any){
    const [users, setUsers] = useState<Users>()
    const [id, setId] = useState('')
    const [user, setUser] = useState('')
    const [isUserModalOpen, setUserModalOpen] = useState(false)

    function deleteUser(id: string){
      axios.delete('https://teppadev-fullstack-backend.herokuapp.com/users', {data: {id}})
    }
    function handleOpenUserModal(id: string, user: string){
      setId(id)
      setUser(user)
      setUserModalOpen(true)
    }
    function getData(){
      return;
    }
    useEffect(()=> {
      getData()
    }, [])

  useEffect(() => {
    axios.get('https://teppadev-fullstack-backend.herokuapp.com/users')
    .then(response => setUsers(response.data.users))
  }, [getData, addUser, deleteUser])
    return(
        <main>
            <div className='users'>
                <div className="head"><h1>Total:</h1></div>
                <div className="body"><h3>{users?.length} Users</h3></div>
            </div>
            <table>
                <tr>
                    <th className="email">Email</th>
                    <th className="username">Username</th>
                    <th className="password">Password</th>
                    <th className="createdAt">Created At</th>
                    <th className="actions">Actions</th>
                </tr>
                {users?.map(user => {
                    const date = user.created_at.seconds * 1000
                    const createdAt = new Date(date).toLocaleDateString('pt-BR')
                    const username = user.username
                    return (
                    <tr className="user" key={user.username}>
                        <td className="email">{user.email}</td>
                        <td className="username">{user.username}</td>
                        <td className="password">{user.password}</td>
                        <td className="createdAt">{createdAt}</td>
                        <td className="actions"><button onClick={() => handleOpenUserModal(user.id, user.username)} className="edit"><FiEdit/></button><button onClick={()=> deleteUser(user.id)} className="delete"><FiTrash2/></button></td>
                    </tr>)
                })}
            </table>
            <UserModal username={user} isUserModalOpen={isUserModalOpen} id={id} setUserModalOpen={setUserModalOpen}/>
        </main>
    )
}
