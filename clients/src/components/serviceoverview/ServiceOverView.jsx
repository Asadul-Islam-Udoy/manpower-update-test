import React from "react";

const ServiceOverview = ({ service_overview }) => {
  return (
    <div className=" text-black">
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "200px",
          marginTop: "10px",
        }}
        dangerouslySetInnerHTML={{ __html: service_overview }}
        className="mt-8 "
      ></div>
    </div>
  );
};

export default ServiceOverview;
