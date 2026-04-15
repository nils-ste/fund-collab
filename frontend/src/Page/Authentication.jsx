import { useNavigate } from "react-router";
import { useState, useContext, useEffect } from "react";
import { logIn, signUp } from "../API/users";
import { AuthContext } from "../Context/authContext";

export default function Authentication() {
  const [logInInformation, setLogInInformation] = useState({
    email: "",
    password: "",
  });
  const [register, setRegister] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate();
  const { userId, fetchUser, loading } = useContext(AuthContext);

  function handleChange(e) {
    const { name, value } = e.target;
    setLogInInformation((prev) => ({ ...prev, [name]: value }));
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true)
    try {
      await logIn(logInInformation);
      await fetchUser();
      navigate("/projects");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Error on logIn:", err);
      setIsSubmitting(false)
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true)
    try {
      const user = await signUp(logInInformation);
      await fetchUser();
      setRegister(false);
      setIsSubmitting(false)
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error("Error on Signup:", err);
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!loading && userId) {
      navigate("/projects");
    }
  }, [userId, loading, navigate]);

  return (
    <section className="bg-(--color-primary)">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full bg-(--color-primary) rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-(--color-font-primary) md:text-2xl">
              {register ? "Register your Account" : "Sign in to your account"}
            </h1>

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={register ? handleSignUp : handleLogin}
            >
              {error && (
                <div className="p-4 text-sm text-red-800 bg-red-100 rounded-lg border border-red-300">
                  {error}
                </div>
              )}
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
                disabled={isSubmitting}
                className="w-full text-(--color-button-font) bg-(--color-button) hover:bg-(--color-button-hover) focus:ring-4 focus:outline-none focus:ring-(--color-button-focus) font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {isSubmitting ? "Loading..." : register ? "Sign up" : "Sign in"}
              </button>

              <p className="text-sm font-light text-(--color-font-primary)">
                {register
                  ? "Already have an Account? "
                  : "Don’t have an account yet? "}
                <a
                  onClick={() => setRegister((prev) => !prev)}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {!register ? "Sign up" : "Sign in"}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
