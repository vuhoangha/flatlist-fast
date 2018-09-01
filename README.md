# flatlist-fast

Flatlist-fast base on FLatList, so it has all the properties of the FlatList.

FLatlist-fast will render when you scroll to end or 'onEndReachedThreshold'.

Every one rendered, Flatlist-fast will render 'itemOnePage' more element.

If you don't set the 'initialNumToRender' property, Flatlist-fast will render initial item number equal to 'itemOnePage' property

# Example

    import FlatListFast from 'flatlist-fast';

    <FlatListFast
        ref={ref => this.flatList = ref}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        getItemLayout={(data, index) => (
            { length: 50, offset: index * 50, index }
        )}
        data={this.state.listData}
        renderItem={({ item, index }) =>
            <Text>
                {`example ${index}: ${item}`}
            </Text>}
        keyExtractor={item => item.id}
        style={styles.container}
        itemOnePage={12}
        initialNumToRender={20}
        onEndReachedThreshold={0.4}
    />
    