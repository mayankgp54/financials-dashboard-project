import { useEffect, useState } from "react";
import { APILIST } from "../api/ApiList";
import UrlList from "../api/UrlList";
import { formatCurrency, formatPercentage } from "../utils/formatCurrency";
import type { CardData } from "../types/interface";

const Card = () => {
  const [cardData, setCardData] = useState<CardData | null>(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${UrlList.baseUrl}/${APILIST.fetch_card_data}`,
      );
      const data = await response.json();
      setCardData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cardConfig = [
    { title: "Revenue", value: formatCurrency(cardData?.revenue) },
    { title: "Cost", value: formatCurrency(cardData?.cost) },
    { title: "Profit", value: formatCurrency(cardData?.profit) },
    { title: "Profit Margin", value: formatPercentage(cardData?.profitPct) },
    { title: "Material Cost", value: formatCurrency(cardData?.material) },
    { title: "Labour Cost", value: formatCurrency(cardData?.labour) },
    { title: "Variation", value: formatCurrency(cardData?.variation) },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
      {cardConfig.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-xl p-4 shadow text-center border border-gray-200"
        >
          <p className="text-gray-500 text-sm font-semibold">{item.title}</p>
          <p className="font-semibold text-sm">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
