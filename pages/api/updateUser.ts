import { fail } from "assert";
import excuteQuery from "lib/database/db";
import {
  insertAddress,
  signupOwners,
  signupResidents,
  signupStaff,
  updateAddress,
  updateOwners,
  updateResidents,
  updateStaff,
} from "lib/database/queries";
export default async function handler(
  req: {
    body: {
      role: string;
      name: string;
      nid: string;
      phoneNumber: string;
      occupation: string;
      familyMembers: number;
      villageOrStreet: string;
      postOffice: string;
      district: string;
      department: string;
      salary: string;
      address_id: number;
      owner_id: number;
    };
  },
  res: {
    json: (arg0: {
      status: any;
      message?: string | any;
      errorMessage?: string | any;
      data?: object;
    }) => void;
  }
) {
  const {
    role,
    name,
    nid,
    phoneNumber,
    occupation,
    familyMembers,
    villageOrStreet,
    postOffice,
    district,
    department,
    salary,
    address_id,
    owner_id,
  } = req.body;
  let query;
  console.log("role", owner_id);
  query = updateAddress(villageOrStreet, postOffice, district, address_id);
  try {
    if (!query)
      return res.json({
        status: "failed",
        message: "undefined query",
      });
    //address insertion and fetch the latest id
    const responseInsertAndLatestId = await insertAndfetchAddress(query);
    console.log({ responseInsertAndLatestId });
    if (responseInsertAndLatestId.status === "fail")
      return res.json(responseInsertAndLatestId);
    //user insertion according to role
    switch (role) {
      case "resident":
        query = updateResidents(
          name,
          phoneNumber,
          occupation,
          familyMembers,
          address_id,
          owner_id
        );
        console.log("switch", query);
        break;
      case "owner":
        console.log("switch", owner_id);
        query = updateOwners(name, phoneNumber, address_id, owner_id);
        break;
      case "staff":
        query = updateStaff(
          name,
          phoneNumber,
          department,
          salary,
          address_id,
          owner_id
        );
        console.log("switch", query);
        break;
    }
    const responseUserInsert: any = await insertUser(query);
    console.log({ responseUserInsert });
    return res.json(responseUserInsert);
  } catch (err: any) {
    return res.json({
      status: err,
    });
  }
}
const insertAndfetchAddress = async function (query: { query: string }) {
  console.log("insert and fetch", query);
  try {
    const responseInsert: any = await excuteQuery({ query });
    if (responseInsert.affectedRows)
      return {
        status: "success",
        data: responseInsert.insertId,
      };
    return {
      status: "fail",
      message: "Can't find",
    };
  } catch (err) {
    return {
      status: "fail",
      message: "error",
      errorMessage: err,
    };
  }
};
const insertUser = async function (query: { query: string }) {
  console.log("insert user", query.query);
  try {
    const responseInsert: any = await excuteQuery({ query });
    if (responseInsert.affectedRows) {
      return {
        status: "success",
        message: "Added Successfully",
      };
    }
    return {
      status: " fail",
      message: responseInsert.error.sqlMessage,
    };
  } catch (err) {
    return {
      status: "fail",
      message: "database error",
      errorMessage: err,
    };
  }
};
