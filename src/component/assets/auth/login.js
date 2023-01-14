import axios from "axios";

export const logging = async (email, pw) => {
    const userData = await axios.post(`${process.env.REACT_APP_BASEURL}/api/v1/login`, {
        email: email,
        password: pw,
    }, {
        headers: {
            apiKey: process.env.REACT_APP_APIKEY,
            "Content-Type": "application/json",
        }
    });

    return userData
}