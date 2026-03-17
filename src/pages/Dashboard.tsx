import Card from "../components/Card";
import ExpandRowTable from "../components/ExpandRowTable";

const Dashboard = () => {
  return (
    <>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold underline text-center mb-6">
          Project Financials Dashboard
        </h1>
        <Card />
        <ExpandRowTable />
      </div>
    </>
  );
};

export default Dashboard;
