import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGet } from '../_rtk/slices/filesSlice'
import FileEditor from '../FileEditor/FileEditor'
import backendUrl from '../../url'
import { AppDispatch } from '../_rtk/store'

function FilesList() {
    const [add, setAdd] = useState(false)
    const data = useSelector((state: RootState) => state.files.data)
    const [file, setFile] = useState('')
    const [description, setDescription] = useState('')
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(fetchGet())
    }, [])


    const listItems = data.map((e: any) => {
        return (<FileEditor data={e} key={e.id} />)
    })

    const add_off = (
        <div className='add_file_block'>
            <button onClick={() => setAdd(true)}>Add file</button>
        </div>
    )

    function handleInputFile(element: React.ChangeEvent<HTMLInputElement>) {
        const file = element.target.files[0];
        setFile(file)
    }

    function handleInputDescription(element: React.ChangeEvent<HTMLInputElement>) {
        setDescription(element.target.value)
    }

    async function handleSubmit(element: React.FormEvent<HTMLFormElement>) {
        element.preventDefault()
        const token = "Bearer " + String(localStorage.getItem('token'))
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const formdata = new FormData();
        formdata.append("file_entity", file);
        formdata.append("description", description);

        const response = await fetch(`${backendUrl}api/v1/files/`, {
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
        }
    }

    function handleCancel(_element: React.ChangeEvent) {
        setAdd(false)
        setDescription('')
        setFile('')
    }

    const add_on = (
        <div className='add_file_block'>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleInputFile} />
                <input type="text" onChange={handleInputDescription} id='description' name='description' value={description} placeholder='Описание файла...' />
                <button onClick={handleCancel}>Cancel</button>
                <button>Save file</button>
            </form>
        </div>
    )

    return (
        <>
            {add ? add_on : add_off}
            {listItems}
        </>
    )
}

export default FilesList