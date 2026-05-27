import { useQuery } from "@tanstack/react-query";
import { fetchPostById, type Post } from "../../API/api";
import { NavLink, useParams } from "react-router-dom";

export const FetchIndv = () => {
  const id = Number(useParams().id);

  const { data, isLoading, isError, error } = useQuery<Post, Error>({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
    staleTime: 10000,
  });

  if (isLoading) return <div className="m-5">Loading...</div>;
  if (isError)
    return <div className="m-5">An error has occurred: {error.message}</div>;

  return (
    <div className="m-5 text-white">
      <h2 className="text-2xl font-bold">{data?.title}</h2>
      <p className="mt-2 text-sm text-slate-300">Post ID: {data?.id}</p>
      <p className="mt-4">{data?.body}</p>
      <NavLink
        to="/new"
        className="mt-4 inline-block text-blue-400 hover:underline"
      >
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Back to Posts
        </button>
      </NavLink>
    </div>
  );
};
