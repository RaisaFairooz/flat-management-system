import {
  TextInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { useState } from "react";
import axios from "axios";
import { useUserStore } from "src/global/user";
import { useRouter } from "next/router";

export default function AuthenticationTitle() {
  const router = useRouter();
  const [number, setNumber] = useState("");
  const user = useUserStore((state) => state.user);
  const setData = useUserStore((state) => state.setData);
  const [mesage, setMessage] = useState("");

  console.log({ user });
  if (user?.role !== "") {
    router.push("/");
  }

  const handleSubmit = async () => {
    const { data } = await axios.get("/api/signin");
    const found = data?.filter((dt: any) => dt.phone_number === number);
    if (found.length >= 1) {
      setData(found[0]);
    } else {
      setMessage("User not found");
    }
  };
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome!
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Phone number"
          placeholder="your phone number(11 digit)"
          value={number}
          onChange={(e) => setNumber(e.currentTarget.value)}
          required
        />

        <Button
          fullWidth
          mt="xl"
          disabled={number.length !== 11}
          onClick={handleSubmit}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
