import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultsInfo = ({ total, city }: Props) => {
  return (
    <div className="flex justify-between flex-1 gap-3 text-xl font-bold lg:items-center lg:flex-row">
      <span>
        {total} Restaurants found in {city}
        <Link
          to={"/"}
          className="text-sm font-semibold text-blue-500 underline cursor-pointer"
        >
          change location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultsInfo;
