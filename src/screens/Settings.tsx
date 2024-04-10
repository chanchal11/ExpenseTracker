// SettingsPage.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { clearData, clearDataExceptCurrentMonth } from '../store/expenseThunks';
import { Medium } from '../types';

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [showDialog, setShowDialog] = useState(0);
  
  const handleClearExceptCurrentMonth = () => {
    dispatch(clearDataExceptCurrentMonth());
  }

  const handleClearAllData = () => {
    dispatch(clearData());
  }

  return (
    <PaperProvider>
    <View style={styles.container}>
        <Portal>
          <Dialog visible={showDialog === 1} onDismiss={() => setShowDialog(0)}>
          <Dialog.Title>Clear All Data Except Current Month</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to clear all data except for the current month?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(0)}>No</Button>
            <Button onPress={() => {
              setShowDialog(0);
              handleClearExceptCurrentMonth();
            }}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
        <Dialog visible={showDialog === 2} onDismiss={() => setShowDialog(0)}>
          <Dialog.Title>Clear All Data</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to clear all data?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDialog(0)}>No</Button>
            <Button onPress={() => {
              setShowDialog(0);
              handleClearAllData();
            }}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <View>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Clear All Data Except Current Month</Title>
            <Paragraph>This will delete all expense data except for the current month.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => setShowDialog(1)}>Clear Data</Button>
          </Card.Actions>
        </Card>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Clear All Data</Title>
            <Paragraph>This will delete all expense data.</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => setShowDialog(2)}>Clear Data</Button>
          </Card.Actions>
        </Card>    
      </View>
    </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
});

export default SettingsPage;


