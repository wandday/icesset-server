//Hashing Password

import bcrypt from 'bcryptjs';

export const hashPassword = async (userPassword) => {
    const convertedUserPassword = userPassword.toString();
    const harshPassword = await bcrypt.hash(convertedUserPassword, 10);
    console.log(convertedUserPassword)
    return harshPassword;
  };