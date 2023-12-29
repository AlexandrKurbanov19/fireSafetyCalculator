import {
  Form, Select, Input, Button, Modal,
} from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, {
  FC, useCallback, useMemo, useState,
} from 'react';
import styles from '../../index.module.scss';
import { objectTypeData } from './formsStaticData/index';
import { StoreState } from '../../store';
import {
  adressObjectRule, nameObjectRule, typeObjectRule, userFullnameRule,
} from './formRules';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const selectWidth = { width: '300px' };

const MainFrom: FC<
Omit<
StoreState,
'firstTableData'
| 'changeFirstTableData'
| 'secondTableData'
| 'changeSecondTableData'
>
> = ({
  setFullName,
  setObjectAddress,
  setObjectType,
  setObjectName,
  objectName,
  objectType,
  objectAddress,
  fullName,
  userList,
  cleanStore,
  addUser,
  deleteUser,
  changeFormState,
}) => {
  const [form] = Form.useForm();
  const [selectedUserForDelete, setSelectedUserForDelete] = useState<
  string | undefined
  >(undefined);
  const [addUserForList, setAddUserForList] = useState<string | undefined>(
    undefined,
  );

  const handleOkAddModal = useCallback(() => {
    if (addUserForList) {
      addUser(addUserForList);
      setFullName('');
    }
  }, [addUser, addUserForList, setFullName]);

  const handleCancelAddModal = useCallback(() => {
    setFullName('');
  }, [setFullName]);

  const handleOkDeleteModal = useCallback(() => {
    if (selectedUserForDelete) {
      deleteUser(selectedUserForDelete);
    }
  }, [deleteUser, selectedUserForDelete]);

  const handleCancelDeleteModal = useCallback(() => {
    setFullName('');
  }, [setFullName]);

  const handleFormChange = (field: keyof StoreState, value: string) => {
    switch (field) {
      case 'objectType':
        setObjectType(value);
        break;
      case 'objectName':
        setObjectName(value);
        break;
      case 'objectAddress':
        setObjectAddress(value);
        break;
      case 'fullName':
        setFullName(value);
        break;
      default:
        break;
    }
  };
  const onSubmit = useCallback(() => {
    changeFormState('TableFirst');
  }, [changeFormState]);

  const cleanForm = useCallback(() => {
    cleanStore();
    form.resetFields();
  }, [cleanStore, form]);

  const deleteSelectedUser = useCallback((v: string) => setSelectedUserForDelete(v), []);
  const onInputFIO = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => setAddUserForList(e.currentTarget.value),
    [setAddUserForList],
  );

  const initialVal = useMemo(() => ({
    typeObject: objectTypeData?.find((el) => el?.id === Number(objectType))?.title,
    nameObject: objectName,
    adressObject: objectAddress,
    userFullname: userList?.[0]?.fullName,
  }), [objectType, objectName, objectAddress, userList]);
  return (
    <>
      <Form
        form={form}
        name="basic"
        onFinish={onSubmit}
        className={styles.form}
        {...formItemLayout}
        initialValues={initialVal}
        layout="horizontal"
      >
        <Form.Item
          label="Тип объекта"
          name="typeObject"
          rules={typeObjectRule}
        >
          <Select
            onChange={(_, i) => {
              const type = i as DefaultOptionType;
              handleFormChange('objectType', type.key);
            }}
          >
            {objectTypeData.map((item) => (
              <Select.Option key={item.id} value={item.title}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Название объекта"
          name="nameObject"
          rules={nameObjectRule}
        >
          <Input
            value={objectName}
            placeholder="ТЦ Арена"
            onChange={(e) => handleFormChange('objectName', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Адрес объекта"
          name="adressObject"
          rules={adressObjectRule}
        >
          <Input
            value={objectAddress}
            placeholder="Новосибирск, ул. Народная 27"
            onChange={(e) => handleFormChange('objectAddress', e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Ф.И.О. выполнившего расчет"
          name="userFullname"
          rules={userFullnameRule}
        >
          <Select
            value={fullName}
            onChange={(value) => handleFormChange('fullName', value)}
          >
            <Select.Option value="new">
              - Добавить нового исполнителя
            </Select.Option>
            <Select.Option value="empty">- Пустое поле</Select.Option>
            <Select.Option value="delete">- Удалить исполнителя</Select.Option>
            {userList.map((el) => (
              <Select.Option value={el?.fullName} key={el?.id}>
                {el?.fullName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item shouldUpdate className="mb-0">
          {() => (
            <Button
              size="large"
              htmlType="submit"
              className={styles.btn}
              disabled={
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length > 0
              }
            >
              <p>
                Рассчитать показатель
                {' '}
                <br />
                тяжести потенциальных негативных
                {' '}
                <br />
                последствий пожара Кг.и.инд
              </p>
            </Button>
          )}
        </Form.Item>
      </Form>
      <Button
        danger
        type="primary"
        onClick={cleanForm}
      >
        Очистить форму
      </Button>

      <Modal
        title="Введите Фамилию Имя Отчество"
        onOk={handleOkAddModal}
        onCancel={handleCancelAddModal}
        open={fullName === 'new'}
      >
        <Input
          onInput={onInputFIO}
          placeholder="Введите ФИО"
          value={addUserForList}
        />
      </Modal>
      <Modal
        title="Выберите пользователя для удаления"
        onOk={handleOkDeleteModal}
        onCancel={handleCancelDeleteModal}
        open={fullName === 'delete'}
      >
        <Select
          style={selectWidth}
          onChange={deleteSelectedUser}
        >
          {userList.map((el) => (
            <Select.Option value={el?.id} key={el?.id}>
              {el?.fullName}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </>
  );
};
export default MainFrom;
