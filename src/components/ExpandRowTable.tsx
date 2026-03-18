import { useEffect, useState } from "react";
import API from "../api/Api";
import { APILIST } from "../api/ApiList";
import { formatCurrency, formatPercentage } from "../utils/formatCurrency";
import { renderValue } from "../utils/helper";
import DownIcon from "./icons/DownIcon";
import UpIcon from "./icons/UpIcon";

const tableHeaders = [
  "Address",
  "Job Types",
  "Revenue",
  "Cost",
  "Profit",
  "Profit Margin",
  "Material Cost",
  "Labour Cost",
  "Variation",
];

export default function ExpandRowTable({ search }: { search: string }) {
  const [openRow, setOpenRow] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchData = async (pageNumber = 1, isLoadMore = false) => {
    try {
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const url = search
        ? `${APILIST.fetch_table_data}?search=${encodeURIComponent(search)}&page=${pageNumber}`
        : `${APILIST.fetch_table_data}?page=${pageNumber}`;

      const response = await API("GET", url);

      if (response?.status === 200) {
        const newData = response?.data || [];

        if (isLoadMore) {
          setData((prev) => [...prev, ...newData]);
        } else {
          setData(newData);
        }

        if (newData.length === 0) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setLoadingMore(false);
      }, 1000);
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchData(1, false);
  }, [search]);

  const filteredData = data.filter((item: any) => {
    const searchText = search.toLowerCase();

    const address =
      item?.opportunity?.property?.formatted_address?.toLowerCase() || "";

    const jobTypes = item?.opportunity?.job_types || [];

    const jobMatch = jobTypes.some((job: any) =>
      job?.name?.toLowerCase().includes(searchText),
    );

    return address.includes(searchText) || jobMatch;
  });
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (
      scrollHeight - scrollTop <= clientHeight + 50 &&
      hasMore &&
      !loadingMore
    ) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage, true);
    }
  };
  const getProfitColor = (value: number) => {
    if (value === 0) return "text-gray-500 ";
    if (value > 40) return "text-green-600 ";
    if (value >= 20 && value <= 40) return "text-orange-500 ";
    return "text-red-500 ";
  };
  return (
    <div className="bg-white rounded-2xl shadow">
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">
          {/*Table Header */}
          <div className="grid grid-cols-[2.5fr_repeat(8,1fr)_40px] px-6 py-3 text-xs font-semibold rounded-t-2xl text-gray-500 uppercase border border-gray-300 bg-gray-50 sticky top-0 z-10">
            {tableHeaders.map((header, index) => (
              <div
                key={index}
                className={`text-black flex items-center ${
                  header === "Address" ? "justify-start" : "justify-center"
                }`}
              >
                {header === "Address" ? (
                  <span className="inline-flex items-center justify-center border border-gray-300 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 whitespace-nowrap">
                    Total: {filteredData.length}
                  </span>
                ) : (
                  header
                )}
              </div>
            ))}
            <div />
          </div>

          {/* Table Body */}
          <div
            className="max-h-125 overflow-y-auto overflow-x-hidden"
            onScroll={handleScroll}
          >
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[2.5fr_repeat(8,1fr)_40px] px-6 py-4 border-b animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="h-4 bg-gray-200 rounded w-1/2 mx-auto"
                    />
                  ))}
                </div>
              ))
            ) : filteredData.length === 0 ? (
              <div className="text-center py-10 text-gray-400">
                No data found
              </div>
            ) : (
              filteredData.map((item: any, index: number) => {
                const opportunity = item.opportunity;
                const total = opportunity.totalActuals;

                return (
                  <div key={index}>
                    <div
                      className={`grid grid-cols-[2.5fr_repeat(8,1fr)_40px] px-6 py-4 items-center border-gray-200 border cursor-pointer bg-white hover:bg-gray-100`}
                      onClick={() =>
                        setOpenRow(openRow === index ? null : index)
                      }
                    >
                      <div className="font-medium text-gray-800">
                        {opportunity?.property?.formatted_address || "-"}
                      </div>
                      <div className="text-sm text-center text-gray-600">
                        {opportunity?.job_types
                          ?.map((job: any) => job?.name)
                          .join(", ") || "-"}
                      </div>
                      {renderValue(total?.revenue, formatCurrency)}
                      {renderValue(total?.cost, formatCurrency)}
                      {renderValue(total?.profit, formatCurrency)}
                      <div
                        className={`text-center font-semibold ${getProfitColor(total?.profitPct || 0)}`}
                      >
                        {formatPercentage(total?.profitPct)}
                      </div>
                      {renderValue(total?.material, formatCurrency)}
                      {renderValue(total?.labour, formatCurrency)}
                      {renderValue(total?.variation, formatCurrency)}
                      <div className="flex justify-center">
                        {openRow === index ? <UpIcon /> : <DownIcon />}
                      </div>
                    </div>

                    {openRow === index &&
                      opportunity?.job_types?.map((job: any, i: number) => (
                        <div
                          key={i}
                          className="grid grid-cols-[2.5fr_repeat(8,1fr)_40px] px-6 py-4 text-sm text-gray-600 bg-gray-50 border border-gray-100"
                        >
                          <div className="flex items-center gap-2 ">
                            <span>↳</span>
                            {job?.name}
                          </div>
                          <div className="text-center">-</div>
                          {renderValue(job?.actuals?.revenue, formatCurrency)}
                          {renderValue(job?.actuals?.cost, formatCurrency)}
                          {renderValue(job?.actuals?.profit, formatCurrency)}
                          <div
                            className={`text-center font-semibold ${getProfitColor(job?.actuals?.profitPct || 0)}`}
                          >
                            {formatPercentage(job?.actuals?.profitPct)}
                          </div>
                          {renderValue(job?.actuals?.material, formatCurrency)}
                          {renderValue(job?.actuals?.labour, formatCurrency)}
                          {renderValue(job?.actuals?.variation, formatCurrency)}

                          <div />
                        </div>
                      ))}
                  </div>
                );
              })
            )}

            {loadingMore && (
              <div className="flex justify-center items-center py-4">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
