import React, { useState, memo } from "react";
import "./home.css";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const API_KEY = "jgCQSQP4pkZ69boqvz19RqI2wgQk6Qgt5HI2FxxN";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "50ch",
  },
  margin1: {
    marginRight: theme.spacing(10),
  },
  margin2: {
    marginLeft: theme.spacing(10),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Home = memo(() => {
  const history = useHistory();
  const classes = useStyles();
  const [data1, setData1] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [arrData, setArrData] = useState([]);
  const [response, setResponse] = useState("");
  // To get Random Item
  // let randomItem = [];

  const onHandleChange = (event) => {
    setData1(event.target.value);
    if (event.target.value !== "") {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };

  const getAsteroidInfo = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.nasa.gov/neo/rest/v1/neo/${data1}?api_key=${API_KEY}`)
      .then((res) => {
        setResponse(res.data);
        history.push(`/details/${data1}`);
      })
      .catch((err) => {
        console.log("ERR---->", err);
      });
  };

  const getAsteroidList = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`)
      .then((res) => {
        var resultArray = res.data.near_earth_objects;
        setArrData(resultArray);
        for (let i = 0; i < resultArray[i].id.length - 1; i++) {
          arrData.push(resultArray[i].id);
        }
        // For Random Item
        // randomItem = arrData[Math.floor(Math.random() * arrData.length)];
      })
      .catch((err) => {
        console.log("errList--->", err.response);
      });
  };
  return (
    <div class={"row"}>
      <div class={"left-column"}>
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <TextField
              label="Asteroid ID"
              placeholder="Enter Asteroid ID"
              id="outlined-margin-dense"
              style={{ margin: 8 }}
              variant="outlined"
              className={classes.textField}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => onHandleChange(e)}
            />
          </div>

          <div class={"btn-group"}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isDisable}
              size="medium"
              className={classes.margin1}
              onClick={(e) => getAsteroidInfo(e)}
            >
              Sumbit
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="medium"
              className={classes.margin2}
              onClick={(e) => getAsteroidList(e)}
            >
              Random Asteroid
            </Button>
          </div>
        </form>
        <div className={"list-view"}>
          {arrData ? (
            <>
              {arrData.map((item) => (
                <div
                  className={"list-style"}
                  onClick={() => history.push(`./details/${item.id}`)}
                >
                  {item.id}
                </div>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
});

export default Home;
