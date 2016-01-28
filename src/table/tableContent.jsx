import React from 'react';
import styles from './style/_table.scss';
import _ from 'lodash';

class TableContent extends React.Component {
    render() {
        return (
            <div style={{position: 'relative'}}>
                {
                    (() => {
                        if (this.props.loading) {
                            return <div style={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                opacity: 0.5,
                                cursor: 'wait',
                                zIndex: 999,
                                background: 'grey'
                            }}>
                            </div>;
                        }
                    })()
                }
                <table className={styles['lm-table']}>
                    <thead>
                    <tr>
                        {this.props.headColumns.map((headEl, index)=> {
                            return (<th key={index}
                                        className={headEl.className}>
                                {_.isFunction(headEl.parse) ? headEl.parse.bind(headEl)() : headEl.text}
                            </th>);
                        })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.renderData.map((trEl, index)=> {
                            return (
                                <tr className="data-row"
                                    key={index}>
                                    {this.props.headColumns.map((headEl, index)=> {
                                        const columnName = headEl.columnName;
                                        const columnParse = this.props.bodyColumns[index] && this.props.bodyColumns[index].parse;
                                        return (<td key={index}>
                                            {_.isFunction(columnParse) ? columnParse.bind(trEl)() : trEl[columnName]}
                                        </td>);
                                    })
                                    }
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>  );
    }
}

TableContent.propTypes = {
    renderData: React.PropTypes.array,
    headColumns: React.PropTypes.array,
    bodyColumns: React.PropTypes.array,
    itemPerPage: React.PropTypes.number,
    initialItemIndex: React.PropTypes.number,
    loading: React.PropTypes.bool
};

TableContent.defaultProps = {
    itemPerPage: 25,
    itemIndex: 0
};

export default TableContent;