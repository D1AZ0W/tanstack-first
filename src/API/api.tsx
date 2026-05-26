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

export const fetchPosts = () => {
  return api.get<Post[]>("/posts");
};
