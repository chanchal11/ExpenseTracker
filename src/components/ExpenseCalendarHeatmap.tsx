// ExpenseLineChart.tsx
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Expense } from '../types';

interface ExpenseLineChartProps {
  expenses: Expense[];
  startDate: Date;
  endDate: Date;
}

const ExpenseLineChart: React.FC<ExpenseLineChartProps> = ({ expenses, startDate, endDate }) => {
  // Function to generate data for the line chart
  const generateLineChartData = () => {
    const data: { x: string; y: number }[] = [];

    // Loop through each day within the date range
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dailyExpense = expenses.filter(expense => {
        return new Date(expense.date).toDateString() === currentDate.toDateString();
      });
      const totalDailyExpense = dailyExpense.reduce((total, expense) => total + expense.amount, 0);
      data.push({ x: currentDate.toISOString().split('T')[0], y: totalDailyExpense });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return data;
  };

  // Generate data for the line chart
  const lineChartData = generateLineChartData();

  return (
    <View style={styles.container}>
      <LineChart
        verticalLabelRotation={10}
        data={{
          labels: lineChartData.map((item, index) => ''),
          datasets: [{ data: lineChartData.map(item => item.y) }]
        }}
        width={Dimensions.get('window').width - 40}
        height={200}
        yAxisSuffix="₹"
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '3',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={styles.chart}
      />
      <View style={styles.legendContainer}>
        <Text style={styles.legendText}>Expenses per day from {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legendContainer: {
    alignItems: 'center',
  },
  legendText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ExpenseLineChart;
