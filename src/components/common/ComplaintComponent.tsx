import React from "react";
import CreatePost from "@/components/common/CreatePost";
import { useState } from "react";

//from local storage
const loggedInUser = "98";

const ComplaintComponent = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  return (
    <CreatePost
      heading={heading}
      setHeading={setHeading}
      description={description}
      setDescription={setDescription}
      label="File a complain"
      type="add"
      subType="complaint"
      userId={loggedInUser}
    />
  );
};

export default ComplaintComponent;
