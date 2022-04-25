import { css, Global } from '@emotion/react';
import { Collapse, confirmationDialog, Panel } from '@sotatek/ui';
import { Button, Checkbox, Input, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ToDoDetail from '../ToDoDetail';
import SimpleBar from 'simplebar-react';
import { useAppContext } from '@sotatek/contexts';
import { localStorageSet, StorageKeys } from '@sotatek/storage';
import { ToDo } from '@sotatek/models';

const ToDoList = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [showList, setShowList] = useState<ToDo[]>([]);
  const [activeKey, setActiveKey] = useState<string>('');

  const scrollableNodeRef = useRef<HTMLElement>(null);

  const { listToDo, setListToDo } = useAppContext();
  const [isShowBulk, setIsShowBulk] = useState<boolean>(false);

  const onCheckedHandle = (id: string, isChecked: boolean) => {
    const currentToDoIndex = listToDo.findIndex((todo) => todo.id === id);
    const newListToDo = listToDo;
    newListToDo[currentToDoIndex].isChecked = isChecked;

    setListToDo(newListToDo);
    localStorageSet(StorageKeys.TODOLIST, newListToDo);

    setIsShowBulk(
      newListToDo.filter((todo) => todo.isChecked === true).length > 0
    );
  };

  const onDeleteHandle = (id: string) => {
    confirmationDialog({
      title: 'Are you sure to delete this task?',
      onOk: () => {
        const newToDoList = listToDo.filter((todo) => todo.id !== id);
        setListToDo(newToDoList);
        localStorageSet(StorageKeys.TODOLIST, newToDoList);

        message.success('Delete task successfully!');
      },
    });
  };

  const onDeleteBulkHandle = () => {
    confirmationDialog({
      title: 'Are you sure to delete these task?',
      onOk: () => {
        const newToDoList = listToDo.filter((todo) => todo.isChecked !== true);
        setListToDo(newToDoList);
        localStorageSet(StorageKeys.TODOLIST, newToDoList);

        message.success('Delete tasks successfully!');
      },
    });
  };

  useEffect(() => {
    setIsShowBulk(
      listToDo?.length > 0 &&
        listToDo.filter((todo) => todo.isChecked === true).length > 0
    );
    setShowList(listToDo);
    setSearchKeyword('');
  }, [listToDo]);

  useEffect(() => {
    const doSearch = setTimeout(() => {
      if (searchKeyword.length > 0) {
        setShowList(
          listToDo.filter((todo) =>
            todo.taskName
              .toLowerCase()
              .trim()
              .includes(searchKeyword.toLowerCase().trim())
          )
        );
      } else {
        setShowList(listToDo);
      }
    }, 400);

    return () => {
      clearTimeout(doSearch);
    };
  }, [listToDo, searchKeyword]);

  return (
    <ToDoListWrapper className="p-10 border h-screen">
      <h2 className="font-bold text-center text-lg mb-5">To Do List</h2>
      <Input
        placeholder="Search..."
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
      />
      {showList?.length > 0 && (
        <SimpleBar
          style={{
            maxHeight: '92%',
          }}
          scrollableNodeProps={{ ref: scrollableNodeRef }}
          className="mt-5"
        >
          <Collapse onChange={(e) => console.log(e)} activeKey={activeKey}>
            {showList.map((todo) => (
              <Panel
                header={
                  <div className="flex justify-between w-full items-center">
                    <Checkbox
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        onCheckedHandle(todo.id, e.target.checked)
                      }
                      defaultChecked={todo.isChecked}
                    >
                      {todo.taskName}
                    </Checkbox>
                    <div className="w-auto flex">
                      <Button
                        type="primary"
                        className="mr-5"
                        onClick={() =>
                          setActiveKey(activeKey !== todo.id ? todo.id : '')
                        }
                      >
                        Detail
                      </Button>
                      <Button
                        type="primary"
                        danger
                        onClick={() => onDeleteHandle(todo.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                }
                key={todo.id}
                showArrow={false}
                collapsible="disabled"
              >
                <ToDoDetail id={todo.id} setActiveKey={setActiveKey} />
              </Panel>
            ))}
          </Collapse>
        </SimpleBar>
      )}

      {isShowBulk && (
        <div className="absolute left-0 bottom-0 flex justify-between w-full items-center border-t-[1px] border-gray-300 p-5 px-8">
          <span>Bulk Action</span>
          <div className="flex">
            <Button type="primary" className="mr-5">
              Done
            </Button>
            <Button type="primary" danger onClick={onDeleteBulkHandle}>
              Remove
            </Button>
          </div>
        </div>
      )}

      <Global
        styles={css`
          #__next {
            height: 100%;
          }
        `}
      />
    </ToDoListWrapper>
  );
};

const ToDoListWrapper = styled.div``;

export default ToDoList;
