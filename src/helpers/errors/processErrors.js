import React from 'react';

export default (error, styled = false) => {
  const errorList = [];

  const styleObj = {
    margin: 0,
    fontSize: '0.75rem',
    textAlign: 'left',
    marginTop: 8,
    minHeight: '1em',
    fontFamily: 'Roboto',
    lineHeight: '1em',
    color: '#f44336',
    display: 'block',
  };

  if (error) {
    if (Array.isArray(error)) {
      error.forEach(result => {
        errorList.push(<span style={styled ? styleObj : null}>{result}</span>);
      });

      return errorList;
    }
    return <span style={styled ? styleObj : null}>{error}</span>;
  }

  return null;
};
