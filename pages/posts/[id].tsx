import PostDetail from '@/components/common/PostDetails'
import useFetchQuery from '@/hooks/useFetchQuery'
import { useRouter } from 'next/router'
import React from 'react'

const PostId = () => {
    const router=useRouter()
    const {id}=router.query
    const { data, isError, isLoading, error } = useFetchQuery("posts");
    if(!data || isLoading){
        return null
    }

  return (
    <PostDetail post={data.filter((dt:any)=>dt.id.toString()===id)[0]}/>
  )
}

export default PostId