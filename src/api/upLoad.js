import Promise from 'bluebird';

import Config from '../config/env';
import axios from 'axios';
export const upLoad = (e) => {
    var files = e.target.files;
      if (files && files[0]) {
        var f = new FormData();
        f.append("image", files[0]);
        var app = this;
        axios
          .post(Config.api.host.base + "/uploads"  , f, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(function(res) {
            console.log(res);
          })
          .catch(function(res) {
            console.log(res);
          });
      }
}