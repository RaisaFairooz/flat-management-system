import CardComponent from "@/components/common/Card";
import CreatePost from "@/components/common/CreatePost";
import ModalComponent from "@/components/common/Modal";
import useFetchQuery from "@/hooks/useFetchQuery";
import { Grid } from "@mantine/core";
import React from "react";

const Complaints = () => {
  const { data, isLoading } = useFetchQuery("complaint");

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Grid>
        {data &&
          data.map((dt) => (
            <CardComponent
              key={dt.id}
              id={dt.id}
              headText={dt.heading}
              bodyText={dt.description}
              time={dt.time}
            />
          ))}
      </Grid>
    </>
  );
};

export default Complaints;
