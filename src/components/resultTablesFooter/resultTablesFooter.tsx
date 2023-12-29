import dayjs from 'dayjs';
import React, { FC } from 'react';
import styles from './index.module.scss';

interface IResultTablesFooter {
  tableMode: 'First' | 'Final';
  sumForTwoPart?: number;
  sumForOnePart?: number;
  riskType?: string;
  userFullName?: string;
}

const Kgt: number = 0.9489;
const ResultTablesFooter: FC<IResultTablesFooter> = ({
  tableMode,
  sumForTwoPart,
  sumForOnePart,
  riskType,
  userFullName,
}) => (
  <div>
    {tableMode === 'First' && (
      <h1 className={styles.rowStyle}>
        Σ Iрпв =
        {' '}
        {sumForOnePart}
      </h1>
    )}
    {tableMode === 'Final' && (
      <h1 className={styles.rowStyle}>
        Σ Iкрд =
        {' '}
        {sumForTwoPart}
      </h1>
    )}
    {tableMode === 'Final' && (
      <div>
        <div className={styles.row}>
          <p>Индекс индивидуализации подконтрольного лица</p>
          <p>
            Uинд= Σ Iрпв+ Σ Iкрд =
            {' '}
            {sumForTwoPart && sumForOnePart && Number(sumForTwoPart + sumForOnePart)}
          </p>
        </div>
        <div className={styles.row}>
          <p>
            Показатель тяжести потенциальных негативных
            {' '}
            <br />
            последствий пожара с учетом индекса
            {' '}
            <br />
            индивидуализации подконтрольного лица
          </p>
          <p>
            Кг.т.инд.=Uинд + Кгт =
            {' '}
            {sumForTwoPart && sumForOnePart && Number(sumForTwoPart + sumForOnePart + Kgt)}
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
