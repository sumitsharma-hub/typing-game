import { MutableRefObject, useRef, useEffect } from "react";
import { getGoogleAuthUrl } from "../../utils";
import { useAuth } from "../../hooks/useAuth";
import { fetchProfile, profileSelector } from "../../features/profileSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Cookies from "js-cookie";
import { setLoggedIn } from "../../features/authSlice";

function Login() {
  const { login, isLoggedIn } = useAuth();
  const inputEmail: MutableRefObject<HTMLInputElement> = useRef(null!);
  const inputPassword: MutableRefObject<HTMLInputElement> = useRef(null!);
  const dispatch = useAppDispatch();
  const selector = useAppSelector(profileSelector);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const profilePhoto = selector?.profileImage;

    const loginPayload = {
      email: inputEmail.current?.value,
      password: inputPassword.current?.value,
      profilePhoto: profilePhoto,
    };
    await login(loginPayload);
  };

  

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 h-screen">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid place-items-center gap-8 lg:gap-16 bg-inherit h-full">
          <div className="flex justify-center w-100% mx-auto ">
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white bg-inherit">Sign in to Keygen</h2>
              <form className="mt-8 bg-inherit space-y-6" action="#" method="post">
                <div className="bg-inherit">
                  <label
                    htmlFor="email"
                    className="block bg-inherit mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    ref={inputEmail}
                    id="email"
                    className="bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div className="bg-inherit">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 bg-inherit dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    name="password"
                    ref={inputPassword}
                    id="password"
                    placeholder="enter password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  onClick={(e) => handleLogin(e)}
                  className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-900 dark:text-white bg-inherit">
                  Not registered yet?{" "}
                  <a href="/register" className="text-blue-600 bg-inherit hover:underline dark:text-blue-500">
                    Create account
                  </a>
                </div>
                <a
                  href={getGoogleAuthUrl()}
                  type="button"
                  className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 19"
                    style={{ background: "inherit" }}
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Sign in with Google
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
