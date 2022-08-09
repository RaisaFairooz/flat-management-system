import React, { useState } from "react";
import { Button, Group, Select, Text, Textarea } from "@mantine/core";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IconCheck, IconX } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
const CreatePost = ({
  heading,
  setHeading,
  description,
  setDescription,
  label,
  type = "add",
  subType = "notice",
  id = null,
  userId = "01643089371",
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
        subType={subType}
        userId={userId}
      />
    </>
  );
};

export default CreatePost;

const createPost = async (data: any) => {
  const { data: response } = await axios.post(`/api/add_${data.subType}`, data);
  return response.data;
};
const editPost = async (data: any) => {
  const { data: response } = await axios.post(
    `/api/edit_${data.subType}`,
    data
  );
  return response.data;
};

function Post({
  heading,
  setHeading,
  description,
  setDescription,
  type,
  id,
  subType,
  userId,
}: any) {
  console.log({ id });
  const queryClient = useQueryClient();
  const router = useRouter();
  const [status, setStatus] = useState("");
  const { mutate, isLoading } = useMutation(createPost, {
    onSuccess: (data) => {
      console.log(data);
      showNotification({
        id: "load-data",
        loading: false,
        title: `${subType} Posted`,
        message: "",
        autoClose: false,
        icon: <IconCheck />,
      });
      setHeading("");
      setDescription("");
    },
    onError: () => {
      showNotification({
        id: "error-data",
        loading: false,
        title: `Could not post ${subType}`,
        message: "Data will be loaded in 3 seconds, you cannot close this yet",
        autoClose: false,
        icon: <IconX />,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries(subType);
    },
  });
  const { mutate: editMutate } = useMutation(editPost, {
    onSuccess: (data) => {
      console.log(data);
      showNotification({
        id: "load-data",
        loading: false,
        title: `${subType} Edited`,
        message: "",
        autoClose: false,
        icon: <IconCheck />,
      });
      setHeading("");
      setDescription("");
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
      queryClient.invalidateQueries(subType);
    },
  });
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(event);
    const data = {
      heading,
      description,
      subType,
      userId,
    };
    mutate(data, subType);
  };
  const handleEdit = (event: any) => {
    event.preventDefault();
    console.log("edit");
    console.log(event);
    const data = {
      status,
      id,
      subType,
    };
    editMutate(data, subType);
  };
  return (
    <form onSubmit={type === "edit" ? handleEdit : handleSubmit}>
      {router.pathname.includes("/admin/complaints") ? (
        <>
          <Text>Edit status</Text>
          <Select
            data={["unresolved", "resolved", "pending"]}
            value={status}
            onChange={setStatus}
            label="Status"
            placeholder="Select Status"
            size="md"
            required
          />
        </>
      ) : (
        <>
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
        </>
      )}
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
