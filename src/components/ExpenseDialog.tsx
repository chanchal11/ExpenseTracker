// ExpenseDialog.tsx
import React from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';
import ExpenseForm from './ExpenseForm';

interface ExpenseDialogProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (expense: { description: string; amount: number; medium: string }) => void;
}

const ExpenseDialog: React.FC<any> = ({ visible, onClose, onSubmit }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose}>
        <Dialog.Title>Add Expense</Dialog.Title>
        <Dialog.Content>
          <ExpenseForm onSubmit={onSubmit} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button mode="contained" onPress={onClose} >Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ExpenseDialog;