import { Form, Select, Card, Input, Button, Modal } from 'antd';
import { create } from 'zustand';
import styles from './index.module.scss';
import { objectTypeData } from './formsStaticData';
import { useState } from 'react';

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

interface StoreState {
  objectType: string;
  setObjectType: (value: string) => void;
  objectName: string;
  setObjectName: (value: string) => void;
  objectAddress: string;
  setObjectAddress: (value: string) => void;
  fullName: string;
  setFullName: (value: string) => void;
  userList: { id: string; fullName: string }[];
  addUser: (fullName: string) => void;
  deleteUser: (id: string) => void;
}

const useStore = create<StoreState>((set) => ({
  objectType: '',
  setObjectType: (value) => set({ objectType: value }),
  objectName: '',
  setObjectName: (value) => set({ objectName: value }),
  objectAddress: '',
  setObjectAddress: (value) => set({ objectAddress: value }),
  fullName: '',
  setFullName: (value) => set({ fullName: value }),
  userList: [],
  addUser: (fullName) => {
    set((state) => ({
      userList: [
        ...state.userList,
        { id: Math.random().toString(), fullName },
      ],
    }));
  },
  deleteUser: (id) => {
    set((state) => ({
      userList: state.userList.filter((user) => user.id !== id),
    }));
  },
}));

function App() {
  const {
    setObjectType,
    objectName,
    setObjectName,
    objectAddress,
    setObjectAddress,
    fullName,
    setFullName,
    userList,
    addUser,
    deleteUser,
  } = useStore();

  const [selectedUserForDelete, setSelectedUserForDelete] = useState<
    string | undefined
  >(undefined);
  const [addUserForList, setAddUserForList] = useState<
  string | undefined
>(undefined);

  console.log('userList', userList);
  

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

  const handleOkAddModal = () => {
    if (addUserForList) {
      addUser(addUserForList);
      setFullName('');
    }
  };

  const handleCancelAddModal = () => {
    setFullName('');
  };

  const handleOkDeleteModal = () => {
    if (selectedUserForDelete) {
      deleteUser(selectedUserForDelete);
    }
  };

  const handleCancelDeleteModal = () => {
    setFullName('');
  };

  return (
    <Card className={styles.wrap} title="Форма выбора объекта">
      <Form className={styles.form} {...formItemLayout} layout="horizontal">
        <Form.Item label="Тип объекта">
          <Select onChange={(value) => handleFormChange('objectType', value)}>
            {objectTypeData.map((item) => (
              <Select.Option key={item.id} value={item.title}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Название объекта">
          <Input
            value={objectName}
            onChange={(e) => handleFormChange('objectName', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Адрес объекта">
          <Input
            value={objectAddress}
            onChange={(e) => handleFormChange('objectAddress', e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Ф.И.О. выполнившего расчет">
          <Select
            value={fullName}
            onChange={(value) => handleFormChange('fullName', value)}
          >
            <Select.Option value="new">- Добавить нового исполнителя</Select.Option>
            <Select.Option value="empty">- Пустое поле</Select.Option>
            <Select.Option value="delete">- Удалить исполнителя</Select.Option>
            {userList.map((el) => (
              <Select.Option value={el?.fullName} key={el?.id}>
                {el?.fullName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <Button type="primary" className={styles.btn} size='large'>
        <p>
        Рассчитать показатель <br />
         тяжести потенциальных негативных <br />
          последствий пожара Кг.и.инд
        </p>
      </Button>
      <Modal
        title="Введите Фамилию Имя Отчество"
        onOk={handleOkAddModal}
        onCancel={handleCancelAddModal}
        open={fullName === 'new'}
      >
      <Input 
      onInput={(e) => setAddUserForList(e.target.value)}
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
          style={{ width: '300px' }}
          onChange={(v) => setSelectedUserForDelete(v)}
        >
          {userList.map((el) => (
            <Select.Option value={el?.id} key={el?.id}>
              {el?.fullName}
            </Select.Option>
          ))}
        </Select>
      </Modal>
    </Card>
  );
}

export default App;