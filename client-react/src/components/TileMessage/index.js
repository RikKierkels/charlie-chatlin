import React from 'react';
import styled from '@emotion/styled';
import { formatMessageTime } from '../../shared/utils';
import { getAvatarById } from '../../shared/avatars';
import { AvatarSmall, StyledText } from '../../design/shared-styles';
import Tile from '../Tile';

const TileMessage = ({ message }) => {
  const avatar = getAvatarById(message.sender.avatarId);

  return (
    <Tile>
      <MessageDetailsWrapper>
        <Avatar src={avatar.image} alt={avatar.name} />
        <div>
          <Username>{message.sender.username}</Username>
          <SentOnTime>{formatMessageTime(message.sentOn)}</SentOnTime>
        </div>
      </MessageDetailsWrapper>
      <StyledText>{message.text}</StyledText>
    </Tile>
  );
};

export default TileMessage;

const MessageDetailsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Avatar = styled(AvatarSmall)`
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const Username = styled.p`
  font-size: 0.8em;
`;

const SentOnTime = styled.p`
  font-size: 0.7em;
  opacity: 0.5;
`;
