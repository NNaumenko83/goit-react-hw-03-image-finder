import React from 'react';
import { Formik, Form, Field } from 'formik';
import styled from '@emotion/styled';
import { Header, Button } from './Searchbar.styled';
import { ReactComponent as FindIcon } from '../../images/iconmonstr-search-thin.svg';

const SearchForm = styled(Form)`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;

const Input = styled(Field)`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;
`;

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    onSubmit(values);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Header>
      <Formik initialValues={{ newQuery: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => {
          return (
            <SearchForm>
              <Button type="submit" disabled={isSubmitting}>
                <FindIcon width="24" height="24" fill="#fff " />
              </Button>
              <Input
                name="newQuery"
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </SearchForm>
          );
        }}
      </Formik>
    </Header>
  );
};

export default Searchbar;
