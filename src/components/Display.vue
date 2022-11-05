<template>
    <v-app id="app">
      <v-content>
        <v-container fluid fill-height>
            <v-h1>Display</v-h1>
        </v-container>

      </v-content>
    </v-app>
  </template>

<script>
import { reactive, onMounted } from 'vue'
import router from '../router'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { db } from '../main'
import { collection, addDoc, where, query, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore'
import { getStorage, uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage'

export default {
  name: 'Display',

  setup () {
    const data = reactive({
    })

    return {
      data
    }
  }

}
</script>
