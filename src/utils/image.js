const NUM_COLS = 4;
const NUM_ROWS = 3;

function loadCubeMap(imageSrc, tileWidth, tileHeight) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const imageUris = cubeMapToUris(image, tileWidth, tileHeight);
      resolve(imageUris);
    };
    image.onerror = () => {
      reject();
    };
    image.src = imageSrc;
  });
}

function cubeMapToUris(image, tileWidth, tileHeight) {
  const imagePieces = [];
  const imageUris = [];

  for (let x = 0; x < NUM_COLS; ++x) {
    for (let y = 0; y < NUM_ROWS; ++y) {
      const tileCanvas = document.createElement('canvas');
      tileCanvas.width = tileWidth;
      tileCanvas.height = tileHeight;

      const tileContext = tileCanvas.getContext('2d');

      tileContext.drawImage(
        image,
        x * tileWidth, y * tileHeight,
        tileWidth, tileHeight,
        0, 0, tileCanvas.width, tileCanvas.height);

      imagePieces.push(tileCanvas.toDataURL());
    }
  }

  // Required sequence of tile view directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];

  for (let i = 0; i < 6; i++) {
    let imagePieceIndex;

    // Select the right tiles for the 6 different faces of the sky box
    if (i === 0) imagePieceIndex = 7;//... xpos
    else if (i === 1) imagePieceIndex = 1;//... xneg
    else if (i === 2) imagePieceIndex = 3;//... ypos
    else if (i === 3) imagePieceIndex = 5;//... yneg
    else if (i === 4) imagePieceIndex = 4;//... zpos
    else if (i === 5) imagePieceIndex = 10;//... zneg

    imageUris.push(imagePieces[imagePieceIndex]);

    // Uncomment to check results
    // window.open(imagePieces[imagePieceIndex], "" + imagePieceIndex);
  }

  return imageUris;
}

export {
  loadCubeMap,
  cubeMapToUris
};
