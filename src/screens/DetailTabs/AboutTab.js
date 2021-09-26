import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { dimensions } from '../../helpers/metrics'

export default function AboutTab(props) {
    const { data } = props

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Species</Text>
                <Text style={styles.title}>Height</Text>
                <Text style={styles.title}>Weight</Text>
                <Text style={styles.title}>Abilities</Text>
            </View>
            <View>
                <Text style={styles.nameList}>{data?.species?.name}</Text>
                <Text style={styles.itemList}>{data?.height}</Text>
                <Text style={styles.itemList}>{data?.weight}</Text>
                <Text style={styles.itemList}>{data?.abilities?.map(element => element?.ability?.name).join(', ')}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 20
    },
    content: { width: (dimensions.screenWidth / 3) },
    title: {
        paddingVertical: 10,
        color: 'darkgrey',
        fontSize: 16
    },
    nameList: {
        paddingVertical: 10,
        fontSize: 16,
        textTransform: 'capitalize'
    },
    itemList: { paddingVertical: 10, fontSize: 16 }
})
