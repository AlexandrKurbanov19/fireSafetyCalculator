import React, { useState } from 'react';
import { Form, Select, Table } from 'antd';
import { Item, originData } from './tableData';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let child;

  const onCellChange = (value: number) => {
    record.indicatorValue = value;
  };

  if (
    Array.isArray(children)
    && children[1]?.length
    && Array.isArray(children[1])
  ) {
    child = (
      <Select
        defaultValue={record.criterion[0]}
        onChange={(_, v) => {
          onCellChange(v?.sum);
        }}
        style={{ width: '230px' }}
      >
        {record.criterion?.map((item, index) => (
          <Select.Option key={index} sum={item.sum} value={item.id}>
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

const FirstTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record: Item) => record.key === editingKey;

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
      title: 'Значение показателя Iрпв',
      dataIndex: 'indicatorValue',
      width: '15%',
      editable: false,
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
      />
    </Form>
  );
};

export default FirstTable;
