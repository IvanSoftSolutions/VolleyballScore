import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, Text, TextInput, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {

  const [localTeam, setLocalTeam] = useState('Local');
  const [awayTeam, setAwayTeam] = useState('Visitante');
  const [localScore, setLocalScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [localDisabled, setLocalDisabled] = useState(true);
  const [awayDisabled, setAwayDisabled] = useState(true);

  async function changeScreenOrientation(){
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  }
  changeScreenOrientation();
  
  function handleLocalScoreChangeUp() {
    newScore = localScore + 1
    setLocalScore(newScore)
    setLocalDisabled(false)
  }

  function handleLocalScoreChangeDown() {
    newScore = localScore - 1
    setLocalScore(newScore)
    if (newScore < 1){
      setLocalDisabled(true)
    }
  }

  function handleAwayScoreChangeUp() {
    newScore = awayScore + 1
    setAwayScore(newScore)
    setAwayDisabled(false)
  }

  function handleAwayScoreChangeDown() {
    newScore = awayScore - 1
    setAwayScore(newScore)
    if (newScore < 1){
      setAwayDisabled(true)
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button title='+' onPress={handleLocalScoreChangeUp}/>
        <Button title='-' onPress={handleLocalScoreChangeDown} disabled={localDisabled}/>
      </View>
      <View style={styles.teamsContainer}>
        <TextInput
          onChangeText={setLocalTeam}
          value={localTeam}
          style={styles.teamText}
        />
        <Text>{localScore}</Text>
      </View>
      <View style={styles.teamsContainer}>
        <TextInput
          onChangeText={setAwayTeam}
          value={awayTeam}
          style={styles.teamText}
        />
        <Text>{awayScore}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button title='+' onPress={handleAwayScoreChangeUp}/>
        <Button title='-' onPress={handleAwayScoreChangeDown} disabled={awayDisabled}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  teamsContainer: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 125
  },
  buttonsContainer: {
    width: '20%'
  },
  teamText: {
    marginBottom: 100
  }
});
