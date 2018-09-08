const axios = require('axios');

setInterval(() => {
    wakeSite();
}, 1800000)

function wakeSite(){
    axios.get('https://next-tech-woc.herokuapp.com/api')
      .then(function (response) {
        // handle success;
      })
      .catch(function (error) {
        // handle error
      })
      .then(function () {
        // always executed
        console.log("Woke");
      });
}