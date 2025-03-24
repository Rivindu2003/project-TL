import axios from "axios";

const API_URL = "http://localhost:5000/api/reviews";

export const getReviews = async() => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addReview = async(review) => {
    const response = await axios.post(API_URL, review);
    return response.data;
};

export const updateReview = async(id, review) => {
    const response = await axios.put(`${API_URL}/${id}`, review);
    return response.data;
};

export const deleteReview = async(id) => {
    await axios.delete(`${API_URL}/${id}`);
};