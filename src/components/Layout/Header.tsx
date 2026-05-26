import { NavLink } from "react-router-dom";
export const Header = () => {
  return (
    <div className=" bg-slate-900 text-slate-100">
      <div className="p-4 items-center justify-center flex">
        <h1 className="text-4xl bold px-3">TanStack First</h1>
        <img src="/favicon.svg" alt="Logo" className="h-10 w-10" />
      </div>
      <nav className="px-4 m-4 items-center justify-around flex bg-blue-200 text-black rounded-lg">
        <NavLink to="/" className="px-2 m-2 text-xl sm:text-lg">
          Home
        </NavLink>
        <NavLink to="/old" className="px-2 m-2 text-xl sm:text-lg">
          FetchOld
        </NavLink>
        <NavLink to="/new" className="px-2 m-2 text-xl sm:text-lg">
          FetchRQ
        </NavLink>
        <NavLink to="/quickstart" className="px-2 m-2 text-xl sm:text-lg">
          QuickStart
        </NavLink>
      </nav>
    </div>
  );
};
