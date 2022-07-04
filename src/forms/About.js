import React, { useState, useContext, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { db } from "../firebase.js";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import test2 from "../CSS/test.module.css";
import { Context } from "../usercontext.js";
const About = () => {
  const currUserId = useContext(Context);
  const [about, setAbout] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(about);
    await setDoc(
      doc(db, "users", currUserId),
      {
        about: about,
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
      if (noteSnapshot !== undefined) {
        setAbout(noteSnapshot.data().about);
      } else {
        console.log("Note doesn't exist");
      }
    };
    getUser(currUserId);
  }, []);
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="outlined-multiline-static"
        label="About"
        multiline
        rows={4}
        columns={33}
        required
        fullWidth
        name="about"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        defaultValue="..."
        variant="outlined"
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        className="my-3"
      >
        Add
      </Button>
    </form>
  );
};

export default About;
