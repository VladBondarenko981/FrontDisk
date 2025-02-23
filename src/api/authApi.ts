import axios from "axios";
import { userRegistration } from "../interfaces/Interfaces";
import { userLogin } from "../interfaces/Interfaces";

export const handleRegistration = async ({
  email,
  password,
}: userRegistration) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/auth/registration",
      {
        email,
        password,
      }
    );
    const token = response.data.token;
    return token;
  } catch (error) {
    console.error("Не удалось зарегистрироваться", error);
    throw error;
  }
};

export const handleLogin = async ({ email, password }: userLogin) => {
  try {
    const response = await axios.post("http://localhost:5000/auth/login", {
      email,
      password,
    });
    const token = response.data.token;
    return token;
  } catch (error) {
    console.error("Не удалось войти", error);
    throw error;
  }
};
