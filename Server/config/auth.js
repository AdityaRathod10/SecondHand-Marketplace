const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.SECRET; // Replace with your secret key

async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

async function createSession(userId) {
  if (!SECRET) {
    throw new Error("JWT Secret is not defined");
  }
  try {
    const token = jwt.sign({ userId }, SECRET, {
      expiresIn: "1d",
    });
    console.log("Token created:", token); // Log the generated token
    return { token };
  } catch (error) {
    console.error("Error creating JWT token:", error);
    throw error; // Re-throw the error to be handled in loginUser
  }
}


module.exports = {
  hashPassword,
  verifyPassword,
  createSession,
};
