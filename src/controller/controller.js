import axios from 'axios';

const API_URL = 'https://server-ggc6w24fq-edustadler.vercel.app';


export const fetchPosts = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/posts`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to fetch posts');
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const createPost = async (token, formData) => {
    try {
        const response = await axios.post(`${API_URL}/posts`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', // Make sure to set the correct content type for formData
            },
        });

        if (response.status === 201) {
            return response.data;
        } else {
            console.error('Failed to create a post');
            return [];
        }
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const likePost = async (token, postId, userId) => {
    try {
        const response = await axios.patch(
            `${API_URL}/posts/${postId}/like`,
            { userId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Failed to like the post');
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};

// Add more API functions as needed

// Example usage:
// import { fetchPosts, createPost, likePost } from './apiController';
