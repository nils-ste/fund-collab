import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
      <NavBar />
      {/** Find out hot to space the page properly */}
      <main className="flex-1 mt-7 mb-7">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
