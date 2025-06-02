import { Text, View, Pressable, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import Entypo from '@expo/vector-icons/Entypo';

import { audioFiles } from "@/data/audioFiles"

export default function Index() {
  const [audioFile, setAudioFile] = useState();
  const [audioFiles, setAudioFiles] = useState<any[]>([]);



  const addAudioFile = () => {
    const newId = audioFiles.length > 0 ? audioFiles[0].id + 1 : 1;
    setAudioFiles([{ id: newId, audioName: "NEWTESTAUDIO" }, ...audioFiles])
  }

  const removeAudioFile = (id: number) => {
    setAudioFiles(audioFiles.filter(audioFile => audioFile.id !== id))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.newRecordingContainer}>
        <Text style={styles.newRecordingText}>START NEW RECORDING</Text>
        <Pressable onPress={addAudioFile}>
          <Entypo name="controller-record" size={24} color="red" />
        </Pressable>
      </View>
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
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    fontSize: 14,
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

