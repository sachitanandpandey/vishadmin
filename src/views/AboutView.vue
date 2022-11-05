<!-- <template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template> -->

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
                        <input v-model="data.title" label='title' class="form-control" placeholder="Title" required
                          id="ip1">
                        <input v-model="data.desc" label='desc' class="form-control" placeholder="Description" required
                          id="ip2">
                        <input v-model="data.duration" label='duration' class="form-control" placeholder="Duration" required
                          id="ip2">
                          <v-col class="d-flex" cols="12" sm="12">
                            <v-select v-model="data.status" :items="StatusOptions" label="Status" solo></v-select>
                          </v-col>
                        <!-- <input v-model="data.status" label='status' class="form-control" placeholder="Status" required
                          id="ip1"> -->
                        <v-h5>Listposter</v-h5>
                        <v-file-input label="File input" v-model="data.listposter" type='File' class="form-control"
                          required id="ip2"></v-file-input>
                          <v-h5>fullposter</v-h5>
                        <v-file-input label="File input" v-model="data.fullposter" type='File' class="form-control"
                          required id="ip2"></v-file-input>
                          <v-h5>Audition</v-h5>
                        <v-file-input label="File input" v-model="data.audition" type='File' class="form-control"
                          required id="ip2"></v-file-input>
                        <input v-model="data.link" label='link' class="form-control" placeholder="iframe link"
                          id="ip3">
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
              <v-img :src=item.listposter class="white--text align-end"
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
  name: 'VishConfig',

  setup () {
    const data = reactive({
      submit: '',
      doclist: '',
      title: '',
      desc: '',
      status: '',
      file: '',
      listposter: '',
      fullposter: '',
      duration: '',
      link: '',
      audition: ''
    })

    const StatusOptions = ['Projected', 'Premiering', 'InProgress', 'Completed']

    // const doclist = ref('')
    onMounted(async () => {
      const querySnapshot = await getDocs(collection(db, 'projects'))
      data.doclist = querySnapshot.docs.map(doc => doc.data())
    })

    const submit = async () => {
      const storage = getStorage()

      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: 'image/jpeg'
      }

      const storageReflist = ref(storage, 'project_images/' + data.title + '/' + data.listposter.name)
      const storageReffull = ref(storage, 'project_images/' + data.title + '/' + data.fullposter.name)
      const storageRefaudi = ref(storage, 'project_images/' + data.title + '/' + data.audition.name)
      const uploadlistposter = await uploadBytesResumable(storageReflist, data.listposter, metadata)
      const uploadfullposter = await uploadBytesResumable(storageReffull, data.fullposter, metadata)
      const uploadaudiposter = await uploadBytesResumable(storageRefaudi, data.audition, metadata)

      const listPosterUrl = await getDownloadURL(uploadlistposter.ref)
      console.log(listPosterUrl)

      const fullPosterUrl = await getDownloadURL(uploadfullposter.ref)
      console.log(fullPosterUrl)
      const audiPosterUrl = await getDownloadURL(uploadaudiposter.ref)
      console.log(audiPosterUrl)
      let link = ''
      if (data.link) { link = data.link } else {
        link = ''
      }
      const colRef = collection(db, 'projects')

      setDoc(doc(colRef, data.title), {
        title: data.title,
        desc: data.desc,
        status: data.status,
        listposter: listPosterUrl,
        fullposter: fullPosterUrl,
        duration: data.duration,
        link: link,
        audition: audiPosterUrl

      })
      const querySnapshotProjects = await getDocs(collection(db, 'projects'))
      data.doclist = querySnapshotProjects.docs.map(doc => doc.data())

      data.title = ''
      data.desc = ''
      data.status = ''
      data.listposter = ''
      data.fullposter = ''
      data.duration = ''
      data.link = ''
    }

    const pupdate = async (item) => {
      data.title = item.title
      data.desc = item.desc
      data.status = item.status
      data.listposter = ''
      data.fullposter = ''
      data.duration = item.duration
      data.link = ''
    }

    const pdelete = async (item) => {
      await deleteDoc(doc(db, 'projects', item.title))
      const querySnapshotProjects = await getDocs(collection(db, 'projects'))
      data.doclist = querySnapshotProjects.docs.map(doc => doc.data())
    }

    return {
      data,
      submit,
      pupdate,
      pdelete,
      StatusOptions
    }
  }

}
</script>

<style>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

body {
  background-color: #0066CC;
}

.form-signin {
  padding-top: 25px;
  width: 100%;
  max-width: 930px;
  padding: 255px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="user"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

#ip2 {
  border-radius: 25px;
  border: 2px solid #609;
  padding: 20px;
  width: 400px;
  height: 15px;
}

#ip3 {
  border-radius: 25px;
  border: 2px solid #609;
  padding: 20px;
  width: 100%;
  height: 15px;
}

#ip1 {
  border-radius: 25px;
  border: 2px solid #609;
  padding: 20px;
  width: 400px;
  height: 15px;
}

#arrowlogin {
  background: linear-gradient(-135deg,
      transparent 22px,
      #04e6fb 22px,
      #65ff9a 100%) top right,
    linear-gradient(-45deg,
      transparent 22px,
      #04e6fb 22px,
      #65ff9a 100%) bottom right;
  background-size: 100% 50%;
  background-repeat: no-repeat;
}

#weekdropdown {
  position: relative;
  display: inline-block;
}

#app {
  background: url('../assets/V2.png') no-repeat center center fixed !important;
  background-size: cover;
}
</style>
