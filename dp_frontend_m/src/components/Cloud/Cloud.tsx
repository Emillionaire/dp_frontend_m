import { useEffect } from 'react'
import './Cloud.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootState } from "@reduxjs/toolkit/query"
import { useSelector, useDispatch } from 'react-redux'
import { fetchUser } from '../_rtk/slices/userSlice'
import { JwtPayload, jwtDecode } from "jwt-decode";
import { AppDispatch } from '../_rtk/store'
import { Outlet } from 'react-router-dom'



export default function CloudPage() {
    const navigate = useNavigate();
    const params = useLocation()

    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()

    const token: JwtPayload & { user_id: number } = jwtDecode(localStorage.getItem('token') || '')

    useEffect(() => {
        if (token.user_id) {
            dispatch(fetchUser(token.user_id))
        }
    }, [token.user_id])

    function handleLogout() {
        localStorage.clear()
        return navigate("/");
    }

    return (
        <div className='workspace'>
            <div>
                {params.pathname === '/cloud/users' &&
                    <button onClick={() => navigate('/cloud/files')} className='list-btn'>Files List</button>}
                {params.pathname === '/cloud/files'
                    && user.is_staff
                    && <button onClick={() => navigate('/cloud/users')} className='list-btn'>Users List</button>}
                <div>
                    Your user ID: {user.id}<br />
                    Your username: {user.username}<br />
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <Outlet />
            </div>
        </div>
    )
}
