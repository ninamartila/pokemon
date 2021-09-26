import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, SafeAreaView } from "react-native"
import { useDispatch, useSelector } from 'react-redux';
import { colours } from '../data/constants';
import { dimensions, headerHeight } from '../helpers/metrics';
import { pokemonDetail } from '../store/pokemon/action';
import AboutTab from './DetailTabs/AboutTab';
import BaseStatsTab from './DetailTabs/BaseStatsTab';
import EvolutionTab from './DetailTabs/EvolutionTab';
import MovesTab from './DetailTabs/MovesTab';

const tabs = [
    "About", "Base Stats", "Evolution", "Moves"
]

export default function DetailScreen({ route, navigation }) {
    const [selectedTab, setSelectedTab] = useState(tabs[0])
    const dispatch = useDispatch()
    const { url } = route.params
    const { isDataDetailPokemon, isLoadingDetailPokemon, isErrorDetailPokemon } = useSelector((state) => state.pokemon)
    const id = url.split('/')[url.split('/').length - 2]
    const idChar = id.length === 1 ? `#00${id}` : id.length === 2 ? `#0${id}` : `#${id}`

    useEffect(() => {
        dispatch(pokemonDetail(url))
    }, [])

    let renderTab;

    switch (selectedTab) {
        case 'About':
            renderTab = () => <AboutTab data={isDataDetailPokemon} />
            break;
        case 'Base Stats':
            renderTab = () => <BaseStatsTab data={isDataDetailPokemon} />
            break;
        case 'Evolution':
            renderTab = () => <EvolutionTab data={isDataDetailPokemon} />
            break;
        case 'Moves':
            renderTab = () => <MovesTab data={isDataDetailPokemon} />
            break;
        default:
            break;
    }

    return (
        <SafeAreaView style={{ backgroundColor: colours[isDataDetailPokemon?.types[0].type.name], height: (dimensions.screenHeight) - headerHeight - 14 }}>
            <View style={styles.content}>
                <Text style={styles.detailName}>{isDataDetailPokemon?.name}</Text>
                <Text style={styles.detailIdCard}>{idChar}</Text>
                <View style={styles.containerType}>
                    {
                        isDataDetailPokemon?.types.map((element, typeIndex) => {
                            return (
                                <View key={typeIndex} style={styles.contentType}>
                                    <View style={{ backgroundColor: `${colours[isDataDetailPokemon?.types[0].type.name]}80` }}>
                                        <Text style={styles.nameType}>{element.type.name}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            <View style={styles.containerTab}>
                <View style={styles.contentTab}>
                    {tabs.map((item, index) =>
                        <TouchableOpacity key={index} onPress={() => {
                            setSelectedTab(item)
                        }} style={{ flex: 1, paddingVertical: 10, borderBottomWidth: selectedTab === item ? 2 : 0 }}>
                            <Text style={{ color: selectedTab === item ? 'black' : 'darkgrey', textAlign: 'center', fontSize: 16 }}>{item}</Text>
                        </TouchableOpacity>)}
                </View>
                <View style={styles.containerViewTab}>
                    {renderTab()}
                </View>
            </View>
            <View style={styles.containerImage}>
                <Image
                    style={styles.image}
                    source={{ uri: isDataDetailPokemon?.sprites.other['official-artwork'].front_default }}
                />
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    content: { height: 340, padding: 20 },
    detailName: {
        fontSize: 21,
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'capitalize'
    },
    detailIdCard: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right'
    },
    containerType: { display: 'flex', flexDirection: 'row' },
    contentType: {
        backgroundColor: 'white',
        marginRight: 7,
        borderRadius: 10
    },
    nameType: {
        color: 'white',
        textAlign: 'center',
        paddingVertical: 2,
        paddingHorizontal: 10
    },
    containerTab: {
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flex: 1
    },
    contentTab: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 10
    },
    containerViewTab: { width: '100%', flex: 1 },
    containerImage: {
        position: 'absolute',
        left: dimensions.screenWidth / 2 - 125,
        top: 125
    },
    image: { width: 250, height: 250 }
});