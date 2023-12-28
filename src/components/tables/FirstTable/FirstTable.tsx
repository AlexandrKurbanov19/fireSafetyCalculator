import React, { useMemo } from 'react';
import { Form, Select, Table } from 'antd';
import { Item, StoreState } from '@/store';
import { EditableCellProps } from '../TablesApiData/tableData';

const columns = [
  {
    title: 'Индикаторы риска причинения вреда (ущерба)',
    dataIndex: 'risk',
    width: '40%',
    editable: false,
  },
  {
    title: 'Показатель (критерий оценки)',
    dataIndex: 'criterion',
    width: '25%',
    editable: true,
  },
  {
    title: 'Значение показателя Irp',
    dataIndex: 'indicatorValue',
    width: '15%',
    editable: false,
  },
];

const FirstTable: React.FC<Pick<StoreState, 'firstTableData' | 'changeFirstTableData'>> = (
  {
    firstTableData,
    changeFirstTableData,
  },
) => {
  const [form] = Form.useForm();

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  const EditableCell: React.FC<EditableCellProps> = ({
    dataIndex,
    title,
    record,
    children,
    ...restProps
  }) => {
    let child;

    const onCellChange = (value: number, criterionId: string | null | undefined | number) => {
      const updatedData = firstTableData.map((item) => {
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
      changeFirstTableData(updatedData);
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
          style={{ width: '230px' }}
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

  const allSumm = useMemo(() => firstTableData?.reduce((acc, currentVal) => acc + currentVal?.indicatorValue, 0), [firstTableData]);

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={firstTableData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
        scroll={{ x: true }}
      />
      <h1 style={{ display: 'flex', justifyContent: 'flex-end' }}>
        Σ Iрпв =
        {allSumm}
      </h1>
    </Form>
  );
};

export default FirstTable;
