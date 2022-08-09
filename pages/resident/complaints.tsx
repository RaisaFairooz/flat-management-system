import ComplaintComponent from "@/components/common/ComplaintComponent";
import CreatePost from "@/components/common/CreatePost";
import { Paper } from "@mantine/core";
import React, { useState } from "react";

const Complaint = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  return (
    <Paper
      shadow="xs"
      p="md"
      sx={{
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <ComplaintComponent />;
    </Paper>
  );
};

export default Complaint;
