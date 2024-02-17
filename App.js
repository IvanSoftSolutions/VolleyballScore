import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Pressable, Text, TextInput, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faVolleyball } from '@fortawesome/free-solid-svg-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {

  const [localTeam, setLocalTeam] = useState('Local');
  const [awayTeam, setAwayTeam] = useState('Visitante');
  const [localScore, setLocalScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [localDownDisabled, setLocalDownDisabled] = useState(true);
  const [awayDownDisabled, setAwayDownDisabled] = useState(true);
  const [localIconDisabled, setLocalIconDisabled] = useState(true);
  const [awayIconDisabled, setAwayIconDisabled] = useState(true);
  const [gameCount, setGameCount] = useState(1);
  const [gameUpDisabled, setGameUpDisabled] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);

  async function changeScreenOrientation(){
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
  }

  changeScreenOrientation();
  
  function disableLocalIcon() {
    if (localIconDisabled) {
      return
    } else {
      return (
        <FontAwesomeIcon icon={faVolleyball} size={30} style={{color: "#FF3D3D", position:'absolute', top: 70 }} />
      )
    }
  }

  function disableAwayIcon() {
    if (awayIconDisabled) {
      return
    } else {
      return (
        <FontAwesomeIcon icon={faVolleyball} size={30} style={{color: "#FF3D3D", position:'absolute', top: 70 }} />
      )
    }
  }

  function handleLocalScoreChangeUp() {
    let newScore = localScore + 1
    setLocalScore(newScore)
    setLocalDownDisabled(false)
    setLocalIconDisabled(false)
    setAwayIconDisabled(true)
  }

  function handleLocalScoreChangeDown() {
    let newScore = localScore - 1
    setLocalScore(newScore)
    if (newScore < 1){
      setLocalDownDisabled(true)
    }
  }

  function handleAwayScoreChangeUp() {
    let newScore = awayScore + 1
    setAwayScore(newScore)
    setAwayDownDisabled(false)
    setLocalIconDisabled(true)
    setAwayIconDisabled(false)
  }

  function handleAwayScoreChangeDown() {
    let newScore = awayScore - 1
    setAwayScore(newScore)
    if (newScore < 1){
      setAwayDownDisabled(true)
    }
  }
  
  function handleGameCountChangeUp() {
    let newCount = gameCount + 1
    setGameCount(newCount)
    if (newCount > 4){
      setGameUpDisabled(true)
    } else {
      setGameUpDisabled(false)
    }
  }

  function handleSetChange() {
    let setInfo = {
      localTeam: localTeam,
      awayTeam: awayTeam,
      localScore: localScore,
      awayScore: awayScore,
      set: gameCount
    }
    setGameHistory(gameHistory => [...gameHistory, setInfo])
    let auxName = localTeam
    setLocalTeam(awayTeam)
    setAwayTeam(auxName)
    setLocalScore(0)
    setAwayScore(0)
    setLocalIconDisabled(true)
    setAwayIconDisabled(true)
  }

  function renderGameHistory() {
    return (
        gameHistory.map(function (d, idx){
          return (
            <View key={idx} style={styles.gameHistory}>
              <View>
                <Text style={styles.gameHistoryText}>{d.localTeam}</Text>
                <Text style={styles.gameHistoryText}>{d.localScore}</Text>
              </View>
              <Text style={[styles.gameHistoryText, styles.gameHistorySetText]}>{d.set}</Text>
              <View>
                <Text style={styles.gameHistoryText}>{d.awayTeam}</Text>
                <Text style={styles.gameHistoryText}>{d.awayScore}</Text>
              </View>
            </View>
            )
        })
    )
  }

  return (
    <View style={styles.globalContainer}>
      <View style={styles.scoreContainer}>
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.buttonLeft} onPress={handleLocalScoreChangeUp} >
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
          <Pressable style={styles.buttonLeft} onPress={handleLocalScoreChangeDown} disabled={localDownDisabled}>
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
        </View>
        <View style={styles.teamsContainer}>
          <View>
            <TextInput
              onChangeText={setLocalTeam}
              value={localTeam}
              style={styles.teamText}
            />
          </View>
          {disableLocalIcon()}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{localScore}</Text>
          </View>
        </View>
        <View style={styles.gameContainer}>
          <Text style={styles.setText}>Set</Text>
          <Pressable style={styles.buttonCenter} disabled={gameUpDisabled} onPress={() => {
            handleGameCountChangeUp();
            handleSetChange();
            }}>
            <Text style={styles.gameButtonText}>+</Text>
          </Pressable>
          <Text style={styles.gameText}>{gameCount}</Text>
        </View>
        <View style={styles.teamsContainer}>
          <View>
            <TextInput
              onChangeText={setAwayTeam}
              value={awayTeam}
              style={styles.teamText}
            />
          </View>
          {disableAwayIcon()}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{awayScore}</Text>
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.buttonRight} onPress={handleAwayScoreChangeUp} >
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
          <Pressable style={styles.buttonRight} onPress={handleAwayScoreChangeDown} disabled={awayDownDisabled}>
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
      </View>
      <View style={styles.gameHistoryContainer}>
        {renderGameHistory()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  scoreContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  gameHistoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonsContainer: {
    width: '20%',
    marginTop: 40,
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
    backgroundColor: 'white',
  },
    buttonRight: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 10,
    marginRight: 90,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    color: 'black',
  },
  teamsContainer: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 50,
    marginLeft: -50,
    marginRight: -50
  },
  teamText: {
    fontSize: 60,
    color: 'white'
  },
  scoreText: {
    fontSize: 150,
    color: 'white',
  },
  gameContainer: {
    alignItems:'center',
    justifyContent: 'center',
  },
  buttonCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    margin: 2,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white'
  },
  gameButtonText: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  setText: {
    marginBottom: 5,
    fontSize: 25,
    color: 'white',
  },
  gameText: {
    fontSize: 60,
    color: 'white',
  },
  gameHistory: {
    flexDirection: 'row',
    position: 'relative',
    bottom: 30,
  },
  gameHistoryText: {
    textAlign: 'center',
    margin: 5,
    fontSize: 20,
    color: 'white'
  },
  gameHistorySetText: {
    marginTop: 45,
  }
});
