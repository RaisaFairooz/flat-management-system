import { useForm } from "@mantine/form";

const useEditFormData = (data: any) => {
  const form = useForm({
    initialValues: {
      name: data.name,
      phoneNumber: data.phoneNumber,
      villageOrStreet: data.villageOrStreet,
      postOffice: data.postOffice,
      district: data.district,
      familyMembers: data.familyMembers,
      occupation: data.occupation,
      department: data.department,
      salary: data.salary,
    },

    validate: {
      phoneNumber: (value) =>
        /^(?:(?:\+|00)88|01)?\d{11}\r?$/.test(value) ? null : "Invalid number",
    },
  });
  return form;
};

export default useEditFormData;
