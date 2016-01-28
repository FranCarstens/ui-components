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

export default class DynamicTable extends React.Component {
    mockedFetch(itemIndex) {
        return new Promise((resolve) => {
            setTimeout(()=> {
                resolve(staticData.slice(itemIndex, itemIndex + 25));
            }, 1000);
        });
    }

    render() {
        return (
            <Table
                bodyColumns={bodyColumns}
                headColumns={headColumns}
                itemCount={staticData.length}
                fetchFullData={this.mockedFetch}
            />);
    }
}
