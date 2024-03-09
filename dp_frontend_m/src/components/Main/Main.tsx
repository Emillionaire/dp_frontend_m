import Cloud from '../Cloud/Cloud';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import UsersList from '../UsersList/UsersList';
import FilesList from '../FilesList/FilesList';
import './Main.css';
import { Route, Routes } from "react-router-dom";


const Main = () => {
    return (
        <div className="main">
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='registration/' element={<Registration />} />
                <Route path='cloud' element={<Cloud />} children={
                    [
                        <Route path='files' element={<FilesList />} key={"files"}/>,
                        <Route path='users' element={<UsersList />} key={"users"} />
                    ]
                } />
            </Routes>
        </div>
    );
};

export default Main;