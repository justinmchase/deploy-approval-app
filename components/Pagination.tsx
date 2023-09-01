import { Page } from "../shared/api.ts";

type Props<T> = {
  page: Page<T>;
};
export default function Pagination<T,>(props: Props<T>) {
  const { page: { total, offset, limit } } = props;
  const pageCount = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;
  const previousPage = currentPage > 1;
  const nextPage = currentPage < pageCount;
  return (
    <div class="flex justify-center p-4 sm:p-6 lg:p-8">
      <nav aria-label="Pagination">
        <ul class="inline-flex items-center space-x-1 rounded-md text-sm">
          <li>
            <button
              href="#"
              class="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300"
              disabled={!previousPage}
            >
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Previous</span>
            </button>
          </li>
          <li>
            <span class="inline-flex items-center rounded-md bg-white px-4 py-2 text-gray-500">
              Page <b class="mx-1">{currentPage}</b> of{" "}
              <b class="ml-1">{pageCount}</b>
            </span>
          </li>
          <li>
            <button
              class="inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300"
              disabled={!nextPage}
            >
              <span>Next</span>
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
