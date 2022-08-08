import React, { useState } from "react";
import { Button, Group, Text, Textarea } from "@mantine/core";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IconCheck, IconX } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
const CreatePost = ({
  heading,
  setHeading,
  description,
  setDescription,
  label,
  type = "add",
  id = null,
}: any) => {
  return (
    <>
      <Text size="xl" weight="700">
        {label}
      </Text>

      <Post
        heading={heading}
        setHeading={setHeading}
        description={description}
        setDescription={setDescription}
        type={type}
        id={id}
      />
    </>
  );
};

export default CreatePost;

const createPost = async (data: any) => {
  const { data: response } = await axios.post("/api/add_notice", data);
  return response.data;
};
const editPost = async (data: any) => {
  const { data: response } = await axios.post("/api/edit_notice", data);
  return response.data;
};

function Post({
  heading,
  setHeading,
  description,
  setDescription,
  type,
  id,
}: any) {
  console.log({ id });
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createPost, {
    onSuccess: (data) => {
      console.log(data);
      showNotification({
        id: "load-data",
        loading: false,
        title: "Notice posted",
        message: "",
        autoClose: false,
        icon: <IconCheck />,
      });
    },
    onError: () => {
      showNotification({
        id: "error-data",
        loading: false,
        title: "Could not post notification",
        message: "Data will be loaded in 3 seconds, you cannot close this yet",
        autoClose: false,
        icon: <IconX />,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("notice");
    },
  });
  const { mutate: editMutate } = useMutation(editPost, {
    onSuccess: (data) => {
      console.log(data);
      showNotification({
        id: "load-data",
        loading: false,
        title: "Notice Edited",
        message: "",
        autoClose: false,
        icon: <IconCheck />,
      });
    },
    onError: () => {
      showNotification({
        id: "error-data",
        loading: false,
        title: "Could not edit notification",
        message: "Data will be loaded in 3 seconds, you cannot close this yet",
        autoClose: false,
        icon: <IconX />,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("notice");
    },
  });
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(event);
    const data = {
      heading,
      description,
    };
    mutate(data);
  };
  const handleEdit = (event: any) => {
    event.preventDefault();
    console.log("edit");
    console.log(event);
    const data = {
      heading,
      description,
      id,
    };
    editMutate(data);
  };
  return (
    <form onSubmit={type === "edit" ? handleEdit : handleSubmit}>
      <LongTextInput
        size="sm"
        value={heading}
        setValue={setHeading}
        id="Heading"
      />
      <LongTextInput
        size="xl"
        value={description}
        setValue={setDescription}
        id="Description"
      />
      <Group position="right" mt="md">
        <Button type="submit">Post</Button>
      </Group>
    </form>
  );
}

const LongTextInput = ({ size, value, setValue, id }: any) => (
  <Textarea
    placeholder={`Write ${id}`}
    label={id}
    variant="filled"
    radius="lg"
    size={size}
    required
    minRows={size === "xl" ? 15 : 2}
    value={value}
    onChange={(event) => setValue(event.currentTarget.value)}
  />
);
