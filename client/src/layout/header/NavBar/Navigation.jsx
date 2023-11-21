import React from "react";
import LeftNavigation from "./LeftNavigation";
import RightNavigation from "./RightNavigation";

const Navigation = ({ user }) => (
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <LeftNavigation user={user} />
    <RightNavigation user={user} />
  </div>
);

export default Navigation;
