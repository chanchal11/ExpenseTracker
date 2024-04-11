import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DateRangePicker from "../components/DateRangePicker";
import { ScrollView, View } from "react-native";
import ExpensePieChart from "../components/ExpensePieChart";
import { ExpenseWithId } from "../types";
import { useDefaultMonthDates } from "../hooks/useDefaultMonthDates";
import { PaperProvider, Text } from "react-native-paper";
import ExpenseCalendarHeatmap from "../components/ExpenseCalendarHeatmap";

export const ChartsScreen = () => {
  const expenses: ExpenseWithId[] = useSelector((state: any) => state.expenses.expenses);
  const [defaultStartDate, defaultEndDate] = useDefaultMonthDates();
  const [startDate, setStartDate] = useState<Date>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date>(defaultEndDate);
  const [ filteredExpenses, setFilteredExpenses ] = useState<ExpenseWithId[]>([]);
  
  useEffect(() => {
    setFilteredExpenses(expenses.filter((expense: ExpenseWithId) => new Date(expense.date) >= startDate && new Date(expense.date) <= endDate));
  }, [ expenses, startDate, endDate  ] )

  return (
    <PaperProvider>
     { expenses.length > 0 &&  <View>
        <DateRangePicker
          defaultStartDate={defaultStartDate}
          defaultEndDate={defaultEndDate}
          onDateRangeSelected={(startDate, endDate) => {
            setStartDate(startDate);
            setEndDate(endDate);
          }} 
        />
        {startDate && endDate && (
          <>
            <ExpensePieChart expenses={filteredExpenses} />
            <ExpenseCalendarHeatmap expenses={filteredExpenses} startDate={startDate} endDate={endDate} />
          </>
        )}

      </View>}
      {!expenses.length && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} ><Text style={{ textAlign: 'center', fontSize: 20 }} >No expenses found</Text></View>}
    </PaperProvider>
  );
};
