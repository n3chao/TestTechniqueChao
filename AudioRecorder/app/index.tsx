import { Text, View, Pressable, StyleSheet, FlatList, ListRenderItem, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Audio } from 'expo-av';

import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { audioFiles } from "@/data/audioFiles"

//Define types
interface RecordingItem {
  id: number;
  title: string;
  date: string;
  time: string;
  sound: Audio.Sound | null;
  duration: string;
  file: string;
}

export default function Index() {
  const [recording, setRecording] = useState<Audio.Recording | undefined>(undefined);
  //const [recordings, setRecordings] = useState<any[]>([]);
  const [recordingList, setRecordingList] = useState<RecordingItem[]>(audioFiles.sort((a, b) => b.id - a.id));
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });

        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
      }
    } catch (err) { }

  }

  async function stopRecording() {
    if (recording) {
      await recording.stopAndUnloadAsync();
      //let allRecordings = [...recordingList];
      const { sound, status } = await recording.createNewLoadedSoundAsync();

      const newRecording: RecordingItem = {
        id: Date.now(),
        title: `Recording ${Date.now()}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI() || "",
      }
      setRecordingList(prevList => [newRecording, ...prevList]);
      setRecording(undefined);
    }
  }

  async function getDurationFormatted(milliseconds: number) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`

  }
  function getRecordingLines() {
    return recordingList.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.recordingListed}>
          <Text style={styles.fill}>
            Recording at {recordingLine.date} {recordingLine.time}
          </Text>
          <Text> {recordingLine.duration} </Text>
          <Pressable onPress={() => recordingLine.sound?.replayAsync()}>
            <FontAwesome name="play" size={24} color="black" />
          </Pressable>
          <Pressable onPress={() => recordingLine.sound?.pauseAsync()}>
            F<FontAwesome name="pause" size={24} color="black" />
          </Pressable>
        </View>
      );
    });

  }
  async function clearRecordings() {
    setRecordingList([])
  }

  const playRecording = () => {

  }

  const pauseRecording = () => {

  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}>
        <Button title={recording ? 'Stop Recording' : 'Start Recording\n\n\n'} onPress={recording ? stopRecording : startRecording} />
        {getRecordingLines()}
        <Button title={recordingList.length > 0 ? '\n\n\nClear Recordings' : ''} onPress={clearRecordings} />
      </View> */}

      <View style={styles.container}>
        <Text style={styles.newRecordingText}>START NEW RECORDING</Text>
        <Pressable>
          <Entypo name={recording ? "controller-stop" : "controller-record"} size={40} color="red"
            onPress={recording ? stopRecording : startRecording} />
        </Pressable>
        {getRecordingLines()}
        {recordingList.length > 0 && (
          <Button title={recordingList.length > 0 ? '\n\n\nClear Recordings' : ''} onPress={clearRecordings} />
          )}
        <Pressable>

        </Pressable>
      </View>
      {/* <FlatList
        data={audioFiles}
        renderItem={renderItem}
        keyExtractor={audioFile => audioFile.id.toString()}
        contentContainerStyle={{ flexGrow: 1 }}
      /> */}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center', //temp
    justifyContent: 'center', //temp
  },
  newRecordingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto',
  },
  newRecordingText: {
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
    fontSize: 20,
    minWidth: 0,
    color: 'black'
  },
  // startNewRecordingButton: {
  //   backgroundColor: 'red',
  //   borderRadius: 5,
  //   padding: 10,
  // },
  // startNewRecordingText: {
  //   fontSize: 14,
  //   color: 'black'
  // },
  // stopNewRecordingButton: {
  //   backgroundColor: 'red',
  //   borderRadius: 5,
  //   padding: 10,
  // },
  // stopNewRecordingText: {
  //   fontSize: 14,
  //   color: 'black'
  // },
  recordingListed: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    pointerEvents: 'auto',
  },
  recordingListedText: {
    flex: 1,
    fontSize: 14,
    color: 'black',
  },
  fill: {
    flex: 1,
    margin: 15,
  }
})

