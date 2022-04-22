import React from 'react';
import styled from 'styled-components';
import ToDoDetail from '../ToDoDetail';

const NewTask = () => {
  return (
    <NewTaskWrapper className="p-10">
      <h2 className="font-bold text-center text-lg mb-5">New Task</h2>
      <ToDoDetail />
    </NewTaskWrapper>
  );
};

const NewTaskWrapper = styled.div``;

export default NewTask;
