import React from "react";
import PartnerSection from "src/components/PartnerSection";
import { Fair } from "src/static/img";

interface PartnersSection {
  title: string;
  logos: {
    img: string;
    alt: string;
  }[];
}

const partnersSection: PartnersSection[] = [
  {
    title: "Platinum Partners",
    logos: [
      {
        img: Fair,
        alt: "LOGO",
      },
    ],
  },
];

const Partners = () => {
  return (
    <div
      id="partners"
      className="flex flex-col  items-center justify-center mx-auto max-w-[1440px] w-full px-[32px] md:px-64px] lg:px-[120px]"
    >
      {partnersSection.map(({ title, logos }, i) => (
        <PartnerSection key={i} title={title} logos={logos} />
      ))}
    </div>
  );
};

export default Partners;
