import React from "react";
import { Navbar } from "../../components";
import { IProps } from "./types";
const GaurdedLayout = ({ children }: IProps): JSX.Element => {
  return (
    <div>      
      <Navbar />
      {children}
    </div>
  );
};

export default React.memo(GaurdedLayout);
