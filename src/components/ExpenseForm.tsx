// ExpenseForm.tsx
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { TextInput as PaperInput } from 'react-native-paper';

interface ExpenseFormProps {
  onSubmit: (expense: { description: string; amount: number; medium: string }) => void;
}

const ExpenseForm: React.FC<any> = ({ onSubmit }: any) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [medium, setMedium] = useState('');

  const handleSubmit = () => {
    onSubmit({ description, amount: parseFloat(amount), medium });
    setDescription('');
    setAmount('');
    setMedium('');
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
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default ExpenseForm;
