import useFetchQuery from '@/hooks/useFetchQuery';
import { Header, Table,Text } from '@mantine/core';
import { useRouter } from 'next/router'
import React from 'react'
import { useQueryClient } from 'react-query';


const getData=(id,data)=>data.filter(dt=>dt.owner_id.toString()===id)

const OwnerId = () => {
    const { data, isError, isLoading, error } = useFetchQuery("requests");

    const router=useRouter();
    const {id}=router.query;
    if(!data || isLoading){
        return null
    }
  return (
   <Helper data={getData(id,data)}/>
  )
}

export default OwnerId


const Helper = ({ data }: any) => {
    const queryClient = useQueryClient();
    console.log({ data });
    const rows = data.map((element: any) => (
      <tr key={element.id}>
        <td>{element.id}</td>
        <td>{element.flat_id}</td>
        <td>{element.description}</td>
        <td>{element.contact}</td>
      </tr>
    ));
  
    return (
      <>
       <Header height={60} mb={20} className="flex">
        <Text
          component="span"
          align="center"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          size="xl"
          weight={700}
        >
          Requests
        </Text>
      </Header>
        <Table horizontalSpacing="xl" verticalSpacing="xl" fontSize="lg">
          <thead>
            <tr>
              <th>Id</th>
              <th>Flat Id</th>
              <th>Description</th>
              <th>Contact</th>
         
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </>
    );
  };
