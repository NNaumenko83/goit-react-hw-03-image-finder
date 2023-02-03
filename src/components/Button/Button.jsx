import React from 'react';
import { ButtonLoadMore } from './Button.styled';

const Button = ({ onClick, disabled }) => {
  return (
    <ButtonLoadMore type="button" onClick={onClick} disabled={disabled}>
      Load more
    </ButtonLoadMore>
  );
};

export default Button;
