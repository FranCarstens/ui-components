import 'commonStyle/_global.scss';

import TableContent from './TableContent.jsx';
import Pager from './../pager';
import React from 'react';

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemIndex: props.itemIndex,
            renderData: props.fullData ? props.fullData.slice(props.itemIndex, props.itemIndex + props.itemPerPage) : [],
            loading: false
        };
    }

    componentDidMount() {
        if (this.props.fetchFullData) {
            this._fetchData(this.state.itemIndex);
        }
    }

    _fetchData(itemIndex) {
        if (!this.props.fullData && this.props.fetchFullData) {
            this.setState({loading: true});
            this.props.fetchFullData(itemIndex).then((data)=> {
                this.setState({renderData: data});
                this.setState({loading: false});
            });
        } else {
            this.setState({renderData: this.props.fullData.slice(itemIndex, itemIndex + this.props.itemPerPage)});
        }
    }


    render() {
        const pagerAttrs = {
            itemCount: this.props.itemCount,
            itemPerPage: this.props.itemPerPage
        };

        return (
            <div>
                <Pager
                    {...pagerAttrs}
                    paginationChangeCallback={(pagination) => {
                        const itemIndex =(pagination - 1) * this.props.itemPerPage;
                        this.setState({itemIndex: itemIndex});
                        this._fetchData(itemIndex);
                        this.refs.bottomPager.setStateObj(this.refs.topPager.state);
                        }}
                    ref={'topPager'}
                />

                <TableContent
                    loading={this.state.loading}
                    bodyColumns={this.props.bodyColumns}
                    renderData={this.state.renderData}
                    headColumns={this.props.headColumns}
                    itemPerPage={this.props.itemPerPage}
                    itemIndex={this.state.itemIndex}
                />
                <Pager
                    {...pagerAttrs}
                    paginationChangeCallback={(pagination) => {
                        const itemIndex =(pagination - 1) * this.props.itemPerPage;
                        this.setState({itemIndex: itemIndex});
                        this._fetchData(itemIndex);
                        this.refs.topPager.setStateObj(this.refs.bottomPager.state);
                        }}
                    ref={'bottomPager'}
                />

            </div>
        );
    }
}


Table.propTypes = {
    itemCount: React.PropTypes.number,
    itemPerPage: React.PropTypes.number,
    itemIndex: React.PropTypes.number,
    fullData: React.PropTypes.array,
    headColumns: React.PropTypes.array,
    bodyColumns: React.PropTypes.array,
    fetchFullData: React.PropTypes.func
};

Table.defaultProps = {
    itemPerPage: 25,
    itemIndex: 0
};

export default Table;