import React,{useState,useEffect,useRef} from "react";
import { View, Text,Image,ScrollView,StyleSheet,FlatList,ImageBackground,TouchableOpacity,SafeAreaView,Modal,Animated } from "react-native";
import icons from "../constants/icons"
import {COLORS,SIZES} from "../constants/theme"
import images from "../constants/images"
import {shoeRecentlyViewedData,shoeTrendingData} from "../apis/apis"
import {
  Svg,
  Polygon
} from 'react-native-svg';
import { BlurView } from "@react-native-community/blur";
import { categoriesData } from "../apis/apis";
import List from "../components/list";
import { VictoryPie } from 'victory-native';


const Chart = (props) => {
  const {
    colorScales,
    selectedCategories,
    setSelectCategoryByName,
    totalExpenseCount,
    chartData
  } = props
  return (
        <ScrollView contentContainerStyle={{flex:1}}>
            <View style={{flex:1,alignItems:'center'}}>
            <VictoryPie
                data={chartData}
                colorScale={colorScales}
                radius={({ datum }) => (selectedCategories && selectedCategories.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                innerRadius={70}
                labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
                style={{
                    labels: { fill: "white",fontWeight:'600',fontSize:18},
                    parent: {
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 2,
                        height: 2,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                    elevation: 3,
                    },
                }}
                width={SIZES.width * 0.8}
                height={SIZES.width * 0.8}
                events={[{
                    target: "data",
                    eventHandlers: {
                        onPress: () => {
                            return [{
                                target: "labels",
                                mutation: (props) => {
                                    let categoryName = chartData[props.index].name
                                    setSelectCategoryByName(categoryName)
                                }
                            }]
                        }
                    }
                }]}
            />
            </View>
            <View style={{ position: 'absolute', top: '23%', left: "39%" }}>
                    <Text style={[styles.txtMyexSmall,
                        {
                        textAlign:'center',
                        fontSize:32
                        }
                        ]}>
                        {totalExpenseCount}</Text>
                    <Text style={[styles.txtdesMyex,{
                        textAlign:'center',
                        fontSize:18
                    }]}>Expenses</Text>
            </View>
            <View style={{flex:0.6,paddingBottom:20}}>
            <FlatList
                    data={chartData}
                    showsVerticalScrollIndicator={false}
                    keyExtractor= {item => item.id}
                    renderItem = {({item}) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            height: 40,
                            paddingHorizontal: SIZES.radius,
                            borderRadius: 10,
                            backgroundColor: (selectedCategories && selectedCategories.name == item.name) ? item.color : COLORS.white
                        }}
                        onPress={() => {
                            let categoryName = item.name
                            setSelectCategoryByName(categoryName)
                        }}
                    >
                        {/* Name/Category */}
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View
                                style={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: (selectedCategories && selectedCategories.name == item.name) ? COLORS.white : item.color,
                                    borderRadius: 5
                                }}
                            />
        
                            <Text style={{ marginLeft: SIZES.base, color: (selectedCategories && selectedCategories.name == item.name) ? COLORS.white : COLORS.primary }}>{item.name}</Text>
                        </View>
        
                        {/* Expenses */}
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ color: (selectedCategories && selectedCategories.name == item.name) ? COLORS.white : COLORS.primary }}>{item.y} USD - {item.label}</Text>
                        </View>
                    </TouchableOpacity>
                    )}
            />
            </View>
        </ScrollView>
     
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

export default Chart;
