import {pool } from '../index'

export const findUserByEmail = async (email) => {
   return await pool.query('select email from users where email=?', [email])
}

export const findUserById = async (user_id) => {
    return await pool.query('select * from users where user_id=?', [user_id])
 }

export const createUser = async (user) => {
    console.log(user)
    const {firstName, lastName, mobilePhone, email, password, role} = user
    return await pool.query('INSERT into users SET firstName=?, lastName=?, mobilePhone=?, email=?, password=?, role=?',  [firstName, lastName, mobilePhone, email, password, role])
 }