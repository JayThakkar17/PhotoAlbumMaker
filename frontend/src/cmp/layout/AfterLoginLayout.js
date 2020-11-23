import React, { Component } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

export default class AfterLoginLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            condition: true,
            album: {},
            title: '',
            albumDetailTitle: '',
        };
        this.handler = this.handler.bind(this);
    }

    handler(e) {
        e.preventDefault();
        this.setState({ condition: !this.state.condition });
    }

    render() {
        const {
            album,
            title,
            condition,
            albumDetailTitle,
        } = this.state;
        const childrenWithProps = React.Children.map(this.props.children, child =>
            React.cloneElement(child, {
                album: album,
            })
        );

        return (
            <div className={condition ? 'Toggled AdminApp' : 'AdminApp'}>
                <div className="left-sidebar-main-wrap">
                    <Sidebar />
                </div>
                <div className="content-area">
                    <Header
                        handler={this.handler}
                        title={title === 'Album detail' ? albumDetailTitle : title}
                        isAlbumDetail={title === 'Album detail' ? true : false}
                    />
                    <div className="page-wrap">
                    </div>
                </div>
            </div>
        );
    }
}
