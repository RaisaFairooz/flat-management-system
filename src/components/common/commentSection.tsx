import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core/';
import useStyles from './postStyles';
import { useUserStore } from 'src/global/user';
import { useMutation, useQueryClient } from 'react-query';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from "@tabler/icons";
import axios from 'axios';

const createPost = async (data: any) => {
  const { data: response } = await axios.post(`/api/post_comment`, data);
  return response.data;
};
const CommentSection = ({ post }:any) => {
  console.log({post})
  const user = useUserStore((state) => state.user);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({});
  const classes = useStyles();
  const queryClient=useQueryClient();
  const commentsRef = useRef();
  const { mutate, isLoading } = useMutation(createPost, {
    onSuccess: (data) => {
      console.log(data);
      showNotification({
        id: "load-data",
        loading: false,
        title: ` Posted`,
        message: "",
        autoClose: false,
        icon: <IconCheck />,
      });
      setComments({
        commentor:user.id,
        body:comment
      })
    setComment('');
    },
    onError: () => {
      showNotification({
        id: "error-data",
        loading: false,
        title: `Could not post `,
        message: "Data will be loaded in 3 seconds, you cannot close this yet",
        autoClose: false,
        icon: <IconX />,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const handleComment = async () => {
    const dt={
      commentor:user.id,
      post_id:post.id,
      body:comment

    }
    mutate(dt)
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
         
            <Typography  gutterBottom variant="subtitle1">
              <strong>{post.commentor} : </strong>
              {post.body}
            </Typography>
            {comments!=={} &&<div className={classes.commentsInnerContainer}>
            <Typography  gutterBottom variant="subtitle1">
              <strong>{comments.commentor} : </strong>
              {comments.body}
            </Typography>
      
        </div>}
      
        </div>
        
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;