
exports.handler = async (event) => {
    try {
      const body = JSON.parse(event.body);
      const message = body.message;
      console.log(`Received message: ${message}`);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Data received successfully',
        }),
      };
    } catch (error) {
      console.error(error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: 'Error occurred while processing data',
        }),
      };
    }
  };