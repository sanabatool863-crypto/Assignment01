// SkillSwap MVP - Internet Technology Version with Gradient Background
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

// ---------- Login Screen ----------
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dummyLogin = () => {
    if (!email || !password) {
      return Alert.alert('Enter email & password');
    }
    navigation.replace('Home', { userEmail: email });
  };

  return (
    <LinearGradient colors={['#dbeafe', '#f0f4f8']} style={styles.container}>
      <Text style={styles.title}>SkillSwap</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={dummyLogin} />
    </LinearGradient>
  );
}

// ---------- Home Screen ----------
function HomeScreen({ navigation }) {
  const [offers, setOffers] = useState([
    { id: '1', title: 'Web Development Basics', user: 'Ali', desc: 'Learn HTML, CSS, and JavaScript.' },
    { id: '2', title: 'Cybersecurity 101', user: 'Fatima', desc: 'Protect yourself online with security fundamentals.' },
    { id: '3', title: 'Cloud Computing Intro', user: 'Ahmed', desc: 'Understand AWS and Azure basics.' },
    { id: '4', title: 'Database Management', user: 'Sara', desc: 'SQL and NoSQL essentials for beginners.' },
    { id: '5', title: 'Artificial Intelligence', user: 'Hassan', desc: 'Intro to AI and Machine Learning concepts.' },
  ]);

  return (
    <LinearGradient colors={['#e0f2fe', '#f0f4f8']} style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, padding: 12 }}>
        <Text style={{ fontSize: 22, color: '#4B0082' }}>Home Feed</Text>
        <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      </View>

      <FlatList
        data={offers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => alert(`${item.title}\nTutor: ${item.user}\n\n${item.desc}`)}
          >
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#4B0082' }}>{item.title}</Text>
            <Text style={{ color: '#555' }}>Tutor: {item.user}</Text>
            <Text numberOfLines={2}>{item.desc}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate('CreatePost', {
            onCreate: (newOffer) => setOffers([newOffer, ...offers]),
          })
        }
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Post Skill</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

// ---------- Create Post Screen ----------
function CreatePostScreen({ navigation, route }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const submit = () => {
    if (!title || !desc) return Alert.alert('Please add title & description');
    const newOffer = {
      id: Date.now().toString(),
      title,
      user: 'You',
      desc,
    };
    console.log('New Offer:', newOffer);
    if (route.params?.onCreate) route.params.onCreate(newOffer);
    navigation.goBack();
  };

  return (
    <LinearGradient colors={['#f0f9ff', '#f0f4f8']} style={styles.container}>
      <TextInput
        placeholder="Title (e.g. Cloud Security Basics)"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Description"
        style={[styles.input, { height: 100 }]}
        value={desc}
        onChangeText={setDesc}
        multiline
      />
      <Button title="Post" onPress={submit} />
    </LinearGradient>
  );
}

// ---------- Profile Screen ----------
function ProfileScreen() {
  const user = {
    name: 'Sana Batool',
    skills: [
      'Web Development (HTML, CSS, JS)',
      'Cybersecurity Basics',
      'Cloud Computing (AWS, Azure)',
      'Database Management (SQL, NoSQL)',
      'Artificial Intelligence (AI/ML)',
    ],
    bio: 'A tech enthusiast passionate about Internet technologies and knowledge sharing.',
    avgRating: 4.9,
  };

  return (
    <LinearGradient colors={['#eef2ff', '#f0f4f8']} style={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
      <Text style={{ marginTop: 12, fontWeight: '600' }}>Skills</Text>
      {user.skills.map((s) => (
        <Text key={s}>• {s}</Text>
      ))}
      <Text style={{ marginTop: 12 }}>Average Rating: {user.avgRating}</Text>
    </LinearGradient>
  );
}

// ---------- Navigation ----------
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 32, textAlign: 'center', marginBottom: 20, color: '#4B0082' }, // purple
  input: { borderWidth: 1, borderRadius: 6, padding: 10, marginBottom: 12, borderColor: '#1E90FF', backgroundColor: 'white' },
  card: { padding: 12, borderWidth: 1, borderRadius: 8, borderColor: '#1E90FF', marginBottom: 10, backgroundColor: 'white' },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    backgroundColor: '#28a745', // green button
    padding: 14,
    borderRadius: 30,
  },
  name: { fontSize: 24, fontWeight: '700', color: '#4B0082' }, // purple
  bio: { color: '#444', marginTop: 6 },
});
