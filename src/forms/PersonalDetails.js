import React, { useState, useContext, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { db } from "../firebase.js";
import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { Context } from "../usercontext.js";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import test2 from "../CSS/test.module.css";
const PersonalDetails = () => {
  const currUserId = useContext(Context);
  const [progress, setProgress] = useState(0);
  const [details, setDetails] = useState({
    fullName: "",
    designation: "",
    email: "",
    phone: "",
    linkdinUrl: "",
    profileUrl: "",
  });

  useEffect(() => {
    const getUser = async (id) => {
      const noteSnapshot = await getDoc(doc(db, "users", id));
      if (noteSnapshot.exists()) {
        setDetails(noteSnapshot.data());
      } else {
        console.log("Note doesn't exist");
      }
    };
    getUser(currUserId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await setDoc(
      doc(db, "users", currUserId),
      {
        fullName: details.fullName,
        designation: details.designation,
        email: details.email,
        phone: details.phone,
        linkdinUrl: details.linkdinUrl,
        profileUrl: details.profileUrl,
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

  const uploadFile = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(prog);
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setDetails({ ...details, profileUrl: url });
        });
      }
    );
  };

  const handleImgSubmit = (e) => {
    const file = e.target.files[0];
    console.log(file);
    uploadFile(file);
  };
  return (
    <>
      <div className={test2.center}>
        <form onSubmit={handleSubmit}>
          <div className={test2.inputbox}>
            <input
              type="text"
              required="required"
              value={details.fullName}
              onChange={(e) =>
                setDetails({ ...details, fullName: e.target.value })
              }
            />
            <span>FullName</span>
          </div>
          <div className={test2.inputbox}>
            <input
              type="text"
              value={details.designation}
              onChange={(e) =>
                setDetails({ ...details, designation: e.target.value })
              }
              required="required"
            />
            <span>Designation</span>
          </div>
          <div className={test2.inputbox}>
            <input
              type="email"
              value={details.email}
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              required="required"
            />
            <span>E-mail</span>
          </div>
          <div className={test2.inputbox}>
            <input
              type="number"
              value={details.phone}
              onChange={(e) =>
                setDetails({ ...details, phone: e.target.value })
              }
              required="required"
            />
            <span>Phone Number</span>
          </div>
          <div className={test2.inputbox}>
            <input type="file" onChange={handleImgSubmit} required="required" />
          </div>
          <div className="progress my-2">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: Number(`${progress}`) + "%",
              }}
              aria-valuenow={Number(`${progress}`)}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {Number(`${progress}`) + "%"}
            </div>
          </div>
          <div className={test2.inputbox}>
            <input
              type="url"
              onChange={(e) =>
                setDetails({ ...details, linkdinUrl: e.target.value })
              }
              value={details.linkdinUrl}
              required="required"
            />
            <span>Linkdin Url</span>
          </div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="my-3"
          >
            Add
          </Button>
        </form>
      </div>
    </>
  );
};

export default PersonalDetails;
