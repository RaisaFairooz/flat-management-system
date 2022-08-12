import useFetchQuery from '@/hooks/useFetchQuery';
import React from 'react'
import Posts from '../common/Posts'



const Insider = ({role}:any) => {
  const { data, isError, isLoading, error } = useFetchQuery("posts");
  if(isLoading || !data) return null
  

  return (
     <Posts posts={data}/>
  )
}

export default Insider