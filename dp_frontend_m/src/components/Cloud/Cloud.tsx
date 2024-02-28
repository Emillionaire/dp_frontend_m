import React, { useState, useEffect } from 'react'
import './Cloud.css'
import FileEditor from '../FileEditor/FileEditor'
import { useNavigate } from 'react-router-dom'
import { RootState } from "@reduxjs/toolkit/query"
import { useSelector, useDispatch } from 'react-redux'
import { fetchGet } from '../_rtk/slices/filesSlice'
import { jwtDecode } from "jwt-decode";
import backendUrl from '../../url'
import { AppDispatch } from '../_rtk/store'



export default function CloudPage() {
    let [add, setAdd] = useState(false)
    const navigate = useNavigate();
    const data = useSelector((state: RootState) => state.files.data)
    const dispatch = useDispatch<AppDispatch>()
    const [file, setFile] = useState('')
    const [description, setDescription] = useState('')
    let token = jwtDecode(localStorage.getItem('token') || '')
    

    useEffect(() => {
        dispatch(fetchGet())
    }, [])

    
    
    const listItems = data.map((e: any) => {
        return (<FileEditor data={e} key={e.id} />)
    })

    function handleLogout() {
        localStorage.clear()
        return navigate("/");
    }

    function handleInputFile(element: React.ChangeEvent<HTMLInputElement>) {
        const file = element.target.files[0];
        setFile(file)
    }

    function handleInputDescription(element: React.ChangeEvent<HTMLInputElement>) {
        setDescription(element.target.value)}

    async function handleSubmit(element: React.FormEvent<HTMLFormElement>) {
        element.preventDefault()
        let token = "Bearer " + String(localStorage.getItem('token'))
        let myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        let formdata = new FormData();
        formdata.append("file_entity", file);
        formdata.append("description", description);

        let response = await fetch(`${backendUrl}api/v1/files/`, {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        })
        setFile('')
        setDescription('')
        setAdd(false)
        if (response.ok) {
            dispatch(fetchGet())
        } else {
            alert("Data incorrect!");
        }}

        

    function handleCancel(_element: React.ChangeEvent) {
        setAdd(false)
        setDescription('')
        setFile('')
    }

    const add_off = (
        <div className='add_file_block'>
            <button onClick={() => setAdd(true)}>Add file</button>
        </div>
    )

    const add_on = (
        <div className='add_file_block'>
             <form onSubmit={handleSubmit}>
                <button onClick={handleCancel}>Cancel</button>
                <button>Save</button>
                <input type="file" onChange={handleInputFile}/>
                <input type="text" onChange={handleInputDescription} id='description' name='description' value={description}/>
            </form>
        </div>
    )

    return (
        <>
            <div className='workspace'>
                <div>
                    <div>
                        Your user ID: {token.user_id}<br/>
                        Your name: {localStorage.getItem('username')}<br/>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    {add ? add_on : add_off}
                    {listItems}
                </div>
            </div>
        </>        
    )
    }
