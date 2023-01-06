import { Button, HStack, Text, View, VStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Pagination = ({ nPages, currentPage, setCurrentPage, total, limit }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(total / limit); i++) {
        pageNumbers.push(i);
    }

    const nextPage = () => {
        if (currentPage !== nPages)
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if (currentPage !== 1)
            setCurrentPage(currentPage - 1)
    }

    const firstPage = () => {
        setCurrentPage(1);
    }

    const lastPage = () => {
        setCurrentPage(nPages);
    }

    return (
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', marginTop: 10 }}>
            <HStack>
                {currentPage !== 1 ? (
                    <Button
                        style={{
                            borderRadius: 100,
                            marginHorizontal: 5,
                            width: 40,
                            backgroundColor: '#EFB600'
                        }}
                        onPress={prevPage}
                    >
                        <FontAwesome5
                            name="chevron-left"
                            size={14}
                            color="black"
                        />
                    </Button>
                )

                    : null}
                {pageNumbers.map(number => (
                    <View key={number}>
                        <Button
                            style={
                                number == currentPage ?
                                    {
                                        borderRadius: 100,
                                        marginHorizontal: 5,
                                        width: 40,
                                        backgroundColor: 'gray'
                                    } : {
                                        borderRadius: 100,
                                        marginHorizontal: 5,
                                        backgroundColor: '#EFB600',
                                        width: 40
                                    }
                            }
                            onPress={() =>
                                setCurrentPage(number)
                            }>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    color: 'black',
                                    fontFamily: 'Roboto-Medium',
                                    fontSize: 15
                                }}>
                                {number}
                            </Text>
                        </Button>
                    </View>
                ))}
                {currentPage !== nPages ?
                    <Button
                        style={{
                            borderRadius: 100,
                            marginHorizontal: 5,
                            backgroundColor: '#EFB600',
                            width: 40,
                        }}
                        onPress={nextPage}
                    >
                        <FontAwesome5
                            name="chevron-right"
                            size={14}
                            color="black"
                        />
                    </Button>
                    : null}
            </HStack>
        </View>
    );
};

export default Pagination;