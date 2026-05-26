import { useQuery } from "@tanstack/react-query";
import { fetchPosts, type Post } from "../API/api";

export const FetchRQ = () => {
  const getPosts = async (): Promise<Post[]> => {
    try {
      const res = await fetchPosts();
      return res.status === 200 ? res.data : [];
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: getPosts,
    //gcTime: 1000 * 5, // Garbage collection time for the cached data (optional)
    staleTime: 10000, // Time before the data is considered stale (optional)
    refetchInterval: 15000, // Refetch data every 15 seconds when window active (optional)
    refetchIntervalInBackground: true, // Continue refetching even when the window is not active (optional)
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
            <li key={id} className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-sm text-gray-500">ID: {id}</p>
              <p className="text-gray-300">{body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
