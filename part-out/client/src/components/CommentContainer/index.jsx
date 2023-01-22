import React from 'react';
import { Box, Avatar, Text, IconButton } from 'gestalt';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';

function CommentContainer(props) {
  return (
    <div className={props.className}>
      <Box
        alignItems='center'
        direction='row'
        display='flex'
        marginStart={-1}
        marginEnd={-1}
      >
        <Box paddingX={1}>
          <Avatar
            verified={props.verified}
            name={props.comment.user}
            size='md'
          />
        </Box>
        <Box paddingX={1}>
          <Text bold>
            <Link
              to={`/user/${props.comment.userid ? props.comment.userid : ''}`}
            >
              {props.comment.user ? props.comment.user : 'loading...'}
            </Link>{' '}
          </Text>
          <Text>
            {props.comment.comment ? props.comment.comment : 'loading...'}
          </Text>
          {moment(props.comment.createdAt).fromNow()}
          {props.username === props.comment.user && props.id === props.check ? (
            <Text>
              <Link to={`/item/${props.comment.PostId}`}>View Post</Link>
            </Text>
          ) : (
            ''
          )}
        </Box>

        {(props.username === props.comment.user && props.id === props.check) ||
        props.permissions === 'admin' ? (
          <div className='ml-auto'>
            <IconButton
              accessibilityLabel='Delete'
              icon='cancel'
              onClick={() => props.handledelete(props.comment.id)}
            />
          </div>
        ) : (
          ''
        )}
      </Box>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    id: state.auth.id,
    permissions: state.auth.permissions
  };
};

export default withRouter(connect(mapStateToProps)(CommentContainer));
