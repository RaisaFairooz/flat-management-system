import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core/';
import CommentSection from './commentSection';
import useStyles from './postStyles';

const PostDetail = ({post}:any) => {
  const classes = useStyles();
  console.log(post)

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.header}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.body}</Typography>
          <Typography variant="h6">
            Created by:<Typography>{post.role}</Typography>
          </Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
      </div>
    </Paper>
  );
};

export default PostDetail;