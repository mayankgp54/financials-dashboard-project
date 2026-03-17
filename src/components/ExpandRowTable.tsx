import { useEffect, useState } from "react";
import API from "../api/Api";
import { APILIST } from "../api/ApiList";
import { formatCurrency, formatPercentage } from "../utils/formatCurrency";

export default function ExpandRowTable() {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await API("GET", APILIST.fetch_table_data);
      setData(response?.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const tableHeaders = [
    "Address",
    "Revenue",
    "Cost",
    "Profit",
    "Profit Margin",
    "Material Cost",
    "Labour Cost",
    "Variation",
  ];
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-8 px-4 py-2 text-gray-500 bg-gray-50 text-sm border-b">
        {tableHeaders.map((header, index) => (
          <div className="uppercase" key={index}>
            {header}
          </div>
        ))}
      </div>

      {/* Rows */}
      {data?.map((item: any, index: number) => {
        const opportunity = item.opportunity;
        const total = opportunity.totalActuals;

        return (
          <div key={index}>
            {/* Parent Row */}
            <div
              className="grid grid-cols-8 px-4 py-3 border-b items-center hover:bg-gray-50 cursor-pointer"
              onClick={() => setOpenRow(openRow === index ? null : index)}
            >
              <div>{opportunity.property.formatted_address}</div>
              <div>{formatCurrency(total.revenue)}</div>
              <div>{formatCurrency(total.cost)}</div>
              <div>{formatCurrency(total.profit)}</div>
              <div>{formatPercentage(total.profitPct)}</div>
              <div>{formatCurrency(total.material)}</div>
              <div>{formatCurrency(total.labour)}</div>
              <div>{formatCurrency(total.variation)}</div>
            </div>

            {/* Child Rows (job_types) */}
            {openRow === index &&
              opportunity.job_types?.map((job: any, i: number) => (
                <div
                  key={i}
                  className="grid grid-cols-8 px-8 py-2 text-sm text-gray-600 bg-gray-50 border-b"
                >
                  <div>↳ {job.name}</div>
                  <div> {formatCurrency(job.actuals?.revenue)}</div>
                  <div> {formatCurrency(job.actuals?.cost)}</div>
                  <div> {formatCurrency(job.actuals?.profit)}</div>
                  <div>{formatPercentage(job.actuals?.profitPct)}</div>
                  <div> {formatCurrency(job.actuals?.material)}</div>
                  <div> {formatCurrency(job.actuals?.labour)}</div>
                  <div>{formatCurrency(job.actuals?.variation)}</div>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
}
