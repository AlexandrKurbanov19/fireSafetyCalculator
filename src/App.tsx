import React, { useCallback, useMemo, useRef } from 'react';
import { Button, Card } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import styles from './index.module.scss';
import FirstTable from './components/tables/FirstTable/FirstTable';
import { useStore } from './store';
import MainFrom from './components/mainForm/MainFrom';
import InformationTableTitle from './components/informationTableTitle/InformationTableTitle';
import SecondTable from './components/tables/SecondTable/SecondTable';

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
    firstTableData,
    secondTableData,
    changeSecondTableData,
    changeFirstTableData,
  } = useStore();

  const tableData = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => {
      if (tableData.current) {
        return tableData.current;
      }
      return null;
    },
  });

  const formTitle = useMemo(() => (formState === 'Home' && 'Форма выбора объекта')
    || (formState === 'TableFinal' && 'Определение Iкрд')
    || (formState === 'TableFirst' && 'Определение Ipпв'), [formState]);
  const goBack = useCallback(() => {
    if (formState === 'TableFinal') {
      changeFormState('TableFirst');
    }
    if (formState === 'TableFirst') {
      changeFormState('Home');
    }
  }, [formState, changeFormState]);

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
        <div ref={tableData}>
          <InformationTableTitle
            objectType={objectType}
            objectName={objectName}
            objectAddress={objectAddress}
            title="Определение индификаторов риска Iрпв"
          />
          <FirstTable
            firstTableData={firstTableData}
            changeFirstTableData={changeFirstTableData}
          />
          <div className={styles.nav}>
            <Button onClick={() => changeFormState('TableFinal')} type="primary">Расчет критерия добросоветсности Iкрд</Button>
            <Button type="default" onClick={handlePrint}>Скачать pdf файл отчета</Button>
          </div>
        </div>
      )}
      {formState === 'TableFinal' && (
        <div ref={tableData}>
          <InformationTableTitle
            objectType={objectType}
            objectName={objectName}
            objectAddress={objectAddress}
            title="Определение критериев добросовестности Iкрд"
          />
          <SecondTable
            secondTableData={secondTableData}
            fullName={fullName}
            changeSecondTableData={changeSecondTableData}
          />
          <div className={styles.nav}>
            <Button type="default" onClick={handlePrint}>Скачать pdf файл отчета</Button>
            <Button type="default" onClick={() => changeFormState('TableFirst')}>Вернуться к определению индикаторов риска Iрпв</Button>
            <Button type="default" onClick={() => changeFormState('Home')}>Вернуться на главную форму</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default App;
