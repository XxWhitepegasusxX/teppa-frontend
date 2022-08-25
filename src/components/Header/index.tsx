import axios from "axios"
import { Dispatch, SetStateAction, useState } from "react";
import Modal from 'react-modal'

interface HeaderProps{
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function Header({setIsOpen}: HeaderProps){
    
    function handleOpenModal(){
        setIsOpen(true)
    }
    return (
        <>
        <header>
            <div className="container">
                <div className="logo"><h1>UM</h1><h2>Users Management</h2></div>
                <button onClick={() => handleOpenModal()}>New User</button>
            </div>
        </header>
        

        </>
    )
}