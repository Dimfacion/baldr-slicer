import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

var slice = function(file) {
    let formData = new FormData();
    formData.append('upload_file',file.item(0))
    formData.append('id',123)

    return fetch( 'http://localhost:3000/upload',
        {
            method: 'POST',
            headers: {
                'Content-Encoding': 'gzip'
            },
            body: formData // This is your file object
        }
        ).then(response=>{
            return response;
        })
        .catch(response=>{
            console.log(response);
        });
}

export default {
  slice: slice,
}