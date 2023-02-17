import { useState, useCallback, useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import ReCAPTCHA from "react-google-recaptcha";
import Reaptcha from "reaptcha";

function App() {
  const [isLogedin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const captchaRef = useRef(null);

  const [captchaToken, setCaptchaToken] = useState(null);

  console.log(captchaToken);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();
  };

  const verify = () => {
    captchaRef.current.getResponse().then((res) => {
      setCaptchaToken(res);
    });
  };

  function handleSubmitLogin() {
    if (username === "steven" && password === "the best") {
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

              {/*
              <form onSubmit={handleSubmit} style={{ paddingTop: "8px" }}>
                <ReCAPTCHA
                  ref={captchaRef}
                  sitekey="6Lc6hI8kAAAAAEl56rbd1EVV_Pqz-EteDR_yaawU"
                  onChange={() => console.log()}
                />
              </form>
              */}

              <form onSubmit={handleSubmit}>
                <Reaptcha
                  sitekey="6Lc6hI8kAAAAAEl56rbd1EVV_Pqz-EteDR_yaawU"
                  ref={captchaRef}
                  onVerify={verify}
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
