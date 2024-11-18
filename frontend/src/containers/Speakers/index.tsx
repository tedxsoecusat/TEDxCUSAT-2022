import React from "react";
import "./index.scss";
import SpeakerCard from "src/components/SpeakerCard";
import { Harish, Shaun, Ravi, Prince, Shantanu, Krish } from "src/static/img";
interface SpeakersData {
  name: string;
  talk: string;
  desc: string;
  image: string;
}

const speakersData: SpeakersData[] = [
  {
    name: "Achuth Krishnan",
    talk: "The perils and promise of EdTech",
    desc: "Achuth Krishnan (Krish) Sreedevi, is a Harvard University graduate who also holds a degree in computer science from New York University. Over the past decade, Krish has been active in the EdTech space in India and the US and has had various roles in Technology and Product in several prestigious organisations including the United Nations. As an avid communicator, he has also served as an Editor for the UN Academic Impact newsletter and authored articles about education for The Hindu.",
    image: Krish,
  },
  {
    name: "Capt Shantanu Chakravorty",
    talk: "Redundancy - A currency for growth",
    desc: "Capt Shantanu Chakravorty is an action-oriented Talent Development Leader with demonstrated accomplishments in Strategic and Tactical Leadership of Global Enterprise’s Learning and Development Charters. In the past two decades, he has held global roles for world-class companies like Cargill Inc., Cognizant, Wipro, and Aditya Birla Group. He has also won a commendation for leading battle operations in the Kargil Campaign of the Indian Army, when he was in active Military Service.",
    image: Shantanu,
  },
  {
    name: "Manvendra Singh Gohil",
    talk: "LGBT inclusion in the society",
    desc: "Manvendra Singh Gohil, the prince of Rajpipla, Gujarat, is the world’s first openly gay prince. He runs Lakshya Trust, a charity that supports the LGBTQ+ community. He’s made several public appearances in support of the queer community globally and is a well known icon. Today, Prince Manavendra has devoted himself fully to his charity. He advocates, counsels, and addresses social issues of the LGBTQ+ community in India. ",
    image: Prince,
  },
  {
    name: "Major Ravi",
    talk: "How to overcome the fear of failure",
    desc: "Major Ravi, Major A. K. Raveendran SM, is a retired Indian Army officer, now working as a consultant for military-based cinema, film director and actor. He had served as a commando in the National Security Guards, and had taken part in numerous missions that led him to his rank of Major. He was awarded the President's gallantry medal in 1991 and 1992 for his contributions.",
    image: Ravi,
  },
  {
    name: "Harish Sivararamakrishnan",
    talk: "Creating without constraints",
    desc: "One of the pioneers of the genre titled Carnatic progressive rock, Harish Sivararamakrishnan is a prominent performer and the lead singer and frontman of the Carnatic progressive-rock band Agam. As a former student of BITS Pilani, his musical career is alongside a sparkling career as the Chief Design Officer at CRED, after working for over a decade in Adobe and Google. With Agam concerts all year around in different places, Harish's voice is a familiar one everywhere he goes.",
    image: Harish,
  },
  {
    name: "Shaun Romy",
    talk: "Transcending fear of the unknown",
    desc: "Shaun Romy is an actress, professional fashion model, and social media celebrity, who has captured the hearts of malayalis everywhere. She made her film debut as a lead actress at the age of 19 in the Mollywood (Malayalam cinema) art film Blue Skies, Green Waters, Red Earth (2013). She has recently garnered much recognition from the audience for her role in the very popular film, Hridayam.",
    image: Shaun,
  },
];

const Speakers = () => {
  return (
    <div
      id="speakers"
      className="speakersSection cursor-grab mx-auto max-w-[1440px] px-[32px] md:px-[64px] lg:px-[85px] py-10 flex flex-col items-center md:items-start overflow-hidden"
    >
      <div className=" z-0 py-5 flex-1 flex items-center justify-center w-full sm:w-auto">
        <h2 className=" text-white font-semibold text-4xl sm:text-5xl z-20 w-full  relative ">
          <div className=" absolute w-[120px] h-[10px] bottom-0 bg-[#ff2b06] rounded-[2px] z-[-1] left-[60%] sm:left-[70%]  " />
          TALKS & <br /> SPEAKERS '22
        </h2>
      </div>
      <p className=" py-5 font-medium text-lg leading-5 text-[#FAFAFA]">
        The best minds of the state are coming together under one roof to
        inspire and spread ideas never seen before!
      </p>
      <div className="flex select-none items-stretch flex-row flex-nowrap cursor-grab overflow-x-auto mt-10">
        <div className=" py-5 flex items-stretch flex-row  flex-nowrap overflow-x-auto overflow-y-hidden ">
          {speakersData?.map(({ name, talk, desc, image }, key) => {
            return <SpeakerCard key={key} {...{ name, talk, desc, image }} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Speakers;
