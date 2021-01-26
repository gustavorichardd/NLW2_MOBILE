import React, {  useState } from 'react'
import { Text, View, TextInput } from 'react-native'
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import api from '../../services/api';

import styles from './styles'

const TeacherList = () => {
  const [ifFiltersVisible, setIsFilterVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');


  function loadFavorites(){
    AsyncStorage.getItem('favorites').then(res => {
      if (res) {
        const favoritedTeachers = JSON.parse(res);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id
        })
        setFavorites(favoritedTeachersIds)
      }
    })
  }

  useFocusEffect(()=> {
    loadFavorites();
  })

  function handleToggleFIltersVisible() {
    setIsFilterVisible(!ifFiltersVisible)
  }

  function handleFiltersSubmit() {
    loadFavorites();
    api.get('/classes', {
      params: {
        subject,
        week_day,
        time
      }
    }).then(teacherList => {
      setTeachers(teacherList.data)
      setIsFilterVisible(!ifFiltersVisible)
    })
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFIltersVisible}>
            <Icon name='filter' size={20} color='#fff' />
          </BorderlessButton>
        )}
      >
        {ifFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput value={subject} onChangeText={setSubject}
              placeholderTextColor='#c1bccc' style={styles.input} placeholder='Qual a matéria?' />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput value={week_day} onChangeText={setWeekDay}
                  placeholderTextColor='#c1bccc' style={styles.input} placeholder='Qual o dia?' />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput value={time} onChangeText={setTime}
                  placeholderTextColor='#c1bccc' style={styles.input} placeholder='Qual horário?' />
              </View>
            </View>

            <RectButton onPress={handleFiltersSubmit}
              style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>

            </RectButton>
          </View>
        )}

      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          )
        })}
      </ScrollView>

    </View>
  )
}

export default TeacherList;