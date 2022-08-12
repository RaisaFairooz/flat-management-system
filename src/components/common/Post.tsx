import { updateNotification ,showNotification} from "@mantine/notifications";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import {
  DeleteOutline,
  MoreHoriz,
  ThumbUpAltRounded,
} from "@material-ui/icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useUserStore } from "src/global/user";
import { Check ,Cross} from "tabler-icons-react";
import ModalComponent from "./Modal";
import useStyle from "./styles";
export const handleDelete = async (
  url: string,
  queryClient: any
) => {
  showNotification({
    id: "load-data",
    loading: true,
    title: "Loading your data",
    message: "Data will be loaded in 3 seconds, you cannot close this yet",
    autoClose: false,
    disallowClose: true,
  });
  const response = await axios.delete(url);
  updateNotification({
    id: "load-data",
    color: response.statusText === "OK" ? "teal" : "red",
    title: response.statusText === "OK" ? "Data was deleted" : "Error",
    message:
      response.statusText === "OK" ? "Data was deleted successfully" : "Error",
    icon: response.statusText === "OK" ? <Check /> : <Cross />,
    autoClose: 2000,
  });
  queryClient.invalidateQueries([`posts`]);
  console.log("handle delete", response);
};


const Post = ({ post }:any) => {
  const classes = useStyle();
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);
  const [open,setOpen]=useState(false);
  const router=useRouter();
  console.log(user.id)
  console.log(post.author_id)



  return (
    <>
    <Card className={classes.card} raised elevation={6} >
    <div onClick={()=>{router.push(`posts/${post.id}`)}}>
        <CardMedia
          className={classes.media}
          image={
            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
          }
          title={post.header}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.role}</Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.header}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
          {post.body.slice(0, 20)}...
          </Typography>
        </CardContent>
        </div>
      <CardActions className={classes.cardActions}>
        {user?.id.toString() === post?.author_id  && (
          <Button
            size="small"
            color="secondary"
            onClick={() =>
              handleDelete(
                `/api/deleteRow?tableName=posts&id=${post.id}`,
                queryClient
              )
            }
          >
            <DeleteOutline fontSize="small" /> &nbsp; Delete
          </Button>
        )}
      </CardActions>
    </Card>
    <ModalComponent open={open} setOpen={setOpen}>
        <PostOne
          post={post}
        />
      </ModalComponent>
    </>
  );
};

export default Post;





 const PostOne = ({post}:any) => {
  return (
    <div>Post</div>
  )
}
