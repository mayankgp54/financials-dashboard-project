import { useState } from "react";
import Card from "../components/Card";
import ExpandRowTable from "../components/ExpandRowTable";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (value: string) => {
    console.log(value, "value");

    setSearch(value);
  };
  return (
    <>
      <div className="p-6 ">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6 relative">
          Project Financials Dashboard
          <span className="block w-16 h-1 bg-blue-500 mx-auto mt-2 rounded-full"></span>
        </h1>
        <SearchBar onSearch={handleSearch} />
        <Card />
        <ExpandRowTable search={search} />
      </div>
    </>
  );
};

export default Dashboard;
