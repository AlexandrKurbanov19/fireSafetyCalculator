import React from 'react';
import { Button, Card } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import FirstTable from './components/tables/firstTable';
import { useStore } from './store';
import MainFrom from './components/mainForm/MainFrom';
import InformationTableTitle from './components/informationTableTitle/InformationTableTitle';

const App = () => {
  const {
    setObjectType,
    objectName,
    objectType,
    setObjectName,
    objectAddress,
    setObjectAddress,
    fullName,
    setFullName,
    userList,
    addUser,
    cleanStore,
    deleteUser,
    formState,
    changeFormState,
  } = useStore();

  const formTitle = (formState === 'Home' && 'Форма выбора объекта')
    || (formState === 'TableFinal' && 'Определение Iкрд')
    || (formState === 'TableFirst' && 'Определение Ipпв');
  const goBack = () => {
    if (formState === 'TableFinal') {
      changeFormState('TableFirst');
    }
    if (formState === 'TableFirst') {
      changeFormState('Home');
    }
  };

  return (
    <Card
      className={styles.wrap}
      title={formTitle}
      extra={
        formState !== 'Home' && (
          <Button onClick={goBack} icon={<RollbackOutlined />} />
        )
      }
    >
      {formState === 'Home' && (
        <MainFrom
          setObjectType={setObjectType}
          objectName={objectName}
          objectType={objectType}
          setObjectName={setObjectName}
          objectAddress={objectAddress}
          setObjectAddress={setObjectAddress}
          fullName={fullName}
          setFullName={setFullName}
          userList={userList}
          addUser={addUser}
          cleanStore={cleanStore}
          deleteUser={deleteUser}
          changeFormState={changeFormState}
          formState={formState}
        />
      )}
      {formState === 'TableFirst' && (
        <div>
          <InformationTableTitle
            objectType={objectType}
            objectName={objectName}
            objectAddress={objectAddress}
            tableTitle="Iрпв"
          />
          <FirstTable />
        </div>
      )}
    </Card>
  );
};

export default App;
