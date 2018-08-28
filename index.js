import React, { Component } from 'react';
import {
    FlatList
} from 'react-native';
import PropTypes from 'prop-types';

export default class FlatListFast extends Component {
    static propTypes = {
        itemOnePage: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props);

        this.loadMore = this.loadMore.bind(this);

        this.currentIndex = 1;
        this.currentData = this.getPartOfList(this.currentIndex * this.props.itemOnePage, this.props.data);
    }

    getPartOfList(count, listData) {
        let cloneList = JSON.parse(JSON.stringify(listData));
        if (cloneList.length > count) {
            cloneList.length = count;
        }
        return cloneList;
    }

    loadMore() {
        if (this.currentIndex * this.props.itemOnePage >= this.props.data.length) return;
        this.currentIndex++;
        this.currentData = this.getPartOfList(this.currentIndex * this.props.itemOnePage, this.props.data);
        this.setState({});
    }

    componentWillReceiveProps(nextProps) {
        const maxIndex = nextProps.data.length / nextProps.itemOnePage + 1;
        if (this.currentIndex > maxIndex) this.currentIndex = maxIndex;
        this.currentData = this.getPartOfList(this.currentIndex * nextProps.itemOnePage, nextProps.data);
    }

    render() {
        return (
            <FlatList
                {...this.props}
                data={this.currentData}
                onEndReached={this.loadMore}
            />
        );
    }
};