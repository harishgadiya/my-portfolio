import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import Fade from "react-reveal";
import endpoints from "../constants/endpoints";
import Social from "./Social";
import FallbackSpinner from "./FallbackSpinner";

const styles = {
  nameStyle: {
    fontSize: "5em",
  },
  inlineChild: {
    display: "inline-block",
  },
  mainContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  downloadBtn: {
    display: 'inline-flex',
    padding: "20px 40px",
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    background: '#55e6a5',
    color: '#000',
    fontWeight: 500,
    transition: 'all 0.3s linear 0s',
    wordBreak: 'normal',
    marginTop: '30px',
    borderRadius: '66px',
    textDecoration: 'none'
  }
};

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoints.home, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <Fade>
      <div style={styles.mainContainer}>
        <h1 style={styles.nameStyle}>{data?.name}</h1>
        <div style={{ flexDirection: "row" }}>
          <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles,
            }}
          />
        </div>
        <a style={styles.downloadBtn} href="./resume/cv.pdf" download='harish_resume.pdf'>
          Download CV{" "}
          <img style={{maxWidth: 25}} src="./images/about/download.png" />{" "}
        </a>
        <Social />
      </div>
    </Fade>
  ) : (
    <FallbackSpinner />
  );
}

export default Home;
