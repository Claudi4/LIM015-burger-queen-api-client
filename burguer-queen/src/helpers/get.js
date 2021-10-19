import { helpHttp } from "./helpHttp";

const url = 'https://api-burguerqueen-am27th.herokuapp.com';

export const getUserById = async (email, token) => {
  try {
    let options = {
      headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    };
    const response = await helpHttp().get(`${url}/users/${email}`, options)
    return response;
  } catch (error) {
    return { err: true, message: error.message, status: '500', statusText: 'Ocurrió un error'};
  }
}