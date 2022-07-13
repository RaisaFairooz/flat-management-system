export const signupOwners = function (
  name: string,
  nid: string,
  phone_number: string,
  address_id: number
): { query: string } {
  return {
    query:
      "INSERT INTO owners(name, nid, phone_number, address_id) VALUES('" +
      name +
      "','" +
      nid +
      "','" +
      phone_number +
      "','" +
      address_id +
      "')",
  };
};
export const updateOwners = function (
  name: string,
  phone_number: string,
  address_id: number,
  id: any
): { query: string } {
  return {
    query: `UPDATE owners SET name="${name}", phone_number="${phone_number}", address_id=${address_id} WHERE id=${id}`,
  };
};
export const signupResidents = function (
  name: string,
  nid: string,
  phone_number: string,
  occupation: string,
  family_member: number,
  address_id: number
): { query: string } {
  address_id = address_id ? address_id : 0;
  return {
    query:
      "INSERT INTO residents(name, phone_number, occupation, address_id, family_member, nid) VALUES('" +
      name +
      "','" +
      phone_number +
      "','" +
      occupation +
      "','" +
      address_id +
      "','" +
      family_member +
      "','" +
      nid +
      "')",
  };
};
export const updateResidents = function (
  name: string,
  phone_number: string,
  occupation: string,
  family_member: number,
  address_id: number,
  id: any
): { query: string } {
  address_id = address_id ? address_id : 0;
  return {
    query: `UPDATE residents SET name="${name}", phone_number="${phone_number}",occupation="${occupation}",family_member=${family_member}, address_id=${address_id} WHERE id=${id}`,
  };
};
export const signupStaff = function (
  name: string,
  nid: string,
  phone_number: string,
  department: string,
  salary: string,
  address_id: number
): { query: string } {
  address_id = address_id ? address_id : 0;
  return {
    query:
      "INSERT INTO staffs(name, phone_number, department, address_id, salary, nid) VALUES('" +
      name +
      "','" +
      phone_number +
      "','" +
      department +
      "','" +
      address_id +
      "','" +
      salary +
      "','" +
      nid +
      "')",
  };
};
export const updateStaff = function (
  name: string,
  phone_number: string,
  department: string,
  salary: string,
  address_id: number,
  id: any
): { query: string } {
  address_id = address_id ? address_id : 0;
  return {
    query: `UPDATE staffs SET name="${name}", phone_number="${phone_number}", department="${department}", salary=${salary}, address_id=${address_id} WHERE id=${id}`,
  };
};
export const insertAddress = function (
  village: string = "",
  postal_code: string,
  district: string = ""
): { query: string } {
  return {
    query:
      "INSERT INTO address(villageOrStreet, postal_code, district) VALUES ('" +
      village +
      "','" +
      postal_code +
      "','" +
      district +
      "')",
  };
};
export const updateAddress = function (
  village: string = "",
  postal_code: string,
  district: string = "",
  id: any
): { query: string } {
  return {
    query: `UPDATE address SET villageOrStreet="${village}", postal_code="${postal_code}", district="${district}" WHERE id=${id}`,
  };
};
export const fetch = () => {
  return {
    query: "SELECT LAST_INSERT_ID()",
  };
};
export const signin = function (
  role: string,
  name: string,
  phone_number: string
): { query: string } {
  return {
    query:
      "SELECT * FROM `" +
      role +
      "` WHERE name='" +
      name +
      "' AND phone_number='" +
      phone_number +
      "'",
  };
};
export const fetchUsers = function (role: string): { query: string } {
  return {
    query: "SELECT * FROM `" + role + "` WHERE isVerified=0",
  };
};
export const fetchALLRows = function (tableName: string): { query: string } {
  return {
    query: "SELECT * FROM `" + tableName + "`",
  };
};
export const searchRows = function (
  tableName: string,
  col: string,
  query: string
): { query: string } {
  return {
    query: `SELECT * FROM ${tableName} WHERE ${col} LIKE "%${query}%"`,
  };
};
export const deleteRow = function (
  tableName: string,
  id: string
): { query: string } {
  return {
    query: "DELETE FROM `" + tableName + "` WHERE id =" + id,
  };
};
