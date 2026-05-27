import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../API/api";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
export const Infinite = () => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });

  // const handleScroll = () => {
  //   const bottom =
  //     window.innerHeight + window.scrollY >=
  //     document.documentElement.scrollHeight - 1;

  // if (bottom && hasNextPage) {
  //   fetchNextPage();
  // }
  // };

  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    // window.addEventListener("scroll", handleScroll);
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView]);

  if (isLoading) return <div className="text-white m-5">Loading...</div>;
  if (isError)
    return (
      <div className="text-white m-5">
        An error has occurred while fetching users.
      </div>
    );
  return (
    <div>
      <h1 className="text-white m-5 text-2xl font-bold">GitHub Users</h1>
      <div className="text-white m-5 space-y-4">
        {data?.pages?.map((page, index) => (
          <ul key={index} className="space-y-2">
            {page.map(
              (user: { id: number; login: string; avatar_url: string }) => (
                <li key={user.id} className="bg-gray-800 p-4 rounded-lg">
                  <p className="text-lg font-bold">{user.login}</p>
                  <p className="text-sm text-gray-500">ID: {user.id}</p>
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-16 h-16 rounded-full"
                  />
                </li>
              ),
            )}
          </ul>
        ))}
      </div>
      <div ref={ref}>
        {isFetchingNextPage && (
          <div className="text-white m-5">Loading more users...</div>
        )}
      </div>
    </div>
  );
};
