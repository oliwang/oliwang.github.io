const path = require('path');
const jimp = require('jimp');
 
module.exports = ({ markdownNode }) => {
  const { frontmatter, fields } = markdownNode;
  const output = path.join('./public', fields.slug, 'seo.png');
 
  const WIDTH = 1200;
  const HEIGHT = 630;
  const PADDING = 40;

  return Promise.all([
    jimp.read(path.join(__dirname, 'banner.jpg')),
    jimp.loadFont(jimp.FONT_SANS_64_BLACK),
  ]).then(([image, font]) => {
    image
      .resize(WIDTH, HEIGHT)
      .print(
        font,
        100,
        200,
        frontmatter.title,
        1000,
      )
      .write(output);
  });
};