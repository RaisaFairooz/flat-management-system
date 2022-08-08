import React, { useState } from "react";
import CardComponent from "@/components/common/Card";
import { Button, Grid, Header, Text } from "@mantine/core";
import ModalComponent from "@/components/common/Modal";
import { Form } from "./dashboard/flats";
import CreatePost from "@/components/common/CreatePost";
import useFetchQuery from "@/hooks/useFetchQuery";

const Notices = () => {
  const [open, setOpened] = useState(false);
  const { data, isLoading } = useFetchQuery("notice");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [selected, setSelected] = useState(-1);
  if (isLoading) {
    return;
  }
  console.log({ data });
  return (
    <>
      <Header height={60} mb={20} className="flex">
        <Text
          component="span"
          align="center"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          size="xl"
          weight={700}
        >
          Notices
        </Text>
        <Button onClick={() => setOpened(true)}>Add Notice</Button>
      </Header>
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
      <ModalComponent open={open} setOpen={setOpened}>
        <CreatePost
          heading={heading}
          setHeading={setHeading}
          description={description}
          setDescription={setDescription}
          label="Write a notice"
        />
      </ModalComponent>
    </>
  );
};

export default Notices;
