import useNullFlat from '@/hooks/useNullFlat';
import { Button, Select, Table ,Text} from '@mantine/core'
import axios from 'axios';
import React, { useState } from 'react'
import { Edit } from 'tabler-icons-react';
import ModalComponent from '../common/Modal';
const dt=["Available for renting","Available for buying"]

const Outsider = ({role}:any) => {
    const [value,setValue]=useState("");
    const [query,setQuery]=useState("");
      const { data, isError, isLoading, error } = useNullFlat(query);

      return (
    <div>
        <Select
          value={value}
          placeholder="Browse by"
          onChange={(val)=>{
            if(val===dt[0]){
                setValue(val)
                setQuery("resident")
            }else{
                setValue(val)
                setQuery("owner")
            }

          }}
          data={dt}
        />
        {data && <Helper data={data}/>}

    </div>
  )
}

export default Outsider




 
 const Helper = ({ data }: any) => {
    const [editing,setEditing]=useState(false)
    const [selected,setSelected]=useState({})
    console.log({ data });
    const rows = data.map((element: any) => (
      <tr key={element.flat_id}>
        <td>{element.flat_id}</td>
        <td>{element.description}</td>
        <td>
         <Text style={{
            cursor:"pointer"

         }}
         onClick={()=>{setEditing(true);setSelected(element)}}
         >Request contact</Text>
        </td>
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
        <ModalComponent
          open={editing}
          setOpen={setEditing}
          message={`Edit owner`}
        >
          {selected && (
            <Form
              data={selected}
            />
          )}
        </ModalComponent>
      </>
    );
  };


  const Form = ({data}:any) => {
    console.log(data)
   return (
     <div>Outsider</div>
   )
 }
 
  