export default theme => ({
  root: {
    position: 'relative',
    padding: '10px 10px 20px 10px',
    '&:before': {
      position: 'absolute',
      left: 0,
      top: -1,
      right: 0,
      height: 1,
      content: '""',
      opacity: 1,
    },
    '&:first-child': {
      borderTopLeftRadius: 2,
      borderTopRightRadius: 2,
      '&:before': {
        display: 'none',
      },
    },
    '&:last-child': {
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
    },
    '&$expanded + &': {
      '&:before': {
        display: 'none',
      },
    },
  },
  dialogContentRoot: {
    padding: '0 24px 10px 24px',
  },
  expanded: {
    margin: `32px 0 !important`,
    '&:first-child': {
      marginTop: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
    '&:before': {
      opacity: 0,
    },
  },
  cv: {
    marginTop: 12,
  },
  actionWrapper: {
    '@media (max-width: 485px)': {
      width: 50,
    },
  },
  delete: {
    '& svg': {
      '&:hover': {
        '& path': {
          fill: '#D50000',
          d:
            'path("M20.37,8.91L19.37,10.64L7.24,3.64L8.24,1.91L11.28,3.66L12.64,3.29L16.97,5.79L17.34,7.16L20.37,8.91M6,19V7H11.07L18,11V19A2,2 0 0,1 16,21H8A2,2 0 0,1 6,19Z")',
        },
      },
    },
  },
  paperWidthSm: {
    minWidth: 320,
  },
});
