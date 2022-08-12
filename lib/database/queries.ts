//TODO:Owner add
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

//TODO:Flat add
export const addFlat = function (
  id: string,
  description: JSON
): { query: string } {
  return {
    query:
      "INSERT INTO flat(flat_id,description) VALUES('" +
      id +
      "','" +
      description +
      "')",
  };
};

//TODO:Flat add
export const sendRequest = function (
  request:any
): { query: string } {
  console.log(JSON.stringify(request))
  return {
    query:
      "INSERT INTO requests(contact, description, owner_id, flat_id) VALUES('" +
      request.number +
      "','" +
      request.description +
      "','" +
      request.id +
      "','" +
      request.flat_id +
      "')",
  };
};
//TODO:Flat add
export const addNotice = function (
  heading: string,
  description: string
): { query: string } {
  return {
    query:
      "INSERT INTO notice(heading,description) VALUES('" +
      heading +
      "','" +
      description +
      "')",
  };
};
//TODO:Flat add
export const addPost = function (
  heading: string,
  body: string,
  role:string,
  author_id:string
): { query: string } {
  return {
    query:
      "INSERT INTO posts(author_id,role,header,body) VALUES('" +
      author_id +
      "','" +
      role +
      "','" +
      heading+
      "','" +
      body+
      "')",
  };
};
//TODO:Flat add
export const addComment = function (
 post_id:string,
 body:string,
 commentor:string
): { query: string } {
  return {
    query:
      "INSERT INTO comments(post_id,body,commentor) VALUES('" +
      post_id +
      "','" +
      body +
      "','"+commentor+
      "')",
  };
};
//TODO:Flat add
export const addComplaint = function (
  heading: string,
  description: string,
  userId: string,
  flat_id: any,
  stat: string
): { query: string } {
  console.log({ flat_id });
  return {
    query:
      "INSERT INTO complaint(user_id,flat_id,heading,description,status) VALUES('" +
      userId +
      "','" +
      flat_id +
      "','" +
      heading +
      "','" +
      description +
      "','" +
      stat +
      "')",
  };
};

//TODO: Owner update
export const updateFlat = function (
  owner_id: string,
  resident_id: string,
  id: string
): { query: string } {
  console.log({ resident_id });
  if (resident_id === "" || resident_id === null) {
    return {
      query: `UPDATE flat SET owner_id="${parseInt(
        owner_id
      )}" WHERE flat_id="${id}"`,
    };
  }
  if (owner_id === "" || owner_id === null) {
    return {
      query: `UPDATE flat SET resident_id="${parseInt(
        resident_id
      )}" WHERE flat_id="${id}"`,
    };
  }
  console.log({ owner_id });
  return {
    query: `UPDATE flat SET owner_id="${parseInt(
      owner_id
    )}", resident_id="${parseInt(resident_id)}" WHERE flat_id="${id}"`,
  };
};

//TODO: Owner update
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
//TODO: Owner update
export const updateNotice = function (
  heading: string,
  description: string,
  id: any
): { query: string } {
  return {
    query: `UPDATE notice SET heading="${heading}", description="${description}" WHERE id=${id}`,
  };
};
//TODO: Owner update
export const updateComplaint = function (
  status: string,

  id: any
): { query: string } {
  return {
    query: `UPDATE complaint SET status="${status}" WHERE id=${id}`,
  };
};

//TODO:Resident add

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

//TODO:Resident update

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

//TODO:Staff add
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

//TODO:Staff update
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

//TODO:Address add
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

//TODO:Address update
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

//FIXME:
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

//FIXME:
export const fetchUsers = function (role: string): { query: string } {
  return {
    query: "SELECT * FROM `" + role + "` WHERE isVerified=0",
  };
};

//TODO:Fetch  users by type
export const fetchALLRows = function (tableName: string): { query: string } {
  return {
    query: "SELECT * FROM `" + tableName + "`",
  };
};
//TODO:Fetch  users by type
export const fetchAllFlatWithNull = function (columnName: string): { query: string } {
  return {
    query:columnName==="owner"? `SELECT f.flat_id,f.description,f.owner_id,f.resident_id,o.requests FROM flat f INNER JOIN owners o ON f.owner_id=o.id WHERE ${columnName}_id=1`: `SELECT f.flat_id,f.description,f.owner_id,f.resident_id,o.requests FROM flat f INNER JOIN owners o ON f.owner_id=o.id WHERE ${columnName}_id IS NULL`,
  };
};
//TODO:Fetch  users by type
export const fetchPostsWithCommennt = function (): { query: string } {
  return {
    query:`SELECT f.id,f.author_id,f.role,f.header,f.body,o.body AS comments,o.commentor as commentor FROM posts f LEFT JOIN comments o ON f.id=o.post_id`,
  };
};
//TODO:Fetch  users by type
export const fetchAllSameColumn = function (columnName: string): {
  query: string;
} {
  return {
    query: `SELECT ${columnName},role,id from managers UNION SELECT ${columnName},role,id from owners UNION SELECT ${columnName},role,id from residents UNION SELECT ${columnName},role,id from staffs`,
  };
};

//TODO:Search user by name/phone_number
export const searchRows = function (
  tableName: string,
  col: string,
  query: string
): { query: string } {
  return {
    query: `SELECT * FROM ${tableName} WHERE ${col} LIKE "%${query}%"`,
  };
};
//TODO:Search user by name/phone_number
export const searchFlat = function (id: any): { query: string } {
  return {
    query: `SELECT flat_id FROM flat WHERE resident_id="${id}"`,
  };
};
//TODO: Join
export const findChild = function (): { query: string } {
  return {
    query: `SELECT s.flat_id,s.description,s.owner_id,s.resident_id, b.id AS o_id,b.name AS o_name,b.phone_number as o_phone_number,b.nid as o_nid,b.address_id as o_address_id,b.requests as o_requests,c.id AS r_id,c.name AS r_name,c.phone_number as r_phone_number,c.nid as r_nid,c.address_id as r_address_id,c.occupation,c.family_member FROM flat s LEFT JOIN owners b ON s.owner_id = b.id LEFT JOIN residents c ON s.resident_id  = c.id`,
  };
};

//TODO:delete user by pk
export const deleteRow = function (
  tableName: string,
  id: string
): { query: string } {
  return {
    query: "DELETE FROM `" + tableName + "` WHERE id =" + id,
  };
};
