import loadFont from 'load-bmfont';

function load(options) {
  return new Promise(function (resolve, reject) {
    loadFont(options.font, function (err, font) {
      if (err) {
        reject(err);
      } else {
        const loader = new THREE.TextureLoader();
        loader.load(
          options.image,
          function (texture) {
            resolve({font, texture});
          },
          undefined,
          function (err) {
            reject(err);
          }
        );
      }
    });
  });
}

export {
  load
}
