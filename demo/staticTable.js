import React from 'react';
import Table from '../src/table/index';
import staticData from './mockData/tableData';

const headColumns = [
    {
        text: 'Id',
        columnName: 'id',
        parse() {
            return (
                <div>{this.text + `: will show data: ` + this.columnName}</div>
            );
        }
    },
    {
        text: 'Gender',
        className: 'class1 class2',
        columnName: 'gender'
    },
    {
        text: 'First Name',
        columnName: 'first_name'
    }];

const bodyColumns = [{
    parse() {
        return (
            <div>
                <span className="icons24 alertsCritical"></span>
                <span>{this.id}</span>
            </div>
        );
    }
}];


export default class StaticTable extends React.Component {
    render() {
        return (
            <Table
                bodyColumns={bodyColumns}
                fullData={staticData}
                headColumns={headColumns}
                itemCount={staticData.length}
            />);
    }
}