import useFormData from "@/hooks/useForm";
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  Text,
  NumberInput,
} from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Check, Cross } from "tabler-icons-react";
import { Select } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { department, roles } from "src/mocks/mockdata";
import { useQueryClient } from "react-query";
import useEditFormData from "@/hooks/useEditFormData";

export default function EditUserByRole({ role, data }: any) {
  const form = useEditFormData(data);
  const [dept, setDept] = useState("");
  const queryClient = useQueryClient();
  const handleSubmit = async (
    e: any,
    values: any,
    owner_id: any,
    address_id: any
  ) => {
    e.preventDefault();
    showNotification({
      id: "load-data",
      loading: true,
      title: "Loading your data",
      message: "Data will be loaded in 3 seconds, you cannot close this yet",
      autoClose: false,
      disallowClose: true,
    });
    console.log(values);
    const response = await axios.post("/api/updateUser", {
      role,
      ...form.values,
      owner_id: owner_id,
      address_id: address_id,
    });
    console.log(response.data);
    updateNotification({
      id: "load-data",
      color: response.data.status === "success" ? "teal" : "red",
      title: response.data.status === "success" ? "Data was edited" : "Error",
      message: response.data.message,
      icon: response.data.status === "success" ? <Check /> : <Cross />,
      autoClose: 2000,
    });
    queryClient.invalidateQueries([`${role}s`]);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, form.values, data.id, data.address_id)}
    >
      <TextInput
        required
        label="name"
        placeholder="name"
        {...form.getInputProps("name")}
      />
      <TextInput
        required
        label="phone number"
        placeholder="phone number"
        {...form.getInputProps("phoneNumber")}
      />
      {role === "resident" && (
        <TextInput
          required
          label="occupation"
          placeholder="occupation"
          {...form.getInputProps("occupation")}
        />
      )}
      {role === "resident" && (
        <NumberInput
          required
          label="family members"
          placeholder="family members"
          {...form.getInputProps("familyMembers")}
        />
      )}
      {role === "staff" && (
        <Select
          data={department}
          value={dept}
          onChange={setDept}
          label="Department"
          placeholder="Select Department"
          size="md"
          required
        />
      )}
      {role === "staff" && (
        <TextInput
          required
          label="Salary"
          placeholder="Amount"
          {...form.getInputProps("salary")}
        />
      )}
      <Text py="md">Address info:</Text>
      <TextInput
        required
        label="village/road"
        placeholder="village/road"
        {...form.getInputProps("villageOrStreet")}
      />
      <TextInput
        required
        label="post office"
        placeholder="post office"
        {...form.getInputProps("postOffice")}
      />
      <TextInput
        required
        label="district"
        placeholder="district"
        {...form.getInputProps("district")}
      />
      <Group position="right" mt="md">
        <Button type="submit">Edit</Button>
      </Group>
    </form>
  );
}
