import dayjs from 'dayjs';
import React, { FC } from 'react';
import styles from './index.module.scss';

interface IResultTablesFooter {
  tableMode: 'First' | 'Final';
  allSumm?: number;
  indexU?: number;
  summaryInd?: number;
  riskType?: string;
  userFullName?: string;
}

const ResultTablesFooter: FC<IResultTablesFooter> = ({
  tableMode,
  allSumm,
  indexU,
  summaryInd,
  riskType,
  userFullName,
}) => (
  <div>
    <h1 style={{ display: 'flex', justifyContent: 'flex-end' }}>
      Σ Iкрд =

      {allSumm}
    </h1>
    {tableMode === 'Final' && (
      <div>
        <div className={styles.row}>
          <p>Индекс индивидуализации подконтрольного лица</p>
          <p>
            Uинд= Σ Iрпв+ Σ Iкрд =

            {indexU}
          </p>
        </div>
        <div className={styles.row}>
          <p>
            Показатель тяжести потенциальных негативных последствий пожара с
            учетом индекса индивидуализации подконтрольного лица
          </p>
          <p>
            Кг.т.инд.=Uинд + Кгт =

            {summaryInd}
          </p>
        </div>
        <div className={styles.row}>
          <p>Категория риска объекта</p>
          <p>{riskType}</p>
        </div>
        <div className={styles.row}>
          <div className={styles.coll}>
            <p>{userFullName}</p>
            <span>Ф.И.О. выполнившего расчет</span>
          </div>
          <div className={styles.coll}>
            <p>{dayjs().format('DD.MM.YYYY')}</p>
            <span>Дата расчета</span>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default ResultTablesFooter;
