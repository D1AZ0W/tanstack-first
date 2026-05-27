import axios from "axios";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const fetchPosts = async (page: number) => {
  try {
    const res = await api.get<Post[]>(`/posts?_page=${page}&_limit=5`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const fetchPostById = async (id: number) => {
  try {
    const res = await api.get<Post>(`/posts/${id}`);
    return res.status === 200 ? res.data : ({} as Post);
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return {} as Post;
  }
};

//delete post
export const deletePost = (id: number) => {
  return api.delete(`/posts/${id}`);
};

//update post title
export const updatePost = (id: number, updatedTitle: string) => {
  return api.patch(`/posts/${id}`, { title: updatedTitle });
};

//infinite scroll
export const fetchUsers = async ({ pageParam = 1 }) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users?per_page=10&page=${pageParam}`,
    );
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
