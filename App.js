import { useState } from "react";
import { Button, FlatList, StyleSheet, View } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from './components/GoalItem';
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [ModalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true);
  }
  function endAddGoalHandler() {
    setModalIsVisible(false);
  }
  
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((prev) => [...prev, {text: enteredGoalText, id: Math.random().toString()},]);
    endAddGoalHandler()

  }
  function deleteGoalHandler (id) {
    setCourseGoals((prev) => {
      return prev.filter((goal) => goal.id !== id);
    });
  }
  return (
    <>
    <StatusBar style="light" />
    <View style={styles.appContainer}>
      <Button title="Add New Goal" color="#5e0acc" onPress={startAddGoalHandler}/>
       <GoalInput visible={ModalIsVisible} onAddGoal={addGoalHandler} onCancle={endAddGoalHandler}/>
      <View style={styles.goalContainer}>
      <FlatList
      data={courseGoals} 
      renderItem={(itemData) => {
        return <GoalItem text={itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalHandler} />;
      }}
      keyExtractor={(item, index) => {
        return item.id;
      }}
      alwaysBounceVertical={false}
      />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a",
  },
  
  goalContainer: {
    flex: 5,
  }




  
});
