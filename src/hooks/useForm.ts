import { useForm } from "@mantine/form";
import React from "react";

const useFormData = () => {
  const form = useForm({
    initialValues: {
      name: "s",
      nid: "2",
      phoneNumber: "01643089371",
      villageOrStreet: "a",
      postOffice: "a",
      district: "a",
      familyMembers: 1,
      occupation: "ad",
      department: "guard",
      salary: "10000",
    },

    validate: {
      phoneNumber: (value) =>
        /^(?:(?:\+|00)88|01)?\d{11}\r?$/.test(value) ? null : "Invalid number",
      nid: (value) =>
        /^[0-9]+$/.test(value) ? "" : "Please follow the correct formation",
    },
  });
  return form;
};

export default useFormData;
