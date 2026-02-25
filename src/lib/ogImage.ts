const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const OG_IMAGE_RATIO = OG_IMAGE_WIDTH / OG_IMAGE_HEIGHT;
const OG_MAX_BYTES = 700 * 1024;
const OG_START_QUALITY = 0.86;
const OG_MIN_QUALITY = 0.56;

const canvasToBlob = (canvas: HTMLCanvasElement, quality: number) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Unable to process image."));
          return;
        }
        resolve(blob);
      },
      "image/jpeg",
      quality
    );
  });

const loadFileImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Unable to read image file."));
    };

    image.src = objectUrl;
  });

export const normalizeOgImageFile = async (file: File): Promise<Blob> => {
  const image = await loadFileImage(file);
  const sourceRatio = image.width / image.height;

  let sx = 0;
  let sy = 0;
  let sw = image.width;
  let sh = image.height;

  if (sourceRatio > OG_IMAGE_RATIO) {
    sw = Math.round(image.height * OG_IMAGE_RATIO);
    sx = Math.round((image.width - sw) / 2);
  } else if (sourceRatio < OG_IMAGE_RATIO) {
    sh = Math.round(image.width / OG_IMAGE_RATIO);
    sy = Math.round((image.height - sh) / 2);
  }

  const canvas = document.createElement("canvas");
  canvas.width = OG_IMAGE_WIDTH;
  canvas.height = OG_IMAGE_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Unable to process image.");
  }

  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, OG_IMAGE_WIDTH, OG_IMAGE_HEIGHT);

  let quality = OG_START_QUALITY;
  let blob = await canvasToBlob(canvas, quality);

  while (blob.size > OG_MAX_BYTES && quality > OG_MIN_QUALITY) {
    quality = Math.max(quality - 0.08, OG_MIN_QUALITY);
    blob = await canvasToBlob(canvas, quality);
  }

  return blob;
};

export const OG_IMAGE_RULE_TEXT = "Auto-cropped to 1200x630 and compressed as JPG.";
