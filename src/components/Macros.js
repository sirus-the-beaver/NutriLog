import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const Macros = ({ route }) => {
    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;
    const macros = route.params.macros;

    const validCarbs = isNaN(macros.carbs) ? 0 : macros.carbs;
    const validProtein = isNaN(macros.protein) ? 0 : macros.protein;
    const validFat = isNaN(macros.fat) ? 0 : macros.fat;

    const totalMacros = validCarbs + validProtein + validFat;

    const pieChartData = [
        { name: 'Carbs', value: validCarbs, color: 'blue', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Protein', value: validProtein, color: 'green', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Fat', value: validFat, color: 'red', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        barPercentage: 0.5,
      };

    return (
        <StyledView className='flex-1 justify-center items-center bg-white p-4'>
            <StyledText className='text-xl font-bold'>Macros</StyledText>
            <PieChart
                data={pieChartData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={"value"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[10, 0]}
                absolute
            />
            <StyledView className='mt-4'>
                {pieChartData.map(macro => (
                    <StyledView key={macro.name} className='mb-2'>
                        <StyledText className='text-base'>
                            {macro.name}: {macro.value}g ({((macro.value / totalMacros) * 100).toFixed(2)}%)
                        </StyledText>
                    </StyledView>
                ))}
            </StyledView>
        </StyledView>
    );
};

export default Macros;