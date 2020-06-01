import React from 'react';
import styled from '@emotion/styled';
import Tile from '../Tile';
import { getAvatarById } from '../../shared/avatars';
import { StyledText, transparent } from '../../design/shared-styles';
import { useSelector } from 'react-redux';

const TileUserProfile = () => {
  const isConnected = useSelector((state) => state.chat.isConnected);
  const user = useSelector((state) => state.user);
  const avatar = getAvatarById(user.avatarId);

  return (
    <Tile appearance={transparent}>
      <AvatarWrapper>
        <Avatar image={avatar.image} isConnected={isConnected} role="img" aria-label={avatar.name} />
      </AvatarWrapper>
      <Username>{user.username}</Username>
      <Brand>Mediaan Masterclass 2020</Brand>
    </Tile>
  );
};

export default TileUserProfile;

const AvatarWrapper = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Avatar = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
  background-image: ${({ image }) => `url('${image}')`};
  background-size: cover;
  background-position: center;

  &:after {
    content: '';
    z-index: 1;
    position: absolute;
    top: 0;
    right: -10px;
    display: block;
    width: 30px;
    height: 30px;
    border: 7px solid ${({ theme }) => theme.color.background};
    border-radius: 50%;
    background-color: ${({ isConnected, theme }) => (isConnected ? theme.color.lima : theme.color.rose)};
  }
`;

const Username = styled(StyledText)`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: center;
  color: ${({ theme }) => theme.color.white};
`;

const Brand = styled.p`
  font-size: 0.8rem;
  line-height: 1.2rem;
  text-align: center;
  color: ${({ theme }) => theme.color.sapphire};
`;
