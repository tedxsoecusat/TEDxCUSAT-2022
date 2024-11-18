import React from "react";

interface Props {
  title: string;
  logos: {
    img: string;
    alt: string;
  }[];
}

const PartnerSection = ({ title, logos }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center py-[150px] text-[#FAFAFA] w-full">
      <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[0.195em] uppercase text-center">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-[30px] items-center justify-items-center w-full mt-[44px]">
        {logos?.map(({ img, alt }, i) => (
          <img src={img} alt={alt} key={i} />
        ))}
      </div>
    </div>
  );
};

export default PartnerSection;
