import { Text, View, Pressable, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { audioFiles } from "@/data/audioFiles"

export default function Index() {
  const [recording, setRecording] = useState();
  //const [recordings, setRecordings] = useState<any[]>([]);
  const [recordings, setRecordings] = useState<any[]>(audioFiles.sort((a, b) => b.id - a.id));



  const addRecording = () => {
    const newId = audioFiles.length > 0 ? audioFiles[0].id + 1 : 1;
    setRecordings([{ id: newId, title: "NEWTESTAUDIO" }, ...audioFiles])
  }

  const removeRecording = (id: number) => {
    setRecordings(audioFiles.filter(audioFile => audioFile.id !== id))
  }

  const playRecording = () => {

  }

    const pauseRecording = () => {
    
  }

  const renderItem = ({ item }) => (
    <View style={styles.recordingListed}>
      <Text 
      style={[styles.recordingListedText]}>
        {item.title}
      </Text>
      <Pressable onPress={() => playRecording(item.id)}>
        <Entypo name="controller-play" size={28} color="black" />
      </Pressable>
      <Pressable onPress={() => pauseRecording(item.id)}>
        <FontAwesome name="pause" size={20} color="black" />
      </Pressable>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.newRecordingContainer}>
        <Text style={styles.newRecordingText}>START NEW RECORDING</Text>
        <Pressable onPress={addRecording}>
          <Entypo name="controller-record" size={40} color="red" />
        </Pressable>
      </View>
      <FlatList
        data={audioFiles}
        renderItem={renderItem}
        keyExtractor={audioFile => audioFile.id.toString()}
        contentContainerStyle={{flexGrow: 1 }}
        />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
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
    flex: 1,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
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
})

