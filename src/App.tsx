import React, { useCallback, useMemo, useRef } from 'react';
import { Button, Card } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { useReactToPrint } from 'react-to-print';
import styles from './index.module.scss';
import { useStore } from './store';
import MainFrom from './components/mainForm/MainFrom';
import InformationTableTitle from './components/informationTableTitle/InformationTableTitle';
import InformationTable from './components/tables/InformationTable/InformationTable';
import { columnsForFirstTable, columnsForSecondTable } from './components/tables/TablesApiData/tableData';

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

  const sumForOnePart = useMemo(() => firstTableData?.reduce(
    (acc, currentVal) => acc + Number(currentVal?.indicatorValue),
    0,
  ), [firstTableData]);
  const sumForTwoPart = useMemo(() => secondTableData?.reduce(
    (acc, currentVal) => acc + Number(currentVal?.indicatorValue),
    0,
  ), [secondTableData]);

  const goToKrdStep = useCallback(() => changeFormState('TableFinal'), [changeFormState]);
  const goHome = useCallback(() => changeFormState('Home'), [changeFormState]);
  const goToRpvStep = useCallback(() => changeFormState('TableFirst'), [changeFormState]);
  const showRiskTypeResult = useMemo(() => {
    const val = sumForOnePart + sumForTwoPart;
    if (val > 90) {
      return 'значительный';
    } if (val < 90 && val > 60) {
      return 'средний';
    } if (val < 60 && val > 30) {
      return 'умеренный';
    }
    return 'низкий';
  }, [sumForTwoPart, sumForOnePart]);

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
          <InformationTable
            firstTableData={firstTableData}
            part="One"
            sumForOnePart={sumForOnePart}
            changeFirstTableData={changeFirstTableData}
            columns={columnsForFirstTable}
          />
          <div className={styles.nav}>
            <Button onClick={goToKrdStep} type="primary">Расчет критерия добросоветсности Iкрд</Button>
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
          <InformationTable
            secondTableData={secondTableData}
            fullName={fullName}
            part="Two"
            sumForOnePart={sumForOnePart}
            sumForTwoPart={sumForTwoPart}
            changeSecondTableData={changeSecondTableData}
            columns={columnsForSecondTable}
            showRiskTypeResult={showRiskTypeResult}
          />
          <div className={styles.nav}>
            <Button type="default" onClick={handlePrint}>Скачать pdf файл отчета</Button>
            <Button type="default" onClick={goToRpvStep}>Вернуться к определению индикаторов риска Iрпв</Button>
            <Button type="default" onClick={goHome}>Вернуться на главную форму</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default App;
