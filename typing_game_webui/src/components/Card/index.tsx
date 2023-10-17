import { Link } from "react-router-dom";
import { IProps } from "./types";

export default function Card(props: IProps): JSX.Element {
  return (
    <div>
      <div className="block min-w-fit p-6 px-8 bg-white border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700  ">
        <h5 className="mb-2 text-2xl font-bold bg-inherit tracking-tight text-gray-900 dark:text-white">
          {props.title}
        </h5>
        <p className="font-normal  dark:text-gray-400 bg-inherit pb-6">{props.subTitle}</p>

        {props.createButton && props.joinButton ? (
          <>
            <Link
              to={props.path}
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              {props.createButton}
            </Link>
            <Link
              to={props.path}
              type="button"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              {props.joinButton}
            </Link>
          </>
        ) : (
          <Link
            to={props.path}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            {props.button}
          </Link>
        )}
      </div>
    </div>
  );
}
