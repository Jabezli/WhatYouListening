/**
 * Higher-order function for async/await error handling
 * @param {function} fn an async function
 * @returns {function}
 * In our App.js file we can import the catchErrors() function and wrap it around our invocation of fetchData() (our async function).
 * Once we do that, we can safely remove the try/catch block.
 */
export const catchErrors = (fn) => {
  return function (...args) {
    return fn(...args).catch((err) => {
      console.error(err);
    });
  };
};
