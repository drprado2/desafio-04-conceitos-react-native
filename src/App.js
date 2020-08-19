import React, {useState, useEffect} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(r => setRepositories(r.data));
  }, []);

  async function handleLikeRepository(id) {
    console.log(id);
    const result = await api.post(`repositories/${id}/like`);
    setRepositories(repositories.filter(x => x.id !== id).concat([result.data]));
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
      <SafeAreaView style={styles.container}>
        <View style={styles.repositoryContainer}>
          {repositories.map(r => (
            <View key={r.id}>
            <Text style={styles.repository}>{r.title}</Text>
            <View style={styles.techsContainer}>
              {r.techs.map(t => (
                <Text key={t} style={styles.tech}>
                  {t}
                </Text>
              ))}
            </View>

            <View style={styles.likesContainer}>
            <Text
            style={styles.likeText}
            testID={`repository-likes-${r.id}`}
            >
            {r.likes} curtidas
            </Text>
            </View>

            <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(r.id)}
            testID={`like-button-${r.id}`}
            >
            <Text style={styles.buttonText}>Curtir</Text>
            </TouchableOpacity>
            </View>
            ))}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
