import React, { useEffect, useState } from "react";
import "../App.css";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Button } from "react-bootstrap";
import html2PDF from 'jspdf-html2canvas';

const Resume = () => {
  const params = useParams();
  console.log(params.id);
  const [userDetails, setUserDetails] = useState({});
  const getUser = async () => {
    const userSnapshot = await getDoc(doc(db, "users", params.id));
    if (userSnapshot.exists()) {
      setUserDetails(userSnapshot.data());
      console.log("1st");
    } else {
      console.log("user doesn't exist");
    }
  };

  useEffect(() => {
    getUser();
    console.log("2nd");
  }, []);

   
 
    // code for pdf download 
    window.onload = function () { 
      document.getElementById('download-btn').addEventListener('click',async()=>{
       const pdf = await html2PDF(document.getElementById('html-content'), {
          jsPDF: {
            format: 'a1',
          },
          
          imageType: 'image/jpeg',
          output: './pdf/generate.pdf'
        });
        console.log(pdf);
      console.log("clicked");
      } )
      }
 

  console.log(userDetails);
  return (
    <>
    {/* <Button color="primary" className="my-5" id='download-btn'>
    Download Resume
    </Button> */}
      <section id="html-content">
        <div
          className="row col-12"
          style={{ display: "flex", flexDirection: "row",padding:'0px',margin:'0px' }}
        >
          <div className="col-left col-lg-4">
            <img
              src={userDetails.profileUrl?userDetails.profileUrl:"https://manofmany.com/wp-content/uploads/2019/04/David-Gandy.jpg"}
              alt=""
            />
            <h3
              className="name"
              style={{ display: "inline-block", fontFamily: `'Lora', serif` }}
            >
              {userDetails.fullName}
            </h3>
            <span className="designation">{userDetails.designation}</span>

            <div className="item">
              <h3 className="header-title">Personal Info</h3>
              <ul>
                <li>
                  <span className="label">Phone</span>
                  <span className="output">{userDetails.phone}</span>
                </li>
                <li>
                  <span className="label">E-mail</span>
                  <span className="output">{userDetails.email}</span>
                </li>
                <li>
                  <span className="label">LinkedIn</span>
                  <span className="output">
                    <a href={userDetails.linkdinUrl} target="_blank">
                      {userDetails.linkdinUrl}
                    </a>
                  </span>
                </li>
              </ul>
            </div>

            <div className="item">
              <h3 className="header-title">Skills</h3>
              <ul>
                {userDetails.skills &&
                  userDetails.skills.map((skill, index) => (
                    <li key={index}>
                      <span className="label">{skill.title}</span>
                      <span className="output">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: Number(`${skill.rating}` * 10) + "%",
                            }}
                            aria-valuenow={Number(`${skill.rating}` * 10)}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            {Number(`${skill.rating}` * 10) + "%"}
                          </div>
                        </div>
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="col-right col-lg-8">
            <p className="about">{userDetails.about}</p>
            <h3>Experience</h3>
            {userDetails.experiences &&
              userDetails.experiences.map((experience) => (
                <div className="experience-item col-12">
                  <div className="left">
                    <span>{experience.startDate} <strong> - </strong> </span>
                    <span>{experience.endDate}</span>
                  </div>
                  <div className="right">
                    <h1>{experience.profile}</h1>
                    <span>{experience.location}</span>
                    <p className="exp-desc">{experience.description}</p>
                  </div>
                </div>
              ))}

            <h3>Education</h3>
            {userDetails.educationDetails &&
              userDetails.educationDetails.map((education, index) => (
                <div className="experience-item col-12" key={index}>
                  <div className="left">
                    <span>{education.startYear} <strong> - </strong></span>
                    <span>{education.endYear}</span>
                  </div>
                  <div className="right">
                    <div>
                      <h1>{education.degree}</h1>
                      <span>{education.college}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Resume;
