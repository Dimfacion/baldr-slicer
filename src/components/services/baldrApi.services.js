import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

var slice = function(file, slicerType) {
  let formData = new FormData();
  formData.append('upload_file', file.item(0))
  formData.append('id', 123)

  return fetch('http://localhost:3000/upload/' + slicerType, {
      method: 'POST',
      headers: {
        'Content-Encoding': 'gzip'
      },
      body: formData // This is your file object
    }).then(response => {
      return response;
    })
    .catch(response => {
      console.log(response);
    });
}

var getPublicProfiles = function() {

  return fetch('http://localhost:3000/public/profiles', {
      method: 'GET',
      headers: {
        'Content-Encoding': 'gzip'
      }
    }).then(response => {
      return response;
    })
    .catch(response => {
      console.log(response);
    });
}

var getConfig = function() {

  return fetch('http://localhost:3000/config', {
      method: 'GET',
      headers: {
        'Content-Encoding': 'gzip'
      }
    }).then(response => {
      return response;
    })
    .catch(response => {
      console.log(response);
    });
}

export default {
  slice: slice,
  getPublicProfiles: getPublicProfiles,
  getConfig: getConfig
}
