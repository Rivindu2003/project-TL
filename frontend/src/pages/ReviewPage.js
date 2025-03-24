import React, { useState } from "react";
import axios from "axios";
import "./../styles/ReviewPage.css";

const ReviewPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: null,
        rating: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setFormData({...formData, image: e.target.files[0] });
    };

    const handleRating = (ratingValue) => {
        setFormData({...formData, rating: ratingValue });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!formData.name || !formData.description || formData.rating === 0) {
            alert("Please fill all required fields and select a rating!");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("rating", Number(formData.rating)); // Ensure it's a number

        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            const response = await axios.post("http://localhost:5000/api/reviews", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            console.log("Server Response:", response.data);
            alert("Review posted successfully!");

            setFormData({ name: "", description: "", image: null, rating: 0 });
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("Failed to post review. Please try again.");
        }
    };

    return ( <
        div className = "review-container" >
        <
        h2 > Post A Review < /h2> <
        form onSubmit = { handleSubmit }
        className = "review-form" >
        <
        input type = "text"
        name = "name"
        placeholder = "Name"
        value = { formData.name }
        onChange = { handleChange }
        required / >
        <
        textarea name = "description"
        placeholder = "Description"
        value = { formData.description }
        onChange = { handleChange }
        required / >

        <
        div className = "image-upload" >
        <
        label htmlFor = "imageUpload" > If Any Images < /label> <
        input type = "file"
        id = "imageUpload"
        onChange = { handleImageChange }
        /> < /
        div >

        <
        div className = "rating-section" >
        <
        p > Your Rating < /p> <
        div className = "stars" > {
            [1, 2, 3, 4, 5].map((star) => ( <
                span key = { star }
                className = { formData.rating >= star ? "star selected" : "star" }
                onClick = {
                    () => handleRating(star)
                } > ★
                <
                /span>
            ))
        } <
        /div> < /
        div >

        <
        button type = "submit"
        className = "submit-btn" > Post < /button>

        { /* ✅ New "View Reviews" Button */ } <
        button type = "button"
        className = "view-reviews" > View Reviews < /button> < /
        form > <
        /div>
    );
};

export default ReviewPage;