import { useAppContext } from '@sotatek/contexts';
import { PiorityOptions, ToDo } from '@sotatek/models';
import {
  localStorageGet,
  localStorageSet,
  StorageKeys,
} from '@sotatek/storage';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const defaultPiorityOptions = PiorityOptions[1];

interface ToDoDetailProps {
  id?: string;
  setActiveKey?: (key: string) => void;
}

const ToDoDetail = ({ id, setActiveKey }: ToDoDetailProps) => {
  const [piority, setPiority] = useState<string>(defaultPiorityOptions.value);
  const [form] = useForm();

  const { listToDo, setListToDo } = useAppContext();

  const currentTodo = useMemo(
    () => Object.values(listToDo).find((todo) => todo.id === id) || null,
    [id, listToDo]
  );

  const onUpdateHandle = (e) => {
    const { taskName, description, dueDate } = e;

    const data: ToDo = {
      id: uuidv4(),
      taskName,
      description,
      dueDate: Math.floor(new Date(dueDate).getTime() / 1000),
      piority,
      isChecked: false,
    };

    const currentToDoIndex = listToDo.findIndex((todo) => todo.id === id);
    const newListToDo = listToDo;
    newListToDo[currentToDoIndex] = data;

    setListToDo(newListToDo);
    localStorageSet(StorageKeys.TODOLIST, newListToDo);

    setActiveKey('');

    message.success(`Update Task successfully!`);
  };

  const onAddHandle = (e) => {
    const { taskName, description, dueDate } = e;

    const data: ToDo = {
      id: uuidv4(),
      taskName,
      description,
      dueDate: Math.floor(new Date(dueDate).getTime() / 1000),
      piority,
      isChecked: false,
    };

    const currentTasks = localStorageGet(StorageKeys.TODOLIST);
    if (currentTasks?.length > 0) {
      localStorageSet(StorageKeys.TODOLIST, [...currentTasks, data]);
    } else {
      localStorageSet(StorageKeys.TODOLIST, [data]);
    }

    setListToDo(localStorageGet(StorageKeys.TODOLIST));

    message.success(`Add Task ${taskName} successfully!`);

    form.resetFields();
    form.setFieldsValue({
      dueDate: moment(Date.now()),
    });
  };

  useEffect(() => {
    id && currentTodo
      ? form.setFieldsValue({
          taskName: currentTodo.taskName,
          description: currentTodo.description,
          dueDate: moment(currentTodo.dueDate * 1000),
          piority: currentTodo.piority,
        })
      : form.setFieldsValue({
          dueDate: moment(Date.now()),
        });
  }, [currentTodo, form, id]);

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={id ? onUpdateHandle : onAddHandle}
      >
        <Row gutter={30}>
          <Col xs={24}>
            <FormItem
              name="taskName"
              rules={[{ required: true, message: 'Task Name is required.' }]}
            >
              <Input required placeholder="Task Name" autoComplete="off" />
            </FormItem>
          </Col>

          <Col xs={24}>
            <FormItem name="description" label="Description">
              <TextArea
                placeholder="Description..."
                autoSize={{ minRows: 5 }}
                autoComplete="off"
              />
            </FormItem>
          </Col>

          <Col lg={12} xs={24}>
            <FormItem name="dueDate" label="Due Date" className="w-full">
              <DatePicker
                showTime={false}
                showNow={true}
                format={`DD/MM/YYYY`}
                className="w-full"
                allowClear={false}
                getPopupContainer={(trigger) => trigger.parentElement}
                autoComplete="off"
                disabledDate={(current) => {
                  const customDate = moment().format('YYYY-MM-DD');
                  return current && current < moment(customDate, 'YYYY-MM-DD');
                }}
              />
            </FormItem>
          </Col>
          <Col lg={12} xs={24}>
            <FormItem name="piority" label="Piority" className="w-full">
              <Select
                options={PiorityOptions}
                className="w-full"
                allowClear={false}
                getPopupContainer={(trigger) => trigger.parentElement}
                defaultValue={defaultPiorityOptions.value}
                onChange={(e) => setPiority(e)}
              />
            </FormItem>
          </Col>

          <Col xs={24}>
            <Button type="primary" htmlType="submit" block>
              {id ? 'Update' : 'Add'}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ToDoDetail;
