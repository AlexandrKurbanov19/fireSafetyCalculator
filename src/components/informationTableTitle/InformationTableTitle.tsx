import React, { FC } from 'react';
import styles from './index.module.scss';
import { objectTypeData } from '../mainForm/formsStaticData/index';

interface IInformationTableTitle {
  objectType: string;
  objectName: string;
  objectAddress: string;
  title: string,
}

const InformationTableTitle: FC<IInformationTableTitle> = ({
  objectAddress,
  objectName,
  objectType,
  title,
}) => (
  <div className={styles.titleWrap}>
    <p>{objectTypeData?.find((el) => el?.id === Number(objectType))?.title}</p>
    <p>{objectName}</p>
    <p>
      Расположен по адресу:
      {' '}
      {objectAddress}
    </p>
    <h2>
      {title}
    </h2>
  </div>
);
export default InformationTableTitle;
