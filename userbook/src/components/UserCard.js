import React from 'react';
import { StyledUserCard } from '../styles';

export default function UserCard(props) {
    const { user } = props;
    return (
        <StyledUserCard>
            <h3>{user.username}</h3>
            <button>Add Friend</button>
        </StyledUserCard>
    );
}