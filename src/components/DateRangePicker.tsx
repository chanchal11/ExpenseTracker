// DateRangePicker.tsx
import React, { useEffect, useState } from 'react';
import { Button, Portal, Dialog, useTheme, Text } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import { View } from 'react-native';

interface DateRangePickerProps {
  onDateRangeSelected: (startDate: Date, endDate: Date) => void;
  defaultStartDate: Date;
  defaultEndDate: Date;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateRangeSelected, defaultStartDate, defaultEndDate }) => {
  const theme = useTheme();
  const [startDate, setStartDate] = useState<Date | null>(defaultStartDate);
  const [endDate, setEndDate] = useState<Date | null>(defaultEndDate);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState<string>('');
  const[ buttonTitle, setButtonTitle] = useState<string>('Select Date Range');
  
  useEffect(() => {
    if(startDate && endDate && startDate <= endDate){ 
        setButtonTitle(`${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`);
    }
}, [ startDate, endDate ] );

  const handleConfirm = () => {
    if (startDate && endDate) {
      if(startDate <= endDate){
        onDateRangeSelected(startDate, endDate);
        setVisible(false);
        setError('');
      }else {
        setError('Start date must be before end date');
      }  
    }else {
        setError('Please select start and end dates');
    }
  };
    
  return (
    <View>
      <Button
        mode="contained"
        onPress={() => setVisible(true)}
        style={{ marginBottom: 10 }}
        theme={{ colors: { primary: theme.colors.primary } }}
      >
        {buttonTitle}
      </Button>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Select Date Range</Dialog.Title>
          <Dialog.Content>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
              <DatePicker
                mode="date"
                date={startDate || new Date()}
                onDateChange={setStartDate}
              />
              <DatePicker
                mode="date"
                date={endDate || new Date()}
                onDateChange={setEndDate}
              />
            </View>
            {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleConfirm}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default DateRangePicker;
