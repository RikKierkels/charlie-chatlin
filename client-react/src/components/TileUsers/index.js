import React from 'react';
import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { biscay } from '../../design/shared-styles';
import avatars from '../../shared/avatars';
import Tile from '../Tile';

const TileUsers = () => {
  const users = useSelector((state) => state.chat.users);

  const toUserWithAvatar = (user) => {
    const avatar = avatars.find((avatar) => user.avatarId === avatar.id);

    return (
      <UserListItem key={user.username}>
        <Username>{user.username}</Username>
        <Avatar src={avatar.image} alt={avatar.name} />
      </UserListItem>
    );
  };

  return (
    <Tile appearance={biscay}>
      <UserList>{users.map(toUserWithAvatar)}</UserList>
    </Tile>
  );
};

export default TileUsers;

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
  color: white;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
