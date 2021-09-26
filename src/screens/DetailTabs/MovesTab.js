import React from 'react'
import { View, Text, ScrollView } from 'react-native'

export default function MovesTab(props) {
    const { data } = props

    return (
        <View style={{ marginHorizontal: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>{data?.moves[0]?.move.name}</Text>
        </View>
    )
}
