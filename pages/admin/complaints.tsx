import CardComponent from "@/components/common/Card";
import useFetchQuery from "@/hooks/useFetchQuery";
import { Grid } from "@mantine/core";
import React from "react";

const Complaints = () => {
  const { data, isLoading } = useFetchQuery("complaint");

  if (isLoading) {
    return null;
  }
  console.log({ data });

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
              label="complaint"
              status={dt.status}
            />
          ))}
      </Grid>
    </>
  );
};

export default Complaints;
