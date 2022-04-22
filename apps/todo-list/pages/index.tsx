import { useAppContext } from '@sotatek/contexts';
import { localStorageGet, StorageKeys } from '@sotatek/storage';
import { Col, Row } from 'antd';
import { useEffect } from 'react';
import styled from 'styled-components';
import NewTask from '../components/NewTask';
import ToDoList from '../components/ToDoList';

export function Index() {
  const { setListToDo } = useAppContext();
  useEffect(() => {
    setListToDo(localStorageGet(StorageKeys.TODOLIST));
  }, []);

  return (
    <StyledPage className="h-full">
      <Row className="h-full">
        <Col lg={10} xs={24}>
          <NewTask />
        </Col>
        <Col lg={14} xs={24}>
          <ToDoList />
        </Col>
      </Row>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  .page {
  }
`;

export default Index;
