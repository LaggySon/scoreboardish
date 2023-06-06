import { Howl } from "howler";

var Player = function (playlist: any) {
  this.playlist = playlist;
  this.index = 0;
};
Player.prototype = {
  /**
   * Play a song in the playlist.
   * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
   */
  play: function (index: number) {
    var self = this;
    var sound;

    index = typeof index === "number" ? index : self.index;
    var data = self.playlist[index];

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: [
          "./audio/" + data.file + ".webm",
          "./audio/" + data.file + ".mp3",
        ],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).

        onend: function () {
          self.skip("next");
        },
      });
    }

    // Begin playing the sound.
    sound.play();

    // Keep track of the index we are currently playing.
    self.index = index;
  },

  /**
   * Pause the currently playing track.
   */
  pause: function () {
    var self = this;

    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;

    // Puase the sound.
    sound.pause();
  },

  /**
   * Skip to the next or previous track.
   * @param  {String} direction 'next' or 'prev'.
   */
  skip: function (direction: string) {
    var self = this;

    // Get the next track based on the direction of the track.
    var index = 0;
    if (direction === "prev") {
      index = self.index - 1;
      if (index < 0) {
        index = self.playlist.length - 1;
      }
    } else {
      index = self.index + 1;
      if (index >= self.playlist.length) {
        index = 0;
      }
    }

    self.skipTo(index);
  },

  /**
   * Skip to a specific track based on its playlist index.
   * @param  {Number} index Index in the playlist.
   */
  skipTo: function (index: number) {
    var self = this;

    // Stop the current track.
    if (self.playlist[self.index].howl) {
      self.playlist[self.index].howl.stop();
    }

    // Play the new track.
    self.play(index);
  },
};
export default Player;
