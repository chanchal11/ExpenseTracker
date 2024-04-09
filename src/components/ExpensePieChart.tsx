// ExpensePieChart.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Expense } from '../types';
import { Text } from 'react-native-paper';

interface ExpensePieChartProps {
  expenses: Expense[];
}

const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ expenses }) => {
  // Function to calculate total expenses for each medium
  const calculateTotalExpensesByMedium = () => {
    const totals: { [medium: string]: number } = {};

    expenses.forEach((expense) => {
      if (totals[expense.medium]) {
        totals[expense.medium] += expense.amount;
      } else {
        totals[expense.medium] = expense.amount;
      }
    });

    return totals;
  };

  // Get total expenses by medium
  const totalsByMedium = calculateTotalExpensesByMedium();

  // Convert totals to chart data format
  const chartData = Object.keys(totalsByMedium).map((medium) => ({
    name: "₹ "+medium,
    amount: totalsByMedium[medium],
    color: getRandomColor(), // Function to generate random colors
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  return (
    <View style={styles.container}>
      <PieChart
        data={chartData}
        width={350}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#1E2923',
          backgroundGradientTo: '#08130D',
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute 
      />
      <Text style={{textAlign: 'center', color: '#7F7F7F', paddingTop: 20, fontWeight: 'bold' }} >Total: ₹ {Object.values(totalsByMedium).reduce((acc, cv) => acc + cv, 0)}</Text>
    </View>
  );
};

// Function to generate random color
const usedColors = new Set();
const getRandomColor = () => {
  let color;
  do {
    color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  } while (usedColors.has(color) || color === '#FFFFFF');
  usedColors.add(color);
  return color;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
});

export default ExpensePieChart;
