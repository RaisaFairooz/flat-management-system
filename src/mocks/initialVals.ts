export const initialValues = {
  name: "",
  nid: "",
  phoneNumber: "",
  "village/street": "",
  postOffice: "",
  district: "",
  familyMembers: 0,
  occupation: "",
};

export const validate = {
  phoneNumber: (value: string) =>
    /^(?:(?:\+|00)88|01)?\d{11}\r?$/.test(value) ? null : "Invalid number",
  nid: (value: string) =>
    /^[0-9]+$/.test(value) ? "" : "Please follow the correct formation",
};
