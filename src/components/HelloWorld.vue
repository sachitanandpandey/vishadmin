<template>
  <v-app id="app">
    <v-content>
      <v-container fluid fill-height>
        <v-card max-width="100%" height="100%" class="d-flex justify-space-around mb-6">
          <v-container>
            <v-row dense>
              <v-col cols="20">
                <v-card color="#385F73" theme="dark" height="100%" width="100%">
                  <form @submit.prevent="submit">
                    <v-row>
                      <v-col>
                        <!-- <input v-model="data.title" label='title' class="form-control" placeholder="Title" required
                          id="ip1">
                        <input v-model="data.desc" label='desc' class="form-control" placeholder="Description" required
                          id="ip2">
                        <input v-model="data.duration" label='duration' class="form-control" placeholder="Duration" required
                          id="ip2">
                          <v-col class="d-flex" cols="12" sm="12">
                            <v-select v-model="data.status" :items="StatusOptions" label="Status" solo></v-select>
                          </v-col> -->
                        <!-- <input v-model="data.status" label='status' class="form-control" placeholder="Status" required
                          id="ip1"> -->
                          <v-img :src=data.previewimg class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                              height="300px" width="200px">
                          </v-img>
                        <v-h5>defaultProfile</v-h5>
                        <v-file-input label="File input" v-model="data.defaultProfile" type='File' class="form-control"
                          required id="ip2" @change="onFileChange(data.defaultProfile)"></v-file-input>
                          <!-- <v-h5>fullposter</v-h5>
                        <v-file-input label="File input" v-model="data.fullposter" type='File' class="form-control"
                          required id="ip2"></v-file-input>
                          <v-h5>Audition</v-h5>
                        <v-file-input label="File input" v-model="data.audition" type='File' class="form-control"
                          required id="ip2"></v-file-input>
                        <input v-model="data.link" label='link' class="form-control" placeholder="iframe link"
                          id="ip3"> -->
                        <!-- <input v-model="data.listposter" type='File' label='ListPoster' class="form-control" required id="ip2"> -->
                        <!-- <v-file-input accept="image/*" label="File input"></v-file-input> -->

                      </v-col>
                    </v-row>
                    <v-btn rounded color="primary" dark type="submit">
                      upload
                    </v-btn>
                  </form>

                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>

    </v-content>
    <template>
      <v-container>
        <v-row>
          <h4 class="text-h5 white--text">Projected</h4>
        </v-row>
        <v-row>
          <div v-for="item in data.doclist" v-bind:key="item.id" class="pa-md-2">
            <v-card max-width="200" height="300">
              <v-img :src=item.defaultprofile class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="300px" width="200px">
                <v-card-actions>
                  <v-btn rounded color="primary" dark @click="pupdate(item)">
                    Edit
                  </v-btn>
                  <v-btn rounded color="red" dark @click="pdelete(item)">
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-img>
            </v-card>
          </div>
        </v-row>
      </v-container>
    </template>
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
  name: 'Home',

  setup () {
    const data = reactive({
    })

    // const doclist = ref('')
    onMounted(async () => {
      const qDoclist = query(collection(db, 'casting'), where('casting', '==', 'Open'))
      const querySnapshot = await getDocs(qDoclist)
      data.doclist = querySnapshot.docs.map(doc => doc.data())
      console.log(data.doclist)
    })

    return {
      data
    }
  }

}
</script>

<style>

#app {
  background: url('../assets/V2.png') no-repeat center center fixed !important;
  background-size: cover;
}
</style>
