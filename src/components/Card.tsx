const Card = () => {
  return (
    <div className="grid grid-cols-7 gap-4 mb-6">
      {[
        ["Revenue", "£13,308.68"],
        ["Cost", "£8,110.00"],
        ["Profit", "£5,198.68"],
        ["Profit Margin", "39%"],
        ["Material Cost", "£10,020.00"],
        ["Labour Cost", "£2,100.00"],
        ["Variation", "£300.00"],
      ].map(([title, value]) => (
        <div key={title} className="bg-white rounded-xl p-4 shadow text-center">
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="font-semibold text-lg">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default Card;
