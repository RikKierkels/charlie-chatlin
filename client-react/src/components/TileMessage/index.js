import React from 'react';
import styled from '@emotion/styled';
import {getAvatarById} from '../../shared/avatars';
import {AvatarSmall, StyledText} from '../../design/shared-styles';
import Tile from '../Tile';

const formatDate = (dateISO) => {
    const date = new Date(dateISO);
    return `${date.getHours()}:${date.getMinutes()}`;
};

const TileMessage = ({message}) => {
    const avatar = getAvatarById(message.sender.avatarId);

    return (
        <Tile>
            <MessageDetailsWrapper>
                <Avatar src={avatar.image} alt={avatar.name}/>
                <div>
                    <Username>{message.sender.username}</Username>
                    <SentOnTime>{formatDate(message.sentOn)}</SentOnTime>
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
  margin-bottom: ${({theme}) => theme.spacing.sm};
`;

const Avatar = styled(AvatarSmall)`
  margin-right: ${({theme}) => theme.spacing.sm};
`;

const Username = styled.p`
  font-size: 0.8em;
`;

const SentOnTime = styled.p`
  font-size: 0.7em;
  opacity: 0.5;
`;
