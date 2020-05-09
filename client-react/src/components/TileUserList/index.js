import React from 'react';
import styled from '@emotion/styled';
import { biscay } from '../../design/shared-styles';
import avatars from '../../shared/avatars';
import Tile from '../Tile';

const toUserListItem = (user) => {
  const avatar = avatars.find((avatar) => user.avatarId === avatar.id);

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

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  margin-left: ${({ theme }) => theme.spacing.xs};
  border-radius: 50%;
  object-fit: cover;
`;
