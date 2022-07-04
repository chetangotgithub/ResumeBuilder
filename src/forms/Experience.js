import { Button, TextField } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { Context } from "../usercontext.js";
import test2 from "../CSS/test.module.css";

const Experience = () => {
  const currUserId = useContext(Context);
  const [experiences, setExperiences] = useState([
    { profile: "", location: "", description: "", startDate: "", endDate: "" },
  ]);

  const handleChangeInput = (e, index) => {
    const values = [...experiences];
    values[index][e.target.name] = e.target.value;
    setExperiences(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDoc(
      doc(db, "users", currUserId),
      {
        experiences: experiences,
      },
      { merge: true }
    )
      .then((snapshot) => {
        console.log(snapshot);
        alert("Data Submitted");
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    const getUser = async (id) => {
      const noteSnapshot = await getDoc(doc(db, "users", id));
      if (noteSnapshot.data().experiences !== undefined) {
        setExperiences(noteSnapshot.data().experiences);
      } else {
        console.log("Note doesn't exist");
      }
    };
    getUser(currUserId);
  }, []);
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      {experiences.map((experience, index) => (
        <div key={index} className="skill-box">
          <h4 style={{ margin: "0px" }}>{index + 1}</h4>
          <div className={test2.center}>
            <div className={test2.inputbox}>
              <input
                type="text"
                required="required"
                name="profile"
                value={experience.profile}
                onChange={(e) => handleChangeInput(e, index)}
              />
              <span>Profile</span>
            </div>
            <div className={test2.inputbox}>
              <input
                type="text"
                required="required"
                name="location"
                value={experience.location}
                onChange={(e) => handleChangeInput(e, index)}
              />
              <span>Location</span>
            </div>
          </div>

          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            required
            fullWidth
            name="description"
            value={experience.description}
            onChange={(e) => handleChangeInput(e, index)}
            defaultValue="description"
            variant="outlined"
          />
          <TextField
            id="date"
            label="Start Date"
            type="date"
            value={experience.startDate}
            onChange={(e) => handleChangeInput(e, index)}
            name="startDate"
            required
            InputLabelProps={{
              shrink: true,
            }}
            className="me-5 my-3"
          />
          <TextField
            id="date"
            label="End Date"
            type="date"
            name="endDate"
            required
            value={experience.endDate}
            onChange={(e) => handleChangeInput(e, index)}
            InputLabelProps={{
              shrink: true,
            }}
            className="my-3"
          />
        </div>
      ))}
      <Button
        color="secondary"
        variant="contained"
        className="me-3"
        onClick={() =>
          setExperiences([
            ...experiences,
            {
              profile: "",
              location: "",
              description: "",
              startDate: "",
              endDate: "",
            },
          ])
        }
      >
        Add Experience
      </Button>
      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default Experience;
