import { useState, useEffect } from "react";

import { LOCAL_STORAGE_KEY } from "../../constants";
import { getCookies } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useAuth } from "../../hooks/useAuth";
import userSlice, { fetchUser, userSelector } from "../../features/userSlice";
import { ClearInfo } from "../../features/userSlice";

const Navbar = () => {
  const [CookieAccessToken, setCookieAccessToken] = useState<string | undefined>("");
  const [localStorageToken, setLocalStorageToken] = useState<string | null>("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [uniqueName,setUniqueName]=useState<string | null>("");
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState("");

  const dispatch = useAppDispatch();
  const selector = useAppSelector(userSelector);

  const Auth = useAuth();


  useEffect(() => {
    const { access_token } = getCookies();
    setLoading(selector.status);
    setLocalStorageToken(localStorage.getItem(LOCAL_STORAGE_KEY));
    setCookieAccessToken(access_token);
    console.log(Auth.user,'this is userData--------------><<<<<<<<<<<<')
  }, []);
 

  const userData = selector.user;
  const picture = userData?.profilePhoto;
  const provider = userData?.provider;
  let userName:string | null = provider ? userData?.firstName : userData?.firstName + " " + userData?.lastName;

  const loggedInStatus =Auth.isLoggedIn; // Call it directly

  useEffect(() => {
    dispatch(fetchUser());
    console.log(loggedInStatus, 'isLoggedin---------->');
    if(!loggedInStatus){
      setUniqueName(localStorage.getItem("userNameNotLogged"));
      userName=uniqueName;
      console.log(userName," ------->");
    }
  }, []);
  const handleProfileMenuToggle = () => {
    if (showMenu) {
      setShowMenu(!showMenu);
    }
    setShowProfileMenu(!showProfileMenu);
  };
  const handleMenuToggle = () => {
    if (showProfileMenu) {
      setShowProfileMenu(!showProfileMenu);
    }
    setShowMenu(!showMenu);
  };

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(ClearInfo());
    Auth.logout();
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center nav_logo">
            <img
              src="https://media.edclub.com/website/feature/left-hand-typing-on-screen-hand-guides.png"
              className="h-8 mr-3"
              alt="keygen Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Keygen</span>
          </a>
          <div className="flex items-center md:order-2">
            <button
              type="button"
              className="relative w-12 h-12 flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={handleProfileMenuToggle}
            >
              <span className="sr-only">Open user menu</span>
              <div className="w-full h-full rounded-full">
                {picture ? (
                  <div className="w-12 h-12 rounded-full">
                    {picture &&
                    //  <div className="w-12 h-12 rounded-full" dangerouslySetInnerHTML={{ __html: picture }} />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="rounded-full"
                      width="100%"
                      height="100%"
                      dangerouslySetInnerHTML={{ __html: picture }}
            />
                  }
                  </div>
                ) : (
                  <img
                    className="w-12 h-12 rounded-full"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    alt="user photo"
                  />
                )}
              </div>
            </button>
            <div
              className={` max-w-md:none z-50 absolute top-10 right-5 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${
                showProfileMenu ? "block" : "hidden"
              }`}
              id="user-dropdown"
            >
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                  {userName !=null ? userName : ""}
                </span>
                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{userData?.email}</span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href={CookieAccessToken || localStorageToken ? "#" : "/login"}
                    onClick={(e) => (CookieAccessToken || localStorageToken ? handleLogout(e) : null)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    {CookieAccessToken || localStorageToken ? "SignOut" : "Sign in"}
                  </a>
                </li>
              </ul>
            </div>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
              onClick={handleMenuToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${
              !showMenu ? "hidden" : "block"
            } w-full md:flex md:w-auto md:order-1 
              `}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  LeaderBoard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Communities
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
