export const renderValue = (value: any, formatter: (v: any) => string) => {
  if (!value) {
    return <div className="text-center w-full">-</div>;
  }
  return <div className="text-center w-full">{formatter(value)}</div>;
};
