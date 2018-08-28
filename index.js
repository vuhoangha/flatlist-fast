import React, { Component } from 'react';
import {
    FlatList
} from 'react-native';
import PropTypes from 'prop-types';

export default class FlatListFast extends Component {
    static propTypes = {
        itemOnePage: PropTypes.number.isRequired,
        initNumberRender: PropTypes.number,
    }

    constructor(props) {
        super(props);

        this.loadMore = this.loadMore.bind(this);
        this.getCurrentNumberItem = this.getCurrentNumberItem.bind(this);

        this.initNumberRender = this.props.initNumberRender || this.props.itemOnePage;
        this.currentIndex = 0;
        this.currentData = this.getPartOfList(this.initNumberRender, this.props.data);
    }

    getPartOfList(count, listData) {
        let cloneList = JSON.parse(JSON.stringify(listData));
        if (cloneList.length > count) {
            cloneList.length = count;
        }
        return cloneList;
    }

    getCurrentNumberItem() {
        return this.initNumberRender + this.currentIndex * this.props.itemOnePage;
    }

    loadMore() {
        if (this.getCurrentNumberItem() >= this.props.data.length) return;
        this.currentIndex++;
        this.currentData = this.getPartOfList(this.getCurrentNumberItem(), this.props.data);
        this.setState({});
    }

    componentWillReceiveProps(nextProps) {
        this.initNumberRender = nextProps.initNumberRender || nextProps.itemOnePage;
        this.props.itemOnePage = nextProps.itemOnePage;

        const maxIndex = this.initNumberRender >= nextProps.data.length
            ? 0
            : (nextProps.data.length - this.initNumberRender) / nextProps.itemOnePage + 1;

        if (this.currentIndex > maxIndex) this.currentIndex = maxIndex;

        this.currentData = this.getPartOfList(this.getCurrentNumberItem(), nextProps.data);
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