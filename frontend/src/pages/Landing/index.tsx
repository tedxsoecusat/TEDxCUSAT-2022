import React from "react";
// import Partners from "src/containers/Partners";
import LandingSection from "../../containers/LandingSection";
import About from "src/containers/About";
import ImageCarousel from "src/containers/ImageCarousel";
// import Speakers from "src/containers/Speakers";
import Contacts from "../../containers/Contacts";
import Loader from "src/components/Loader";
import Footer from "src/containers/Footer";
import Map from "src/containers/Map";
import Speakers from "src/containers/Speakers";
import Partners from "src/containers/Partners";

const Landing = () => {
  return (
    <>
      <Loader />
      <LandingSection />
      <About />
      <ImageCarousel />
      <Speakers />
      <Partners />
      <Contacts />
      <Map />
      <Footer />
    </>
  );
};

export default Landing;
