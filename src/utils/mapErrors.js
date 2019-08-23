function mapErrors(map){
  return (errors) => {
    return errors.map(error => {
      if (map[error.type]){
        return { message: map[error.type] };
      }

      return { message: error.message };
    });
  }
}

module.exports = mapErrors;
