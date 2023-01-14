import axios from "axios"

const local = localStorage.getItem("myObject");
const obj = JSON.parse(local);
export let sesi = {}
for (const i in obj) {
    sesi = obj[i];
};

export const getFood = async () => {
    const foods = await axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/foods`, {
        headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
            'Authorization': 'Bearer ' + sesi.token,
        },
    });
    return foods.data.data
};

export const allUser = async () => {
    const orang = await axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/all-user`, {
        headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
            'Authorization': 'Bearer ' + sesi.token,
        },
    });
    return orang.data.data;
};

export const uploadImage = async (img) => {
    const poto = await axios.post(`${process.env.REACT_APP_BASEURL}/api/v1/upload-image`,
        {
            image: img,
        },
        {
            headers: {
                apiKey: `${process.env.REACT_APP_APIKEY}`,
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + sesi.token,
            },
        });
    return poto.data.url
}

export const regisImg = async (image) => {
    const imgRegis = await axios.post(`${process.env.REACT_APP_BASEURL}/api/v1/upload-image`,
        {
            image: image
        },
        {
            headers: {
                apiKey: process.env.REACT_APP_APIKEY,
                "Content-Type": "multipart/form-data",
            }
        })
    return imgRegis.data.url
}


export const hapus = async (id) => {
    const dlte = await axios.delete(`${process.env.REACT_APP_BASEURL}/api/v1/delete-food/${id}`, {
        headers: {
            apiKey: `${process.env.REACT_APP_APIKEY}`,
            'Authorization': `Bearer ${sesi.token}`,
        }
    })
    return dlte;
}



export const detailFood = async (id) => {
    const ditel = await axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/foods/${id}`,
        {
            headers: {
                apiKey: process.env.REACT_APP_APIKEY,
            }
        })
    return ditel.data.data
}

export const getRating = async (idFood) => {
    const datas = await axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/food-rating/${idFood}`,
        {
            headers: {
                apiKey: process.env.REACT_APP_APIKEY,
            }
        })
    return datas.data.data;
}

export const createRate = async (idFood, review, star) => {
    const rating = await axios.post(`${process.env.REACT_APP_BASEURL}/api/v1/rate-food/${idFood}`,
        {
            rating: star,
            review: review
        },
        {
            headers: {
                apiKey: process.env.REACT_APP_APIKEY,
                "Authorization": `Bearer ${sesi.token}`,
            }
        })
    return rating
}

export const userLikeFood = async () => {
    const foods = await axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/like-foods`,
        {
            headers: {
                "Authorization": `Bearer ${sesi.token}`,
                apiKey: process.env.REACT_APP_APIKEY,
            }
        })
    return foods.data.data
}

export const getUser = async () => {
    const people = await axios.get(`${process.env.REACT_APP_BASEURL}/api/v1/user`,
        {
            headers: {
                apiKey: process.env.REACT_APP_APIKEY,
                "Authorization": `Bearer ${sesi.token}`
            }
        })
    return people.data.user
}