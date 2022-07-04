import { Button, TextField } from "@material-ui/core";
import React, { useState, useContext, useEffect } from "react";
import { db } from "../firebase.js";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { Context } from "../usercontext.js";
import test2 from "../CSS/test.module.css";
const Skills = () => {
  const currUserId = useContext(Context);
  const [skills, setSkills] = useState([{ title: "", rating: "" }]);

  const handleChangeInput = (e, index) => {
    const values = [...skills];
    values[index][e.target.name] = e.target.value;
    setSkills(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDoc(
      doc(db, "users", currUserId),
      {
        skills: skills,
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
      if (noteSnapshot.data().skills !== undefined) {
        setSkills(noteSnapshot.data().skills);
      } else {
        console.log("Note doesn't exist");
      }
    };
    getUser(currUserId);
  }, []);
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      {skills.map((skill, index) => (
        <div
          key={index}
          className="col-12 skill-box d-flex align-items-center flex-wrap"
        >
          <h4>{index + 1}</h4>
          <div className={test2.center}>
            <div className={test2.inputbox}>
              <input
                type="text"
                required="required"
                name="title"
                value={skill.title}
                onChange={(e) => handleChangeInput(e, index)}
              />
              <span>Skill Title</span>
            </div>
            <div className={test2.inputbox}>
              <input
                type="number"
                required="required"
                name="rating"
                value={skill.rating}
                min="1"
                max="10"
                onChange={(e) => handleChangeInput(e, index)}
              />
              <span>Rating (0 - 10)</span>
            </div>
          </div>
        </div>
      ))}
      <Button
        color="secondary"
        variant="contained"
        className="me-3"
        onClick={() => setSkills([...skills, { title: "", rating: "" }])}
      >
        Add Skill
      </Button>
      <Button type="submit" color="primary" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default Skills;
