import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, Platform, SafeAreaView } from "react-native"
import { useDispatch, useSelector } from 'react-redux';
import { colours } from '../data/constants';
import { dimensions, headerHeight } from '../helpers/metrics';
import { getPokemonList } from '../store/pokemon/action';

export default function HomeScreen({ navigation }) {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const { pokemonList, nextUrl } = useSelector((state) => state.pokemon)

    useEffect(() => {
        dispatch(getPokemonList())
    }, [])

    function onPress(url) {
        navigation.navigate('Detail', { url })
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={pokemonList || []}
                    numColumns={2}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReachedThreshold={0}
                    onEndReached={() => {
                        dispatch(getPokemonList(true))
                    }}
                    ListFooterComponent={() => {
                        if (nextUrl) {
                            return <ActivityIndicator size="large" color={'blue'} />
                        } else {
                            return <View />
                        }
                    }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            key={item?.url}
                            onPress={() => onPress(item?.url)}
                        >
                            <View style={[styles.containerItem, { backgroundColor: colours[item?.types[0].type.name] }]}>
                                <View style={styles.contentItem}>
                                    <View style={styles.listItem}>
                                        <Text style={styles.nameItem}>{item?.name}</Text>
                                        {
                                            item?.types.map((element, typeIndex) => {
                                                return (
                                                    <View key={typeIndex} style={styles.containerType}>
                                                        <View style={{ backgroundColor: `${colours[item?.types[0].type.name]}80` }}>
                                                            <Text style={styles.elementType}>{element.type.name}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                    <Image
                                        style={styles.image}
                                        source={{ uri: item?.sprites.other['official-artwork'].front_default }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { paddingHorizontal: 10, height: dimensions.windowHeight - headerHeight - 24 },
    title: { fontSize: 21, fontWeight: 'bold' },
    containerItem: {
        marginVertical: 5,
        width: (dimensions.screenWidth / 2) - 20,
        marginHorizontal: 5,
        marginHorizontal: 5,
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    contentItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    listItem: { display: 'flex', alignItems: 'flex-start' },
    nameItem: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    containerType: {
        backgroundColor: 'white',
        marginTop: 5,
        borderRadius: 10
    },
    elementType: {
        color: 'white',
        textAlign: 'center',
        paddingVertical: 2,
        fontSize: 12,
        paddingHorizontal: 10
    },
    image: { width: 68, height: 68 }
});