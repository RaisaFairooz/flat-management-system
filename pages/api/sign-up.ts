import { fail } from "assert";
import excuteQuery from "lib/database/db";
import {
  insertAddress,
  signupOwners,
  signupResidents,
  signupStaff,
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
  } = req.body;
  let query;
  console.log("role", role);
  query = insertAddress(villageOrStreet, postOffice, district);
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
    const address_id = responseInsertAndLatestId.data;
    switch (role) {
      case "resident":
        query = signupResidents(
          name,
          nid,
          phoneNumber,
          occupation,
          familyMembers,
          address_id
        );
        console.log("switch", query);
        break;
      case "owner":
        query = signupOwners(name, nid, phoneNumber, address_id);
        break;
      case "staff":
        query = signupStaff(
          name,
          nid,
          phoneNumber,
          department,
          salary,
          address_id
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
