import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory} from 'react-router';
import StaticTable from './staticTable';
import DynamicTable from './dynamicTable';
import 'commonStyle/_font-face.scss';

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/staticTable">Static Table</Link></li>
                    <li><Link to="/dynamicTable">Dynamic Table</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}

ReactDOM.render((
    <Router history={hashHistory}>
        <Route
            path="/"
            component={App}
        >
            <Route
                path="staticTable"
                component={StaticTable}
            />
            <Route
                path="dynamicTable"
                component={DynamicTable}
            />
        </Route>
    </Router>
), document.getElementById('app'));