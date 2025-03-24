import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/ReviewListPage.css";
import { FaSearch, FaUserCircle, FaFilter } from "react-icons/fa";

const ReviewListPage = () => {
    const [reviews, setReviews] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchReviews = async() => {
            try {
                const response = await axios.get("http://localhost:5000/api/reviews");
                setReviews(response.data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        };

        fetchReviews();
    }, []);

    const handleDelete = async(id) => {
        try {
            await axios.delete(`http://localhost:5000/api/reviews/${id}`);
            setReviews(reviews.filter((review) => review._id !== id));
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    const handleEdit = (id) => {
        alert(`Edit feature for review ID: ${id} is under development!`);
    };

    const filteredReviews = reviews.filter((review) =>
        review.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return ( <
        div className = "review-list-container" >
        <
        header >
        <
        h2 > Review List < /h2> <
        div className = "search-container" >
        <
        FaSearch className = "search-icon" / >
        <
        input type = "text"
        placeholder = "Search"
        value = { searchTerm }
        onChange = {
            (e) => setSearchTerm(e.target.value) }
        /> <
        FaFilter className = "filter-icon" / >
        <
        /div> <
        /header>

        <
        div className = "reviews-grid" > {
            filteredReviews.map((review) => ( <
                div key = { review._id }
                className = "review-card" >
                <
                div className = "review-header" >
                <
                FaUserCircle className = "profile-icon" / >
                <
                h3 > { review.userName } < /h3> <
                /div> <
                div className = "review-rating" > { "★".repeat(review.rating) } { "☆".repeat(5 - review.rating) } <
                /div> <
                p className = "review-comment" > { review.comment } < /p> <
                div className = "review-actions" >
                <
                button className = "edit-btn"
                onClick = {
                    () => handleEdit(review._id) } > Edit < /button> <
                button className = "delete-btn"
                onClick = {
                    () => handleDelete(review._id) } > Delete < /button> <
                /div> <
                /div>
            ))
        } <
        /div> <
        /div>
    );
};

export default ReviewListPage;