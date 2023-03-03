const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: "Pandas making fried rice",
      n: 1,
      size: '512x512'
    });

    const imageUrl = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: imageUrl
    });
  } catch (err) {

    if (err.response) {
      console.error(err.response.status);
      console.error(err.response.data);
    } else {
      console.error(err.message);
    }

    res.status(400).json({
      success: false,
      error: 'Image could not be generated'
    });
  }
}

module.exports = { generateImage }