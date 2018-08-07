import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../../services/user';

const AuthButton = (props) => {
    if (isLoggedIn()) {
        return <Link className="btn clickable mt-0" to="/logout">Logout</Link>;
    } else {
        return <Link className="btn clickable mt-0" to="/login">Login</Link>;
    }
};

export default AuthButton;