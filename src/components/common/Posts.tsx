import { Header,Text,Button } from "@mantine/core";
import {
  Grid,
} from "@material-ui/core";
import { useState } from "react";
import ModalComponent from "./Modal";
import Post from "./Post";
import PostComponent from "./PostComponent";

const Posts = ({ posts }:any) => {
  console.log({posts})
  const [open,setOpen]=useState(false)


  return (
    <>
    <Header height={60} mb={30} className="flex">
        <Text
          component="span"
          align="center"
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          size="xl"
          weight={700}
        >
          Posts
        </Text>
        <Button onClick={()=>setOpen(true)}>Add Post</Button>
      </Header>
    {posts && <Grid container spacing={3} alignItems="stretch">
      {posts?.map((post:any) => (
        <Grid item xs={12} sm={6} lg={3} key={post._id}>
          <Post post={post}  />
        </Grid>
      ))}
    </Grid>}
    <ModalComponent open={open} setOpen={setOpen}>
    <PostComponent/>
      </ModalComponent>
      
    </>
  );
};

export default Posts;