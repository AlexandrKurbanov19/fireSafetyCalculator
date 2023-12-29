import React, { useMemo } from 'react';
import {
  Form, Table, TableProps,
} from 'antd';
import { Item } from '@/store';
import ResultTablesFooter from '@/components/resultTablesFooter/resultTablesFooter';
import EditableCell from './EditingCell';

interface ITableData {
  part: 'One' | 'Two',
  firstTableData?: Item[];
  changeFirstTableData?: (v: Item[]) => void;
  secondTableData?: Item[];
  changeSecondTableData?: (v: Item[]) => void;
  fullName?: string;
  sumForOnePart?: number;
  sumForTwoPart?: number;
  columns: { title: string, dataIndex: string, width: string, editable: boolean }[]
}
const tableScroll: TableProps<ITableData>['scroll'] = { x: true };

const InformationTable: React.FC<ITableData> = (
  {
    firstTableData,
    changeFirstTableData,
    secondTableData,
    changeSecondTableData,
    fullName,
    sumForOnePart,
    sumForTwoPart,
    columns,
    part,
  },
) => {
  const [form] = Form.useForm();

  const mergedColumns = useMemo(() => columns.map((col) => {
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
  }), [columns]);

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: (props: any) => (
              <EditableCell
                {...props}
                dataIndex={props.dataIndex}
                title={props.title}
                record={props.record}
                children={props.children}
                firstTableData={firstTableData}
                secondTableData={secondTableData}
                changeFirstTableData={changeFirstTableData}
                changeSecondTableData={changeSecondTableData}
                part={part}
              />
            ),
          },
        }}
        bordered
        dataSource={part === 'One' ? firstTableData : secondTableData}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
        scroll={tableScroll}
      />
      <ResultTablesFooter
        sumForTwoPart={sumForTwoPart}
        sumForOnePart={sumForOnePart}
        userFullName={fullName}
        riskType="Очень опасно"
        tableMode={part === 'One' ? 'First' : 'Final'}
      />
    </Form>
  );
};

export default InformationTable;
