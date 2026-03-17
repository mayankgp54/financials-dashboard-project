import { useState } from "react";

const data = [
  {
    address: "22 Binness Way, Portsmouth, PO6 1LE",
    revenue: "£1,888.68",
    cost: "£1,000.00",
    profit: "£888.68",
    margin: "47%",
    material: "£300.00",
    labour: "£500.00",
    variation: "£200.00",
  },
  {
    address: "24 Binness Way, Portsmouth, PO6 1LE",
    revenue: "£3,260.00",
    cost: "£2,280.00",
    profit: "£980.00",
    margin: "30%",
    material: "£2,460.00",
    labour: "£800.00",
    variation: "-",
    children: [
      {
        name: "Solar And Battery",
        revenue: "£2,860.00",
        cost: "£2,030.00",
        profit: "£830.00",
        margin: "29%",
        material: "£2,460.00",
        labour: "£400.00",
      },
      {
        name: "EV Charger",
        revenue: "£400.00",
        cost: "£250.00",
        profit: "£150.00",
        margin: "38%",
        material: "-",
        labour: "£400.00",
      },
    ],
  },
];

export default function ExpandRowTable() {
  const [openRow, setOpenRow] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-4 font-semibold text-gray-600 border-b">TOTAL: 11</div>

      {/* Header */}
      <div className="grid grid-cols-8 px-4 py-2 text-gray-500 text-sm border-b">
        <div>Address</div>
        <div>Revenue</div>
        <div>Cost</div>
        <div>Profit</div>
        <div>Margin</div>
        <div>Material</div>
        <div>Labour</div>
        <div>Variation</div>
      </div>

      {/* Rows */}
      {data.map((row, index) => (
        <div key={index}>
          <div
            className="grid grid-cols-8 px-4 py-3 border-b items-center hover:bg-gray-50 cursor-pointer"
            onClick={() => setOpenRow(openRow === index ? null : index)}
          >
            <div>{row.address}</div>
            <div>{row.revenue}</div>
            <div>{row.cost}</div>
            <div>{row.profit}</div>
            <div>{row.margin}</div>
            <div>{row.material}</div>
            <div>{row.labour}</div>
            <div>{row.variation}</div>
          </div>

          {/* Expandable Child Rows */}
          {openRow === index &&
            row.children?.map((child, i) => (
              <div
                key={i}
                className="grid grid-cols-8 px-8 py-2 text-sm text-gray-600 bg-gray-50 border-b"
              >
                <div>↳ {child.name}</div>
                <div>{child.revenue}</div>
                <div>{child.cost}</div>
                <div>{child.profit}</div>
                <div>{child.margin}</div>
                <div>{child.material}</div>
                <div>{child.labour}</div>
                <div>-</div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
