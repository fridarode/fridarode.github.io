        function SoundCloud() {
          this.sound = sound;

          var stream;
          var songs = [];
          var play = document.getElementById('play');
          var pause = document.getElementById('pause');
          var stop = document.getElementById('stop')
          SC.initialize({
              client_id: 'f665fc458615b821cdf1a26b6d1657f6',
            });

          play.addEventListener('click', playStream);
          pause.addEventListener('click', pauseStream);
          stop.addEventListener('click', stopStream);

           $('#search-btn').click(() => {
             const output = $('#search-input').val();
             $('.track').text(output);
             console.log(output);


           SC.get("/tracks", {
             q: output }).then(function(response) {
               console.log( response );
                songs = response;

                songs.forEach(function(song) {
                  console.log(song);

                  var newSong = `
                  <h2 onclick="frida.sound(${song.id})"><a data-id="${song.id}">${song.title}</a></h2>
                  <img src="${song.artwork_url}" alt=""/>
                  <p>${song.genre}</p>
                  `;
                   $('.after').append(newSong);

             })
            })
          });

         function sound(id) {

           console.log("log song: " + '/tracks/'+ id);
           SC.stream('/tracks/' + id).then( function(player) {
            stream = player;
            stream.play();
            })

          };
          function playStream() {
            stream.pause();
            stream.play();
          }

          function pauseStream() {
            stream.pause();
          };

          function stopStream() {
            stream.pause();
            stream.seek(0);
          }
          //end of function
}


const frida = new SoundCloud();
