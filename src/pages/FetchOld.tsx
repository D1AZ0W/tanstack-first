import { useState, useEffect } from "react";
import { fetchPosts, type Post } from "../API/api";
export const FetchOld = () => {
  const [posts, setposts] = useState<Post[]>([]);

  const getPostData = async () => {
    try {
      const res = await fetchPosts();
      if (res.status === 200) {
        setposts(res.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div className="text-white m-5">
      <h1>Posts</h1>
      <ul className="space-y-4">
        {posts.map((post) => {
          const { id, title, body } = post;
          return (
            <li key={id} className="bg-gray-800 p-4 rounded-lg">
              <h2>{title}</h2>
              <p>{id}</p>
              <p>{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
