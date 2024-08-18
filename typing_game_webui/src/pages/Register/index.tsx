import React, { useEffect, useState } from "react";
import getGoogleAuthUrl from "../../utils/getGoogleAuthURL";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch, useAppSelector } from "../../hooks";
import  { fetchProfile } from "../../features/profileSlice";

function Register() {
  const {  register } = useAuth();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePhoto: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);

  const handleRegisteration = async (e: React.FormEvent) => {
    e.preventDefault();
    const image = selector?.profileImage;
    const updatedFormData={ ...formData, profilePhoto: image };
    await register(updatedFormData);
    setFormData(updatedFormData);
  };

  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid place-items-center gap-8 lg:gap-16   ">
      <form className="rounded-lg  p-10 dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white bg-inherit ">Register </h2>
        <div className="py-8 grid justify-between grid-flow-col-dense gap-8 dark:bg-gray-800">
          <div className="bg-inherit">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-inherit">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="first name ..."
              required
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="bg-inherit">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-inherit">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => handleInputChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="last name ..."
              required
            />
          </div>
        </div>
        <div className="mb-6 bg-inherit">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-inherit">
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => handleInputChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required
          />
        </div>
        <div className="mb-6 bg-inherit">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-inherit">
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => handleInputChange(e)}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6 bg-inherit">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white bg-inherit">
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="••••••••"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange(e)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          onClick={(e) => handleRegisteration(e)}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <br />
        <a
          href={getGoogleAuthUrl()}
          type="button"
          className="text-white wflex justify-center mt-5 mx-auto bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
        >
          <svg
            className="w-4 h-4 mr-2 bg-inherit"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
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
  );
}

export default Register;
