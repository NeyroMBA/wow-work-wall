import { Link } from "react-router-dom";
import logo from "@/assets/ina-logo-dark.svg";

const V5Nav = () => (
  <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: "hsl(0 0% 4% / 0.7)" }}>
    <div className="flex items-center px-6 md:px-10 py-4">
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="ИНА" className="h-8 w-auto" />
      </Link>
    </div>
    <div className="v5-rule mx-6 md:mx-10" />
  </header>
);

export default V5Nav;
