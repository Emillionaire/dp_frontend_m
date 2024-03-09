import React, { useEffect } from 'react'
import { fetchUsers } from '../_rtk/slices/usersListSlice'
import { AppDispatch } from '../_rtk/store'
import { useSelector, useDispatch } from 'react-redux'
import UserEditor, { UserEditorProps } from '../UserEditor/UserEditor'

function UsersList() {
    const dispatch = useDispatch<AppDispatch>()
    const users = useSelector((state: any) => state.usersList.users)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return (
        users.map((user: UserEditorProps) => (
            <UserEditor
                key={user.id}
                id={user.id}
                username={user.username}
                full_name={user.full_name}
                email={user.email}
                is_staff={user.is_staff}
            />
        ))
    )
}

export default UsersList