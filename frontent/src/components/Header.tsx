import { Link } from "react-router-dom";
import { MainNav } from "./MainNav";
import MobileNav from "./MobileNav";

export const Header = () => {
  return (
    <div className="py-6 border-b-2 border-b-orange-500">
      <div className="container flex items-center justify-between mx-auto">
        <Link
          to={"/"}
          className="text-3xl font-bold text-orange-500 tracking-light"
        >
          EatExpress.com
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};
