export default theme => ({
  root: {
    margin: '20px auto 0',
    maxWidth: 680,
  },
  typographyRoot: {
    textAlign: 'center',
  },
  paper: {
    padding: 10,
    margin: '20px 0',
  },
  logo: {
    display: 'block',
    margin: '0 auto',
    width: 250,
  },
  total: {
    float: 'right',
    margin: '20px 10px 0',
    '@media (max-width: 550px)': {
      margin: '20px 0 0',
    },
  },
  headline: {
    margin: '1px 0',
    '@media (max-width: 550px)': {
      'font-size': 16,
    },
  },
  title: {
    margin: '1px 0',
    '@media (max-width: 550px)': {
      'font-size': 14,
    },
  },
  subheading: {
    margin: '1px 0',
    '@media (max-width: 550px)': {
      'font-size': 12,
    },
  },
  feesWarning: {
    display: 'none',
    '@media (max-width: 550px)': {
      display: 'inline-table',
      position: 'relative',
      bottom: -53,
      paddingLeft: 10,
    },
  },
  buttonProgress: {
    color: '#00aeef',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },

  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    float: 'right',
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});
