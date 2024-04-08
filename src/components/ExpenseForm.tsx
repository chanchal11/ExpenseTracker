// ExpenseForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { TextInput as PaperInput } from 'react-native-paper';

interface ExpenseFormProps {
  onSubmit: (expense: { description: string; amount: number; medium: string }) => void;
}

const ExpenseForm: React.FC<any> = ({ onSubmit }: any) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [medium, setMedium] = useState('');
  const [date, setDate] = useState(new Date());
  const handleSubmit = () => {
    onSubmit({ description, amount: parseFloat(amount), medium, date: date.getTime() });
    setDescription('');
    setAmount('');
    setMedium('');
    setDate(new Date());
  };

  return (
    <View>
      <PaperInput
        label="Description"
        value={description}
        onChangeText={setDescription}
      />
      <PaperInput
        label="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <PaperInput
        label="Medium"
        value={medium}
        onChangeText={setMedium}
      />
      <DatePicker
        date={new Date()}
        onDateChange={setDate}
        mode="date"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default ExpenseForm;
