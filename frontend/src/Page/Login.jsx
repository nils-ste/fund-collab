import { useNavigate } from "react-router";
import { useState } from "react";
import {logIn} from "../API/users"

function Login() {
  const [logInInformation, setLogInInformation] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const {name, value} = e.target;
    setLogInInformation((prev)=> ({...prev, [name]: value}))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try{
      const token = await logIn(logInInformation)
      localStorage.setItem("token", token);
      navigate("/projects")
    }
    catch (err) {
      console.error("Error on logIn:", err);
    }
  }
  return (
    <section className="bg-(--color-primary)">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-(--color-primary) rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-(--color-font-primary) md:text-2xl">
              Sign in to your account
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-(--color-font-primary)"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  className="bg-(--color-primary) border border-gray-300 text-(--color-font-primary) rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-(--color-font-primary) dark:text-(--color-primary)"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="bg-(--color-primary) border border-gray-300 text-(--color-font-primary) rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-(--color-border-primary) rounded bg-(--color-primary) focus:ring-3 focus:ring-primary-300 "
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-(--color-font-primary)"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                <a
                  href="#"
                  className="text-sm font-medium text-(--color-font-secondary) hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full text-(--color-button-font) bg-(--color-button) hover:bg-(--color-button-hover) focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>

              <p className="text-sm font-light text-(--color-font-primary)">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
