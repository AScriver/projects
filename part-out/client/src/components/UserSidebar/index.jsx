import React from "react";
import { Input, FormBtn } from "../Form";
import "./index.css";

function UserSidebar(props) {
    return (
            <div className='row username'>
                <p>{props.post[0].User.UserId}</p>
            </div>
    )
}


export default UserSidebar;