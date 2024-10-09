import { useState } from "react";
import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../components/Button.jsx";
import { db } from "../../firebaseconfig.js"; // Import the Firestore instance
import { collection, doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique ID generation

const Modal = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", { name, email });
    if (name && email) {
      onSubmit(name, email);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Enter your details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                console.log("Name changed:", e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                console.log("Email changed:", e.target.value);
              }}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [videoAllowed, setVideoAllowed] = useState(false);

  // Function to save data to Firestore
  const saveToFirestore = async (name, email) => {
    try {
      const id = uuidv4(); // Generate a unique ID
      await setDoc(doc(collection(db, "users"), id), {
        name: name,
        email: email,
      });
      console.log("Document written with ID: ", id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Function to handle form submission
  const handleFormSubmit = (name, email) => {
    console.log("Handling form submission");
    saveToFirestore(name, email); // Save data to Firestore
    setShowModal(false); // Close modal
    setVideoAllowed(true); // Allow video playback
    console.log("Modal closed, video allowed:", videoAllowed);
  };

  return (
    <section className="relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
      {showModal && (
        <Modal
          onClose={() => {
            setShowModal(false);
            console.log("Modal closed");
          }}
          onSubmit={handleFormSubmit}
        />
      )}
      <Element name="hero">
        <div className="container">
          <div className="relative z-2 flex max-lg:flex-col max-lg:items-center">
            {/* Text Section */}
            <div className="max-w-512 max-lg:max-w-388">
              <div className="caption small-2 uppercase text-p3">
              You Started Your Creative Digital Design Business,
              </div>
              <h1 className="mb-6 h4 text-p4 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
              But Sales Aren’t Following? I Know Why
              </h1>
              <p className="max-w-440 mb-14 body-1 max-md:mb-10">
              Building a creative digital product business from scratch is hard, but you don’t have to figure it out alone. From figuring out what products to sell, to the AI prompts to create them, up everything to generating sales— Get real-world advice and support from those who’ve done it before.
              </p>
              <LinkScroll to="features" offset={-100} spy smooth>
                <Button icon="/images/zap.svg">Get started now</Button>
              </LinkScroll>
            </div>

            {/* Video Section */}
            <div className="ml-20 mt-14 max-lg:ml-0 max-lg:mt-10">
              {!videoAllowed ? (
                <div className="w-[500px] h-[280px] bg-black flex items-center justify-center text-white">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                      setShowModal(true);
                      console.log("Modal opened");
                    }}
                  >
                    Watch Video
                  </button>
                </div>
              ) : (
                <iframe
                  className="w-[500px] h-[280px] max-lg:w-full max-lg:h-auto"
                  src="https://fast.wistia.net/embed/iframe/0e42xh79en"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="YouTube video"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
