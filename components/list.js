import React,{useState,useEffect,useRef} from "react";
import { View, Text,Image,ScrollView,StyleSheet,FlatList,ImageBackground,TouchableOpacity,SafeAreaView,Modal,Animated } from "react-native";
import icons from "../constants/icons"
import {COLORS} from "../constants/theme"
import images from "../constants/images"
import {shoeRecentlyViewedData,shoeTrendingData} from "../apis/apis"
import {
  Svg,
  Polygon
} from 'react-native-svg';
import { BlurView } from "@react-native-community/blur";
import { categoriesData } from "../apis/apis";


const List = (props) => {
    const {
        categoryListHeightAnimationValue,
        selectedCategories,
        onToggle,
        showMoreToggle,
        categories,
        setSelectedCategories
    } = props
    return (
        <View style={{flex:0.9}}>
            <Animated.View style={{height:categoryListHeightAnimationValue}}>
            <FlatList
                contentContainerStyle={{flex:1}}
                scrollEnabled={false}
                data={categories}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                keyExtractor= {item => item.id}
                renderItem = {({item}) => (
                <TouchableOpacity 
                onPress={() => setSelectedCategories(item)}
                style={{
                    flex:1,
                    flexDirection:'row',
                    alignItems:"center",
                    margin:10,
                    padding:10,
                    backgroundColor:selectedCategories?.id == item.id ? COLORS.gray : COLORS.white,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 2,
                        height: 2,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    elevation: 3,
                    borderRadius:10
                    }}>
                    <Image
                    style={{
                        width:30,
                        height:30,
                        tintColor:item.color,
                        marginRight:10,
                    }}
                    source={item.icon}
                    />
                    <Text style={[styles.txtMyexSmall,{fontSize:16}]}>{item.name}</Text>
                </TouchableOpacity>
                )}
            />
            </Animated.View>
            <TouchableOpacity 
            onPress={() => onToggle()}
            style={{
            flex:0.1,
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center'
            }}>
                <Text style={[styles.txtMyexSmall,{fontSize:15}]}>
                {showMoreToggle ? "LESS" : "MORE"}
                </Text>
                <Image
                style={{
                    width:15,
                    height:15,
                    tintColor:COLORS.primary,
                    marginHorizontal:5
                }}
                source={showMoreToggle ? icons.up_arrow : icons.down_arrow}
                />
            </TouchableOpacity>
            {selectedCategories && (
            <View style={{flex:0.9}}>
                <View style={{paddingVertical:10}}>
                <Text style={styles.txtMyexSmall}>INCOMING EXPENSES</Text>
                <Text style={styles.txtdesMyex}>{selectedCategories?.expenses.length} Total</Text>
                </View>
                {selectedCategories?.expenses.length == 0 && (
                <View style={{
                    flex:1,
                    alignItems:'center',
                    justifyContent:'center'
                    }}>
                    <Text style={styles.txtMyex}>No Result</Text>
                </View>
                )
                }
                {selectedCategories?.expenses.length > 0 && (
                <View style={{flex:0.9}}>
                    <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={true}
                    data={selectedCategories?.expenses}
                    keyExtractor= {item => item.id}
                    renderItem = {({item}) => (
                        <View style={{
                        flex:1,
                        backgroundColor:COLORS.white,
                        marginHorizontal:10,
                        width:280,
                        height:"100%",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 1.5,
                        elevation: 3,
                        borderBottomRightRadius:15,
                        borderBottomLeftRadius:15
                        }}>
                        <ScrollView 
                            showsVerticalScrollIndicator={false}
                        >
                            <View style ={{
                            paddingBottom:60,
                            flex:1,
                            paddingHorizontal:15,
                            paddingVertical:15
                            }}>
                            <View style={{
                                flexDirection:'row',
                                alignItems:'center',
                                paddingBottom:20
                            }}>
                                <Image
                                style={{
                                    width:30,
                                    height:30,
                                    tintColor:selectedCategories.color,
                                    marginRight:10,
                                }}
                                source={selectedCategories.icon}
                                />
                                <Text style={[styles.txtMyexSmall,
                                { fontSize:16,
                                    textTransform:'uppercase',
                                    color:selectedCategories.color
                                }
                                ]}>{selectedCategories.name}</Text>
                            </View>
                            <View style={{
                                height:100,
                                }}>
                                <Text style={styles.txtMyex}>{item.title}</Text>
                                <Text style={styles.txtdesMyex}>{item.description}</Text>
                            </View>
                            <View>
                                <Text style={[styles.txtMyexSmall,{
                                fontSize:13,
                                paddingBottom:6 
                                }]}>LOCATION</Text>
                                <Text numberOfLines={1} style={styles.txtdesMyex}>📍 {item.location}</Text>
                            </View>
                            </View>
                        </ScrollView>
                        <TouchableOpacity style={{
                            position:'absolute',
                            height:50,
                            width:'100%',
                            bottom:0,
                            backgroundColor:selectedCategories.color,
                            borderBottomLeftRadius:10,
                            borderBottomRightRadius:10,
                            alignItems:'center',
                            justifyContent:'center'
                            }}>
                            <Text style={styles.txtConfirm}>CONFIRM {item.total.toFixed(1)} USD</Text>
                        </TouchableOpacity>
                        </View>
                    )}
                    />
                </View>
                )
                }
            </View>
            )
            }
        </View>
  );
};

const styles = StyleSheet.create({
  txtMyex:{
    fontSize:22,
    fontWeight:'500',
    color:COLORS.primary,
    paddingVertical:10
  },
  txtdesMyex:{
    fontSize:16,
    fontWeight:'500',
    color:COLORS.lightBlue,
  },
  txtMyexSmall:{
    fontSize:18,
    fontWeight:'500',
    color:COLORS.primary,
  },
  icons:{
    width:20,
    height:20,
    tintColor:COLORS.lightBlue,
    marginHorizontal:15
  },
  viewMode:{
    width:40,
    height:40,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center'
  },
  txtConfirm:{
    fontSize :16,
    fontWeight:'700',
    color:COLORS.white
  }
})

export default List;
