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
import Chart from "../components/chart";


const ExpenseTracker = (props) => {
  const categoryListHeightAnimationValue = useRef(new Animated.Value(145)).current;
  const [viewMode,setViewMode] = useState('chart')
  const [categories, setCategories] = useState(categoriesData)
  const [selectedCategories, setSelectedCategories] = useState(null)
  const [showMoreToggle, setShowMoreToggle] = useState(false)
  const onToggle = () => {
    if (showMoreToggle) {
      Animated.timing(categoryListHeightAnimationValue, {
          toValue: 145,
          duration: 500,
          useNativeDriver: false
      }).start()
    } else {
        Animated.timing(categoryListHeightAnimationValue, {
            toValue: 220,
            duration: 500,
            useNativeDriver: false
        }).start()
    }
    setShowMoreToggle(!showMoreToggle)
  }
  const  processCategoryDataToDisplay = () => {
    // Filter expenses with "Confirmed" status
    let chartData = categories.map((item) => {
        let confirmExpenses = item.expenses.filter(a => a.status == "C")
        var total = confirmExpenses.reduce((a, b) => a + (b.total || 0), 0)

        return {
            name: item.name,
            y: total,
            expenseCount: confirmExpenses.length,
            color: item.color,
            id: item.id
        }
    })

    // filter out categories with no data/expenses
    let filterChartData = chartData.filter(a => a.y > 0)

    // Calculate the total expenses
    let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0)

    // Calculate percentage and repopulate chart data
    let finalChartData = filterChartData.map((item) => {
        let percentage = (item.y / totalExpense * 100).toFixed(0)
        return {
            label: `${percentage}%`,
            y: Number(item.y),
            expenseCount: item.expenseCount,
            color: item.color,
            name: item.name,
            id: item.id
        }
    })
    return finalChartData
  }
  let chartData = processCategoryDataToDisplay()
  let colorScales = chartData.map((item) => item.color)
  let totalExpenseCount = chartData.reduce((a, b) => a + (b.expenseCount || 0), 0)
  const setSelectCategoryByName = (name) => {
    let category = categories.filter(a => a.name == name)
    setSelectedCategories(category[0])
}
  return (
    <View style={{flex:1,backgroundColor:COLORS.white}}>
      <SafeAreaView style={{flex:0.05,backgroundColor:COLORS.white}}>
        <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          paddingHorizontal:15,
          paddingTop:10,
          alignItems:'center'
          }}>
          <TouchableOpacity>
            <Image
            source={icons.back_arrow}
            style={{
              width:25,
              height:25,
              tintColor:COLORS.primary
            }}
            resizeMode='contain'
            />
          </TouchableOpacity> 
          <TouchableOpacity>
            <Image
            source={icons.more}
            style={{
              width:25,
              height:25,
              tintColor:COLORS.primary
            }}
            resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={{flex:0.2,paddingHorizontal:15}}>
          <Text style={styles.txtMyex}>My Expense</Text>
          <Text style={styles.txtdesMyex}>Summary (private)</Text>
          <View style={{
            flexDirection:'row',
            paddingVertical:20,
            alignItems:'center'
            }}>
            <Image
              style={styles.icons}
              source={icons.calendar}
            />
            <View>
              <Text style={styles.txtMyexSmall}>07 Feb,2019</Text>
              <Text style={styles.txtdesMyex}>18% more than last month</Text>
            </View>
          </View>
      </View>
      <View style={{flex:0.8,paddingHorizontal:15}}>
          <View style={{
            flex:0.1,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
          }}>
            <View>
              <Text style={styles.txtMyexSmall}>CATEGORIES</Text>
              <Text style={styles.txtdesMyex}>{categories?.length} Total</Text>
            </View>
            <View style={{
              flexDirection:'row',
              alignItems:'center'
              }}>
              <TouchableOpacity
                onPress={() => setViewMode('chart')}
                style={[styles.viewMode,{
                    backgroundColor:viewMode =='chart' ? COLORS.secondary :null
                }]}
              >
                <Image
                  style={[styles.icons,{
                    tintColor:viewMode =='chart' ? COLORS.white :COLORS.lightBlue
                  }]}
                  source={icons.chart}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setViewMode('list')}
                style={[styles.viewMode,{
                  backgroundColor:viewMode =='list' ? COLORS.secondary :null
                }]}
              >
                <Image
                  style={[styles.icons,{
                    tintColor:viewMode =='list' ? COLORS.white :COLORS.lightBlue
                  }]}
                  source={icons.menu}
                />
              </TouchableOpacity>
            </View>
          </View>
          {viewMode == "list" && (
            <List
            categoryListHeightAnimationValue = {categoryListHeightAnimationValue}
            selectedCategories = {selectedCategories}
            onToggle = {onToggle}
            showMoreToggle = {showMoreToggle}
            categories={categories}
            setSelectedCategories={setSelectedCategories}
            />
          )
          }
          {viewMode == "chart" && (
            <Chart
            colorScales={colorScales}
            selectedCategories ={selectedCategories}
            setSelectCategoryByName = {setSelectCategoryByName}
            totalExpenseCount = {totalExpenseCount}
            chartData={chartData}
            />
          )
          }
      </View>
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

export default ExpenseTracker;
