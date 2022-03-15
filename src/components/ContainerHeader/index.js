import React from "react";

const ContainerHeader = ({title}) => {
  return (
    <div className="gx-page-heading">
      <h2 className="gx-page-title" style={{color:'#fff',fontFamily:'Playfair display'}}>{title}</h2>
    </div>
  )
};

export default ContainerHeader;

