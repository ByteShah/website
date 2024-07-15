import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const ContactPage = () => {
  const form = useRef();
  const [validated, setValidated] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    const formElement = e.currentTarget;

    if (formElement.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      emailjs
        .sendForm("service_povzevn", "template_rn2gimo", form.current, {
          publicKey: "P0T0AwGb7qYepWeHx",
        })
        .then(
          () => {
            console.log("SUCCESS!");
            setValidated(false);
            form.current.reset();
            Swal.fire({
              title: "Message Sent Successfully!",
              // text: "You clicked the button!",
              icon: "success",
            });
          },
          (error) => {
            console.log("FAILED...", error.text);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        );
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="contact-form">
          <h1 className="mb-0">
            Love to hear from you, <br /> <span>Get in touch 👋</span>
          </h1>
          <div className="mt-5">
            <form
              ref={form}
              className={`needs-validation ${validated ? "was-validated" : ""}`}
              noValidate
              onSubmit={sendEmail}
            >
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="user_name"
                    id="name"
                    placeholder="Your Name"
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter your name.
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    className="form-ontrol"
                    id="email"
                    placeholder="Your Email"
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter an email address.
                  </div>
                </div>
                <div className="col mb-3">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    name="message"
                    className="form-control"
                    id="message"
                    rows="8"
                    placeholder="Message"
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter a message.
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <button className="btn btn-dark w-25 p-2" type="submit">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
