import React, { useState } from "react";
import { Button, Group, Select, Text, Textarea } from "@mantine/core";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { IconCheck, IconX } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useUserStore } from "src/global/user";
const PostComponent = () => {
  return (
    <>
      <Text size="xl" weight="700">
        Create a post
      </Text>

      <Post
      />
    </>
  );
};

export default PostComponent;

const createPost = async (data: any) => {
  const { data: response } = await axios.post(`/api/add_post`, data);
  return response.data;
};

function Post() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [header,setHeader]=useState("")
  const [body,setBody]=useState("")

  const { mutate, isLoading } = useMutation(createPost, {
    onSuccess: (data) => {
      console.log(data);
      showNotification({
        id: "load-data",
        loading: false,
        title: ` Posted`,
        message: "",
        autoClose: false,
        icon: <IconCheck />,
      });
      setHeader("");
      setBody("");
    },
    onError: () => {
      showNotification({
        id: "error-data",
        loading: false,
        title: `Could not post `,
        message: "Data will be loaded in 3 seconds, you cannot close this yet",
        autoClose: false,
        icon: <IconX />,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("posts");
    },
  });
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(event);
    const data = {
      header,
      body,
      role:user.role,
      author_id:user.id,
    };
    mutate(data);
  };
  return (
    <form onSubmit={ handleSubmit}> 
          <LongTextInput
            size="sm"
            value={header}
            setValue={setHeader}
            id="Heading"
          />
          <LongTextInput
            size="xl"
            value={body}
            setValue={setBody}
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
