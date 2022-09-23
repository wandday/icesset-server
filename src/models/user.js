import {pool } from '../index'
import uuid4 from "uuid4"

export const findUserByEmail = async (email) => {
   return await pool.query('select * from users where email=?', [email])
}

export const findUserById = async (user_id) => {
    return await pool.query('select * from users where user_id=?', [user_id])
 }

export const findAllUsers = async (limit, offset) => {
    return await pool.query('select * from users ORDER BY dateCreated DESC  LIMIT ? OFFSET ?',  [limit, offset])
 }

export const getAllUsersCount = async () => {
    return await pool.query('select COUNT(*) as total_users from users')
 }

export const createUser = async (user) => {

   let userId = uuid4()
   
    const {firstName, lastName, mobilePhone, email, password, role} = user
    return await pool.query('INSERT into users SET user_id=?, firstName=?, lastName=?, mobilePhone=?, email=?, password=?, role=?, userStatus=?',  [userId, firstName, lastName, mobilePhone, email, password, role, 'active'])
 }

export const updateUser = async (userId, update) => {
   //  console.log(user)
    const {firstName, lastName, mobilePhone, email, role,} = update
    return await pool.query('UPDATE users SET firstName=?, lastName=?, mobilePhone=?, email=?, role=?,  userStatus=? where user_id=?',  [firstName, lastName, mobilePhone, email, role, 'active', userId])
 }


 export const suspendUser = async (userId) => {
   //  console.log(user)
    return await pool.query('UPDATE users SET userStatus=? where user_id=?',  [ 'suspended', userId])
 }


 export const unsuspendUser = async (userId) => {
   //  console.log(user)
    return await pool.query('UPDATE users SET userStatus=? where user_id=?',  [ 'active', userId])
 }


 export const changePassword = async (passwordInfo) => {
   const {userId, currentPassword, newPassword} = passwordInfo
    return await pool.query('UPDATE users SET password=? where user_id=?',  [ newPassword, userId])
 }
