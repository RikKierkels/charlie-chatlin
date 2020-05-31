import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { AvatarSmall, biscay } from '../../design/shared-styles';
import { getAvatarById } from '../../shared/avatars';
import Tile from '../../components/Tile';
import { useSelector } from 'react-redux';
import chat from '../../shared/chat';

const TileUserList = () => {
  const users = useSelector((state) => state.chat.users);

  useEffect(() => {
    chat.getUsers();
  }, []);

  return (
    <Tile appearance={biscay}>
      <UserList>
        {users.map((user) => (
          <UserListItem key={user.username} user={user} />
        ))}
      </UserList>
    </Tile>
  );
};

const UserListItem = ({ user }) => {
  const avatar = getAvatarById(user.avatarId);

  return (
    <UserContainer>
      <Username>{user.username}</Username>
      <Avatar src={avatar.image} alt={avatar.name} />
    </UserContainer>
  );
};

export default TileUserList;

const UserList = styled.ul`
  & > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const UserContainer = styled.li`
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
