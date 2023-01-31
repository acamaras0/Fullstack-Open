const info = (message) => {
    console.log(message);
  };
  
  const error = (error) => {
    console.error(error);
  };
  
  module.exports = {
    info,
    error,
  };