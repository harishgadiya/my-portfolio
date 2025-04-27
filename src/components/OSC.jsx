import React, { useEffect, useState, useContext } from "react";
import { Chrono } from "react-chrono";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { ThemeContext } from "styled-components";
import endpoints from "../constants/endpoints";
import Header from "./Header";
import FallbackSpinner from "./FallbackSpinner";
import "../css/education.css";

function OpenSourceContribution(props) {
  const theme = useContext(ThemeContext);
  const { header } = props;
  const [data, setData] = useState(null);
  const [width, setWidth] = useState("50vw");
  const [mode, setMode] = useState("VERTICAL_ALTERNATING");

  useEffect(() => {
    fetch(endpoints.osc, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);

    if (window?.innerWidth < 576) {
      setMode("VERTICAL");
    }

    if (window?.innerWidth < 576) {
      setWidth("90vw");
    } else if (window?.innerWidth >= 576 && window?.innerWidth < 768) {
      setWidth("90vw");
    } else if (window?.innerWidth >= 768 && window?.innerWidth < 1024) {
      setWidth("75vw");
    } else {
      setWidth("50vw");
    }
  }, []);

  console.log(data);

  return (
    <>
      <Header title={header} />
      {data ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div style={{ width }} className="section-content-container">
            <Container>
              <Chrono
                hideControls
                allowDynamicUpdate
                useReadMore={false}
                items={data.osc}
                cardHeight={250}
                mode={mode}
                theme={{
                  primary: theme.accentColor,
                  secondary: theme.accentColor,
                  cardBgColor: theme.chronoTheme.cardBgColor,
                  cardForeColor: theme.chronoTheme.cardForeColor,
                  titleColor: theme.chronoTheme.titleColor,
                }}
              >
                <div className="chrono-icons">
                  {data.osc.map((education) =>
                    education.icon ? (
                      <img
                        key={education.icon.src}
                        src={education.icon.src}
                        alt={education.icon.alt}
                      />
                    ) : null
                  )}
                </div>
              </Chrono>
            </Container>
          </div>
        </motion.div>
      ) : (
        <FallbackSpinner />
      )}
    </>
  );
}

OpenSourceContribution.propTypes = {
  header: PropTypes.string.isRequired,
};

export default OpenSourceContribution;
