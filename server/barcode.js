const axios = require('axios')


const getBarcodeInfobySearch = async (keyword) => {

  try {
    const response = await axios.get(`https://api.barcodespider.com/v1/search?token=${process.env.BARCODE_TOKEN}&s=${keyword}`, {

    });

    return response.data;  // Return the data from the external API
  } catch (error) {
    console.error('Error fetching data from external API:', error);
    throw error;  // Re-throw the error to be handled by the calling function
  }
};


module.exports = getBarcodeInfobySearch