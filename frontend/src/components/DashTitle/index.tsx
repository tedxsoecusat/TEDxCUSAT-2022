import React from "react";

type DashTitleProps = {
  title: string;
};

const DashTitle = ({ title }: DashTitleProps) => {
  return (
    <div className="mr-9 my-8 w-full">
      <h1 className="px-5 py-4 border-b-2 text-3xl font-bold">{title}</h1>
    </div>
  );
};

export default DashTitle;
