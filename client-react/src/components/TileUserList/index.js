import React from 'react';
import styled from '@emotion/styled';
import { AvatarSmall, biscay } from '../../design/shared-styles';
import { getAvatarById } from '../../shared/avatars';
import Tile from '../Tile';

const toUserListItem = (user) => {
  const avatar = getAvatarById(user.avatarId);

  return (
    <UserListItem key={user.username}>
      <Username>{user.username}</Username>
      <Avatar src={avatar.image} alt={avatar.name} />
    </UserListItem>
  );
};

const TileUserList = ({ users }) => {
  return (
    <Tile appearance={biscay}>
      <UserList>{users.map(toUserListItem)}</UserList>
    </Tile>
  );
};

export default TileUserList;

const UserList = styled.ul`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const UserListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Username = styled.p`
  font-size: 0.8rem;
  word-break: break-all;
  color: white;
`;

const Avatar = styled(AvatarSmall)`
  margin-left: ${({ theme }) => theme.spacing.xs};
`;
