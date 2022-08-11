import useNullFlat from '@/hooks/useNullFlat';
import { Button, Select, Table } from '@mantine/core'
import axios from 'axios';
import React, { useState } from 'react'
import { Edit } from 'tabler-icons-react';
import ModalComponent from '../common/Modal';

const Outsider = ({role}:any) => {
    const [value,setValue]=useState("");
      const { data, isError, isLoading, error } = useNullFlat(value);

      return (
    <div>
        <Select
          value={value}
          placeholder="Browse by"
          onChange={setValue}
          data={["owner","resident"]}
        />
        {data && <Helper data={data}/>}

    </div>
  )
}

export default Outsider




 
 const Helper = ({ data }: any) => {
    console.log({ data });
    const rows = data.map((element: any) => (
      <tr key={element.flat_id}>
        <td>{element.flat_id}</td>
        <td>{element.description}</td>
        <td>
          <Edit
            onClick={() => {
          
            }}
            style={{
              cursor: "pointer",
            }}
          />
        </td>
        {/* <td>
          <Trash
            onClick={() =>
              handleDelete(
                `/api/deleteRow?tableName=${type}&id=${element.id}`,
                type,
                queryClient
              )
            }
            style={{
              cursor: "pointer",
            }}
          />
        </td> */}
      </tr>
    ));
  
    return (
      <>
        {" "}
        <Table horizontalSpacing="xl" verticalSpacing="xl" fontSize="lg">
          <thead>
            <tr>
              <th>Id</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        {/* <ModalComponent
          open={editing}
          setOpen={setEditing}
          message={`Edit owner`}
        >
          {selected && (
            <Form
              type="edit"
              data={selected}
              ownerId={ownerId}
              setOwnerId={setOwnerId}
              residentId={residentId}
              setResidentId={setResidentId}
            />
          )}
        </ModalComponent> */}
      </>
    );
  };