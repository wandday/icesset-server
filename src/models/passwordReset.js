import {pool } from '../index'

import uuid4 from "uuid4"

export const sendRestEmail = async (resetInfo) => {
    console.log(resetInfo)
    const {user_id, email, redirectURL} = resetInfo
    // return await pool.query('INSERT into users SET firstName=?, lastName=?, mobilePhone=?, email=?, password=?, role=?, userStatus=?',  [firstName, lastName, mobilePhone, email, password, role, 'active' ])
 }

