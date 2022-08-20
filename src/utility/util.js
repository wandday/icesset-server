//Hashing Password

import bcrypt from 'bcryptjs';

export const hashPassword = async (userPassword) => {
    const convertedUserPassword = userPassword.toString();
    const harshPassword = await bcrypt.hash(convertedUserPassword, 10);
    console.log(convertedUserPassword)
    return harshPassword;
  };


  export const hashResetString = async (resetString) => {
    const convertedResetString = resetString.toString();
    const hashResetString = await bcrypt.hash(convertedResetString, 10);
    return hashResetString;
  };