import { axiosClient } from "../client/axiosClient";

// GET all posts
export const getPosts = async () => {
    const res = await axiosClient.get("/api/posts?populate=*");
    return res.data;
};

// GET single post
export const getPostById = async (id: number) => {
    const res = await axiosClient.get(`/api/posts/${id}?populate=*`);
    return res.data;
};