import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import GoalInput from "./components/GoalInput";
import GoalItem from './components/GoalItem';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((prev) => [...prev, {text: enteredGoalText, id: Math.random().toString()},]);

  }
  function deleteGoalHandler (id) {
    setCourseGoals((prev) => {
      return prev.filter((goal) => goal.id !== id);
    });
  }
  return (
    <View style={styles.appContainer}>
       <GoalInput onAddGoal={addGoalHandler} />
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
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  
  goalContainer: {
    flex: 5,
  }




  
});
