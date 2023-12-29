import { Select } from 'antd';
import React from 'react';
import { EditableCellProps } from '../TablesApiData/tableData';
import { Item } from '@/store';

const styleSelect = { width: '230px' };
const EditableCell: React.FC<EditableCellProps> = ({
  dataIndex,
  title,
  record,
  children,
  firstTableData,
  secondTableData,
  changeFirstTableData,
  changeSecondTableData,
  part,
  ...restProps
}) => {
  let child;

  const onCellChange = (value: number, criterionId: string | null | undefined | number) => {
    let arrayForMapping: Item[] = [];
    if (firstTableData && firstTableData?.length && part === 'One') {
      arrayForMapping = [...firstTableData];
    }
    if (secondTableData && secondTableData?.length && part === 'Two') {
      arrayForMapping = [...secondTableData];
    }
    const updatedData = arrayForMapping?.map((item) => {
      if (item.key === record.key) {
        return {
          ...item,
          criterion: item.criterion?.map((el) => {
            if (el?.id === criterionId) {
              el.select = true;
              return el;
            }
            el.select = false;
            return el;
          }),
          indicatorValue: value,
        };
      }
      return item;
    });

    if (changeFirstTableData && part === 'One') {
      changeFirstTableData(updatedData);
    } else if (changeSecondTableData && part === 'Two') {
      changeSecondTableData(updatedData);
    }
  };
  if (
    Array.isArray(children)
    && children[1]?.length
    && Array.isArray(children[1])
  ) {
    child = (
      <Select
        value={record.criterion?.find((el) => el?.select)}
        onChange={(_, v) => {
          if (!Array.isArray(v)) {
            onCellChange(v?.sum, v?.value);
          }
        }}
        style={styleSelect}
      >
        {record.criterion?.map((item) => (
          <Select.Option key={item.id} sum={item.sum} value={item.id}>
            {item.value}
          </Select.Option>
        ))}
      </Select>
    );
  } else {
    child = children;
  }
  return <td {...restProps}>{child}</td>;
};
export default EditableCell;
