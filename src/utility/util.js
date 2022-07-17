//Hashing Password
const bcrypt = require('bcryptjs');

export const hashPassword = async (userPassword) => {
    const convertedUserPassword = userPassword.toString();
    const harshPassword = await bcrypt.hash(convertedUserPassword, 10);
    return harshPassword;
  };