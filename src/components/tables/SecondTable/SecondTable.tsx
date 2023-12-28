import React, { useMemo } from 'react';
import { Form, Select, Table } from 'antd';
import { Item, StoreState } from '@/store';
import { ResultTablesFooter } from '@/components/resultTablesFooter/resultTablesFooter';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const columns = [
  {
    title: 'Критерии добросоветсности',
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
    title: 'Значение показателя Iкрд',
    dataIndex: 'indicatorValue',
    width: '15%',
    editable: false,
  },
];

const SecondTable: React.FC<Pick<StoreState, 'secondTableData' | 'changeSecondTableData' | 'fullName'>> = (
  {
    secondTableData,
    changeSecondTableData,
    fullName,
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
    index,
    children,
    ...restProps
  }) => {
    let child;

    const onCellChange = (value: number, criterionId: string) => {
      const updatedData = secondTableData.map((item) => {
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
      changeSecondTableData(updatedData);
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
            onCellChange(v?.sum, v?.value);
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

  const allSumm = useMemo(() => secondTableData?.reduce((acc, currentVal) => acc + currentVal?.indicatorValue, 0), [secondTableData]);

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={secondTableData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
        scroll={{x: true}}
      />
      <ResultTablesFooter
        allSumm={allSumm}
        userFullName={fullName}
        tableMode="Final"
      />
    </Form>
  );
};

export default SecondTable;
