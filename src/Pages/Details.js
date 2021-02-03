import React, { useState, useEffect, memo } from "react";
import Axios from "axios";
import { Card, CardContent, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import "./home.css";

const API_KEY = "jgCQSQP4pkZ69boqvz19RqI2wgQk6Qgt5HI2FxxN";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginTop: "30px",
    backgroundColor: "#3f51b5",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Details = memo(() => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const classes = useStyles();

  const apiCall = () => {
    Axios.get(
      `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${API_KEY}`
    ).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div className={"details-card"}>
      <Card className={classes.root}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Paper className={classes.paper}>name:</Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.paper}>{data.name}</Paper>
            </Grid>

            <Grid item xs={3}>
              <Paper className={classes.paper}>nasa_jpl_url:</Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                <a href={data.nasa_jpl_url}>{data.nasa_jpl_url}</a>
              </Paper>
            </Grid>

            <Grid item xs={3}>
              <Paper className={classes.paper}>
                {" "}
                is_potentially_hazardous_asteroid:
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.paper}>
                {data.is_potentially_hazardous_asteroid ? "true" : "false"}
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
});

export default Details;
