import { FC } from 'react';
import styles from './index.module.scss';
import { objectTypeData } from '../../formsStaticData';

interface IInformationTableTitle {
  objectType: string;
  objectName: string;
  objectAddress: string;
  tableTitle: string;
}

export const InformationTableTitle: FC<IInformationTableTitle> = ({
  objectAddress,
  objectName,
  objectType,
  tableTitle,
}) => (
  <div className={styles.titleWrap}>
    <p>{objectTypeData?.find((el) => el?.id === Number(objectType))?.title}</p>
    <p>{objectName}</p>
    <p>
      Расположен по адресу:
      {objectAddress}
    </p>
    <h2>
      Определение индификаторов риска
      {tableTitle}
    </h2>
  </div>
);
