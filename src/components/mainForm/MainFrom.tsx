import {
  Form, Select, Input, Button, Modal,
} from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { FC, useState } from 'react';
import styles from '../../index.module.scss';
import { objectTypeData } from '../../formsStaticData';
import { StoreState } from '../../store';

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

export const MainFrom: FC<StoreState> = ({
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
  const onSubmit = () => {
    changeFormState('TableFirst');
  };
  return (
    <>
      <Form
        form={form}
        name="basic"
        onFinish={onSubmit}
        className={styles.form}
        {...formItemLayout}
        layout="horizontal"
      >
        <Form.Item
          label="Тип объекта"
          name="typeObject"
          rules={[
            {
              required: true,
              message: 'Пожалуйста выберите тип обьекта',
            },
          ]}
        >
          <Select
            defaultValue={objectType}
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
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите имя обьекта',
            },
          ]}
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
          rules={[
            {
              required: true,
              message: 'Пожалуйста введите адрес обьекта',
            },
          ]}
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
          rules={[
            {
              required: true,
              message: 'Пожалуйста укажите Ф.И.О выполнивнего расчет',
            },
          ]}
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
              type="primary"
              size="large"
              htmlType="submit"
              className={styles.btn}
              disabled={
                !form.isFieldsTouched(true)
                || form.getFieldsError().filter(({ errors }) => errors.length)
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
        onClick={() => {
          cleanStore();
          form.resetFields();
        }}
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
          onInput={(e: React.FormEvent<HTMLInputElement>) => setAddUserForList(e.currentTarget.value)}
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
    </>
  );
};
