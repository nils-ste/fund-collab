import { Outlet, useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { AuthContext } from "../../Context/authContext";

export default function Layout() {
  const { userId, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !userId) {
      navigate("/authentication");
    }
  }, [userId, loading]);

  return (
    <div className="min-h-screen bg-{--color-primary} flex flex-col">
      <NavBar />
      <main className="flex-1 mt-7 mb-7">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <h1 className="flex items-center justify-center min-h-screen text-xl text-(--color-font-secondary)">
              Loading...
            </h1>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
}
