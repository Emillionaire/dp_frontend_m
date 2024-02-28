import Cloud from '../Cloud/Cloud';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import './Main.css';
import { Route, Routes } from "react-router-dom";


const Main = () => {
    return (
        <div className="main">
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='registration/' element={<Registration/>}/>
                <Route path='cloud/' element={<Cloud/>}/>
            </Routes>
        </div>
    );
};

export default Main;