import React from 'react';
import styled from '@emotion/styled';
import avatars from '../../shared/avatars';
import Tile from '../Tile';

const formatTimeOfMessage = (dateISO) => {
  const date = new Date(dateISO);
  return `${date.getHours()}:${date.getMinutes()}`;
};

const TileMessage = ({ message }) => {
  const avatar = avatars.find((avatar) => avatar.id === message.sender.avatarId);

  return (
    <Tile>
      <MessageDetailsWrapper>
        <Avatar src={avatar.image} />
        <div>
          <Username>{message.sender.username}</Username>
          <PostTime>{formatTimeOfMessage(message.sentOn)}</PostTime>
        </div>
      </MessageDetailsWrapper>
      <Message>{message.text}</Message>
    </Tile>
  );
};

export default TileMessage;

const MessageDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.spacing.sm};
  object-fit: cover;
`;

const Username = styled.p`
  font-size: 0.8em;
`;

const PostTime = styled.p`
  font-size: 0.7em;
  opacity: 0.5;
`;

const Message = styled.p`
  font-size: 1.3em;
  font-weight: 500;
  line-height: 1.2em;
`;
