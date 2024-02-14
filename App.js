import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, Text, TextInput, View } from 'react-native';
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
        <Pressable style={styles.buttonLeft} onPress={handleLocalScoreChangeUp}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
        <Pressable style={styles.buttonLeft} onPress={handleLocalScoreChangeDown} disabled={localDisabled}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
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
        <Pressable style={styles.button} onPress={handleAwayScoreChangeUp}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleAwayScoreChangeDown} disabled={awayDisabled}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
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
  buttonLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 10,
    marginLeft: 90,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 10,
    marginRight: 90,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color: 'white',
  },
  teamsContainer: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 125,
    marginLeft: -90,
    marginRight: -90
  },
  buttonsContainer: {
    width: '20%',
  },
  teamText: {
    marginBottom: 100
  }
});
