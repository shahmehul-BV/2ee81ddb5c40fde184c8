import React, { useState, memo } from "react";
import "./home.css";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

const API_KEY = "jgCQSQP4pkZ69boqvz19RqI2wgQk6Qgt5HI2FxxN";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
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
    console.log("In List", arrData);
    axios
      .get(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`)
      .then((res) => {
        var resultArray = res.data.near_earth_objects;
        setArrData(resultArray);
        console.log("Random", resultArray);
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
        <form>
          <div>
            <TextField
              variant="outlined"
              label="Enter Asteroid ID"
              onChange={(e) => onHandleChange(e)}
            />
          </div>

          <div class={"btn-group"}>
            <Button
              type="submit"
              disabled={isDisable}
              onClick={(e) => getAsteroidInfo(e)}
            >
              Sumbit
            </Button>

            <Button type="submit" onClick={(e) => getAsteroidList(e)}>
              Random Asteroid
            </Button>
          </div>
        </form>
        {arrData ? (
          <div>
            {arrData.map((item) => (
              <div onClick={() => history.push(`./details/${item.id}`)}>
                {item.id}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default Home;
