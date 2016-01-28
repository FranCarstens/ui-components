import style from './style/_pager.scss'
import 'commonStyle/_icons.scss';
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

class Pager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemCount: props.itemCount,
            pagination: props.pagination || 1
        };

        // item count in one page:
        this.maxPagination = Math.ceil(props.itemCount / props.itemPerPage);

        this.maxPagerPos = Math.ceil(this.maxPagination / props.pagerSize);
        this.pagerPos = Math.ceil(this.state.pagination / props.pagerSize);
    }

    setStateObj(stateObj) {
        this.setState(stateObj);
    }

    _computePageRange() {
        // the pager start index
        this.start = this._getStartPage();

        // the pager end index
        this.end = this._getEndPage();
        return _.range(this.start, this.end);
    }

    _onClickPagerPrev() {
        this.pagerPos = Math.max(--this.pagerPos, 1);
        this.setState({pagination: this._getStartPage()});

        this.setState({range: this._computePageRange()});
    }

    _onClickPagerNext() {
        this.pagerPos = Math.min(++this.pagerPos, this.maxPagerPos);
        this.setState({'pagination': this._getStartPage()});
        this.setState({range: this._computePageRange()});
    }

    _getStartPage() {
        return Math.max((this.pagerPos - 1) * this.props.pagerSize + 1, 1);
    }

    _getEndPage() {
        return Math.min(this._getStartPage() + this.props.pagerSize, this.maxPagination + 1);
    }

    componentWillMount() {
        if (!this.state.range) {
            this.setState({range: this._computePageRange()});
        }
    }

    componentDidUpdate() {
        this.props.paginationChangeCallback(this.state.pagination);
    }

    shouldComponentUpdate(nextProps, nextState) {
        //todo: simple implement here, should use immutableJS for robustness consideration later.
        return nextState.pagination !== this.state.pagination;
    }

    render() {
        return (
            <div>
                <div className="pager-top">
                    <div className={ style['lm-pager'] }>
                        <span className="total">{ this.state.itemCount } items</span>
                        { (()=> {
                            if (this.state.itemCount >= 1) {
                                return (
                                    <div className="pager-directly-item">
                                        <span className="pager-splitter"></span>
                                        <span className="pager-prev pager-arrow"
                                              style={ {display: this.pagerPos === 1? 'none' : 'inline-block'} }>
                                          <span className="icons16 page-left"
                                                onClick={ this._onClickPagerPrev.bind(this) }>
                                          </span>
                                        </span>
                                        { this.state.range.map((rangeNumber, index)=> {
                                            let names = classNames('pager-num', {cur: rangeNumber === this.state.pagination});
                                            return <span className={ names }
                                                         key={ index }
                                                         onClick={ (e)=>{
                                           this.setState({pagination: rangeNumber});
                                         } }
                                            >{ rangeNumber }</span>
                                        }) }
                                              <span className="pager-next pager-arrow"
                                                    style={ {display: this.pagerPos === this.maxPagerPos? 'none': 'inline-block'} }>
                                                <span className="icons16 page-right"
                                                      onClick={ this._onClickPagerNext.bind(this) }>
                                                </span>
                                              </span>
                                    </div>
                                );
                            }
                        })() }
                    </div>
                </div>
            </div>
        );
    }
}

Pager.propTypes = {
    // item total count
    itemCount: React.PropTypes.number,
    // how many item per page
    itemPerPage: React.PropTypes.number,
    paginationChangeCallback: React.PropTypes.func
};

Pager.defaultProps = {itemPerPage: 25, pagerSize: 5};

export default Pager;