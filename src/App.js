import React, { useState, useCallback } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import ReCAPTCHA from "react-google-recaptcha";

function App() {
  const [isLogedin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const recaptchaRef = React.createRef();

  function handleSubmitLogin() {
    if (username === "a senior engineer" && password === "steven") {
      setIsLogin(true);
    }
  }

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  if (isLogedin === false) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <Card style={{ width: "50%" }}>
          <Card.Body>
            <Card.Title>Quiz</Card.Title>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Who is the best coder in the world?</Form.Label>
                <Form.Control
                  placeholder="Who is the best coder in the world?"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Who is steven?</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Who is steven?"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
              <form
                onSubmit={() => {
                  recaptchaRef.current.execute();
                }}
              >
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6Lfg54kkAAAAANTA3Z-fCWvBS9VG8Y0sm2wnDpvC"
                  onChange={() => console.log()}
                />
              </form>
              <Button
                variant="primary"
                className="mt-3"
                onClick={() => handleSubmitLogin()}
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }

  if (isLogedin === true) {
    return (
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#0d47a1",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
    );
  }
}

export default App;
