import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { dimensions } from '../../helpers/metrics'

export default function BaseStatsTab(props) {
    const { data } = props

    return (
        <ScrollView>
            {
                data?.stats.map((element, index) => {
                    return (
                        <View
                            key={index}
                            style={styles.contentList}>
                            <View style={{ width: (dimensions.screenWidth / 3) }}>
                                <Text style={styles.nameList}>{element?.stat?.name}</Text>
                            </View>
                            <View style={{ width: (dimensions.screenWidth / 9) }}>
                                <Text style={styles.statList}>{element?.base_stat}</Text>
                            </View>
                            <View style={styles.contentItem}>
                                <View
                                    style={{
                                        height: 2,
                                        width: `${element?.base_stat}%`,
                                        backgroundColor: ['hp', 'defense'].indexOf(element?.stat?.name) !== -1 ? 'red' : 'green'
                                    }} />
                            </View>
                        </View>
                    )
                })
            }
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    contentList: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center'
    },
    nameList: {
        paddingVertical: 10,
        color: 'darkgrey',
        fontSize: 16,
        textTransform: 'capitalize'
    },
    statList: { paddingVertical: 10, fontSize: 16 },
    contentItem: {
        flex: 1,
        backgroundColor: '#ECF0F1',
        height: 2
    }
})