import { Link, Outlet } from "react-router-dom";
import "../styles/Layout.css";

export const Layout = () => {
  return (
    <div className="layout">
      <header>
        <Link className="theLinks" to={"/"}>
          {" "}
          The Zoom Zoo{" "}
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>By Behrens</footer>
    </div>
  );
};
