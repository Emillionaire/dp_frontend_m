import { useState } from 'react'

import './UserEditor.css'
import backendUrl from '../../url'
import { AppDispatch } from '../_rtk/store'
import { useDispatch } from 'react-redux'
import { fetchUsers } from '../_rtk/slices/usersListSlice'

export interface UserEditorProps {
    username: string
    email: string
    id: number
    full_name: string
    is_staff?: boolean
}

function UserEditor({ username, email, id, is_staff }: UserEditorProps) {
    const [isStaff, setIsStaff] = useState(is_staff)
    const [edit, setEdit] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const token = "Bearer " + String(localStorage.getItem('token'))

    async function handleSave() {
        const body = { is_staff: isStaff }
        await fetch(`${backendUrl}api/v1/users/update/${id}/`, {
            method: 'PATCH', body: JSON.stringify(body),
            headers: { "Authorization": token, 'Content-Type': 'application/json;charset=utf-8' }
        })
        dispatch(fetchUsers())
        setEdit(false)
    }

    async function handleDelete() {
        await fetch(`${backendUrl}api/v1/users/delete/${id}`, {
            headers: { "Authorization": token },
            method: 'DELETE'
        })
        dispatch(fetchUsers())
        setEdit(false)
    }

    return (
        <div className="container">
            <span className="subcontainer">User ID: {id}</span>
            <span className="subcontainer">User name: {username}</span>
            <span className="subcontainer">User email: {email}</span>
            {edit
                ? <span className="subcontainer, editable">
                    <b>Is Staff:</b><br />
                    <input onChange={() => setIsStaff(!isStaff)} type="checkbox" name="is_staff" checked={!!isStaff} />
                </span>
                : <span className="subcontainer">
                    <b>Is Staff:</b><br />
                    <input onChange={() => setIsStaff(!isStaff)} type="checkbox" name="is_staff" checked={!!isStaff} disabled />
                </span>
            }
            {edit
                ? <button className="subcontainer" onClick={() => setEdit(!edit)}>Cancel</button>
                : <button className="subcontainer" onClick={() => setEdit(!edit)}>Edit</button>
            }
            {edit && <button className="subcontainer" onClick={handleSave}>Save</button>}
            <button className="subcontainer" onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default UserEditor