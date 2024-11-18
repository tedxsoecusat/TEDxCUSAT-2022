const Map = () => {
  return (
    <div className=" w-full flex justify-center items-center mt-20">
      <iframe
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.6740493919524!2d76.3225988153452!3d10.043732875034165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080d223eeb1de1%3A0xce06a9f0d256857a!2sSeminar%20Complex!5e0!3m2!1sen!2sin!4v1647780050991!5m2!1sen!2sin"
        width="100%"
        height="600"
        style={{ border: 0, filter: "invert(100%)" }}
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Map;
