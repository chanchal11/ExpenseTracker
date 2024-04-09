import { useState } from "react";
import { useSelector } from "react-redux";
import DateRangePicker from "../components/DateRangePicker";
import { ScrollView, View } from "react-native";
import ExpensePieChart from "../components/ExpensePieChart";
import { ExpenseWithId } from "../types";
import { useDefaultMonthDates } from "../hooks/useDefaultMonthDates";
import { PaperProvider } from "react-native-paper";
import ExpenseCalendarHeatmap from "../components/ExpenseCalendarHeatmap";

export const ChartsScreen = () => {
  const expenses = useSelector((state: any) => state.expenses.expenses);
  const [defaultStartDate, defaultEndDate] = useDefaultMonthDates();
  const [startDate, setStartDate] = useState<Date | null>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date | null>(defaultEndDate);

  return (
    <PaperProvider>
      <View>
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
            <ExpensePieChart expenses={expenses.filter((expense: ExpenseWithId) => new Date(expense.date) >= startDate && new Date(expense.date) <= endDate)} />
            <ExpenseCalendarHeatmap expenses={expenses.filter((expense: ExpenseWithId) => new Date(expense.date) >= startDate && new Date(expense.date) <= endDate)} startDate={startDate} endDate={endDate} />
          </>
        )}

      </View>
    </PaperProvider>
  );
};
