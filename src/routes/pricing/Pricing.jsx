//              ___             _   _  _ _
//             | __|_ _____ _ _| |_| || (_)
// Property of:| _|\ V / -_) ' \  _| __ | |
//             |___|\_/\___|_||_\__|_||_|_|
//

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import cardIcon from './card.png';
import discountIcon from './discount.png';
import feesIcon from './fees.png';
import secureIcon from './secure.png';
import startupIcon from './startup.png';
import cupIcon from './cup.png';

const styles = {
  h1: {
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    fontSize: '38px',
    fontWeight: '400',
  },
  p: {
    textAlign: 'center',
  },
  body: {
    fontFamily: 'Roboto',
  },
  container: {
    width: '90%',
    height: '120%',
    paddingTop: '80px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '100px',
  },
  mainTitle: {
    background: 'blue',
    margin: '0 0 50px',
    height: '300px',
  },

  card: {
    backgroundColor: '#fff !important',
    color: 'white',
    width: '250px',
    height: '350px',
    marginBottom: '80px',
    fontFamily: "Roboto, 'Times New Roman', Times, serif",
  },
  cardContent: {
    textAlign: 'center',
    paddingTop: '5px',
  },
  header: {
    margin: '0 auto',
    textAlign: 'center',
    marginBottom: '10px',
    background: 'cornflowerblue',
  },
  headerTitle: {
    textAlign: 'center',
    display: 'block !important',
    paddingRight: '0 !important',
    color: '#fff !important',
  },
  image: {
    height: '150px',
    margin: '0 auto',
    backgroundSize: 'auto',
    paddingBottom: '5px',
  },
  icon_list: {
    padding: '50px 0 0',
    margin: 0,
  },
  icon: {
    width: '120px',
    height: '120px',
    margin: '0 auto',
    fontSize: '14px',
    padding: '10px',
    display: 'block',
  },
  discount: {
    minWidth: '65%',
    maxWidth: '280px',
    margin: '0 auto',
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
  },
};

class Pricing extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Grid
          container
          spacing={16}
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <Card className={classes.card}>
              <CardHeader
                classes={{ title: classes.headerTitle }}
                className={classes.header}
                title="Free Events"
                titleColor="#fff"
              />
              <CardMedia
                className={classes.image}
                image={startupIcon}
                title="Rocketship"
              />
              <Divider style={{ width: '80%', margin: '0 auto' }} />
              <CardContent color="black">
                <Typography className={classes.cardContent}>
                  Our service is absolutely free for free events. Enjoy the same great
                  ticketing and event management features without the cost.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardHeader
                classes={{ title: classes.headerTitle }}
                className={classes.header}
                title="Paid Events"
              />
              <CardMedia
                className={classes.image}
                image={cupIcon}
                title="Golden Cup Trophy"
              />
              <Divider style={{ width: '80%', margin: '0 auto' }} />
              <CardContent color="black">
                <Typography className={classes.cardContent}>
                  For paid events, our service fee is 2.9% + $0.99/ticket. You can choose
                  to absorb or pass on the fees to the attendee.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <div className={classes.discount}>
          <p>
            We provide discount pricing for non-profit organizations, discover how you can
            save on your next event:
            <a href="mailto:contact@eventhi.io"> contact us today!</a>
          </p>
        </div>
        <Grid
          container
          className={classes.icon_list}
          classes={{ 'spacing-xs-24': classes.xsBottom }}
          direction="row"
          justify="space-around"
          alignItems="flex-end"
          spacing={24}
        >
          <Grid item md={3} xs={6}>
            <img src={feesIcon} alt="Fees" className={classes.icon} />
            <Typography className={classes.cardContent}>Flexible Fees</Typography>
          </Grid>
          <Grid item md={3} xs={6}>
            <img src={cardIcon} alt="Card" className={classes.icon} />
            <Typography className={classes.cardContent}>3% Transaction Fee</Typography>
          </Grid>
          <Grid item md={3} xs={6}>
            <img src={discountIcon} alt="Discount" className={classes.icon} />
            <Typography className={classes.cardContent}>
              Non-Profit Discount Pricing
            </Typography>
          </Grid>
          <Grid item md={3} xs={6}>
            <img src={secureIcon} alt="Secure" className={classes.icon} />

            <Typography className={classes.cardContent}>
              PCI-Compliant & SSL Secured
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Pricing);
