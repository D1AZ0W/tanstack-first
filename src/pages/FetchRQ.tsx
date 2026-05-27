import { useQuery } from "@tanstack/react-query";
import { fetchPosts, type Post } from "../API/api";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { keepPreviousData } from "@tanstack/react-query";

export const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchPosts(pageNumber),
    //gcTime: 1000 * 5, // Garbage collection time for the cached data (optional)
    // staleTime: 10000, // Time before the data is considered stale (optional)
    // refetchInterval: 15000, // Refetch data every 15 seconds when window active (optional)
    // refetchIntervalInBackground: true, // Continue refetching even when the window is not active (optional)
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <div className="text-white m-5">Loading...</div>;

  if (isError)
    return (
      <div className="text-white m-5">
        An error has occurred: {error.message}
      </div>
    );

  return (
    <div className="text-white m-5">
      <h1>Posts</h1>
      <ul className="space-y-4">
        {data.map((post) => {
          const { id, title, body } = post;
          return (
            <li key={id} className="bg-gray-800 p-10 rounded-4xl m-3">
              <NavLink to={`/new/${id}`} className="hover:no-underline">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-sm text-gray-500">ID: {id}</p>
                <p className="text-gray-300">{body}</p>
              </NavLink>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-center mt-5">
        <button
          onClick={() => setPageNumber((prev) => prev - 1)}
          className="bg-blue-500 px-10 py-5 m-5 disabled:text-gray-400 disabled:cursor-not-allowed"
          disabled={pageNumber === 1 ? true : false}
        >
          Prev
        </button>
        <h3 className="text-xl font-bold mx-5">{pageNumber}</h3>
        <button
          onClick={() => setPageNumber((prev) => prev + 1)}
          className="bg-blue-500 px-10 py-5 m-5"
        >
          Next
        </button>
      </div>
    </div>
  );
};
