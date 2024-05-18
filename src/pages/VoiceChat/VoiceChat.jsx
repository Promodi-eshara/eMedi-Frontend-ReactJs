import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

import Papa from 'papaparse';
import { FaAlignLeft, FaAlignRight, FaCircleUser, FaMicrophone } from "react-icons/fa6";

import VC_Style from './VoiceChat.module.css';
import strings from '../../utilities/strings';

function VoiceChat() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/Login');
    }
  }, [isAuthenticated, navigate]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [doctorNames, setDoctorNames] = useState([]);

  const [transcription, setTranscription] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recording, setRecording] = useState(false);
  const [recordingBtn, setRecordingBtn] = useState(false);
  const [isVoiceDisabled, setIsVoiceDisabled] = useState(true);
  const [predictedDisease, setPredictedDisease] = useState('');

  const [voiceLink, setVoiceLink] = useState("");
  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleEnterAction(inputValue);
    }
  };

  const handleEnterAction = (text) => {
    setTranscription(text);
    setTimeout(() => {
      setInputValue("");
      console.log(text);
      extract_disease(text);
    }, 2500); 
  };

  const handleDoctorClick = (doctor) => {
    navigate('/ScheduleAppointment', { state: { 
      doctorData : doctor ,
      symptomsData : transcription
    } });
  };

  const startRecording = () => {
    setPredictedDisease("");
    setTranscription("Recording.....");
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const recorder = new MediaRecorder(stream);
        const chunks = [];

        recorder.addEventListener('dataavailable', event => {
          chunks.push(event.data);
        });

        recorder.addEventListener('stop', () => {
          if (chunks.length === 0) {
            Swal.fire({
              title: 'Error',
              text: 'No audio data recorded. Please try recording again.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          } else {
            setTranscription("Stoping.....");
            const recordedBlob = new Blob(chunks, { type: 'audio/wav' });
            uploadToCloudinary(recordedBlob);
          }
        });
        

        setMediaRecorder(recorder);
        setAudioChunks(chunks);
        setRecording(true);
        
        recorder.start();

        setTimeout(() => {
          if (recorder.state === 'recording') {
            recorder.stop();
            setRecording(false);
          }
        }, 5000); 
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  };


  const uploadToCloudinary = (audioBlob) => {
    setTranscription("Uploading.....");
    const formData = new FormData();
    formData.append('file', audioBlob);

    formData.append('upload_preset', 'ml_default');
    formData.append('api_key', '898757516982373');

    fetch('https://api.cloudinary.com/v1_1/dwkxuivav/upload', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        setTranscription("Uploaded. Press Predict Button.");
        console.log(data);
        setVoiceLink(data.secure_url);
        setIsVoiceDisabled(false);
        setRecordingBtn(true);
    })
    .catch(error => {
        console.error('Error uploading to Cloudinary:', error);
    });
  };

  function predictDisease(){
    
    axios.post('http://127.0.0.1:5000/voice_to_text', { voice_link: voiceLink })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        setTranscription(response.data);
        extract_disease(response.data);
      }
    })
    .catch(error => {
      console.error('Error predicting disease:', error);
    });
  }

  function extract_disease(inputText){
    axios.post('http://127.0.0.1:5000/extract_disease', { input_text: inputText })
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        setPredictedDisease(response.data.prediction);
        setRecordingBtn(false);
        setIsVoiceDisabled(true);
        getDoctors(response.data.prediction);
      } 
    })
    .catch(error => {
      
      console.error('Error predicting disease:', error);
    });
  }

  const getDoctors = async (disease) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/get_doctors', { disease });
      setDoctorNames(response.data); 
      console.log(response.data);
    } catch (error) {
        console.error('Error fetching doctors:', error);
    }
  }



return (
  <div>
    <header>
      <div className="navbar">
        <button className='btn_menu' onClick={toggleMenu}><FaAlignLeft /></button>
        <h2>{strings.appName} | <span>Voice Chat</span></h2>
        <div className='nav_btn_container'>
          <ul>
            <li><a href='/Appointments'>Appointments</a></li>
            <li><a href='/VoiceChat'>Book Appointment</a></li>
          </ul>
          <a href='/Profile' className='user_icon'><FaCircleUser className='icon' /></a>
        </div>
      </div>

      <div className={`menu_container ${isMenuOpen ? 'show' : ''}`}>
        <div className='menu_header'>
          <h2 className='app_name'>{strings.appName}</h2>
          <button className='btn_close_menu' onClick={toggleMenu}><FaAlignRight /></button>
        </div>
        <ul>
          <li><a href='/'>Home</a></li>
          <li><a href='/Appointments'>Appointments</a></li>
          <li><a href='/Profile'>Profile</a></li>
          <li><a href='/Login'>Login</a></li>
          <li><a href='/Register'>Register</a></li>
        </ul>
      </div>
    </header>
    <section>
      <div className={VC_Style.container}>
        <div className={VC_Style.bubble_containers}>
          <div className={VC_Style.bubble_container_left}>
            <p className={VC_Style.bubble_container_title}><b>{strings.appName}</b></p>
            <p>Welcome to eMedi! Easily book doctor appointments by chatting about your symptoms. Our smart system matches you with trusted healthcare professionals, saving you time and hassle. Take control of your health journey with eMedi – where booking appointments is as simple as a conversation.</p>
          </div>

          <div className={VC_Style.bubble_container_left}>
            <p className={VC_Style.bubble_container_title}><b>{strings.appName}</b></p>
            <p>Lets tell your symptoms.</p>
            <div className={VC_Style.bubble_btn_container}>
              {/* {doctorNames.map((doctor, index) => (
                <button className={VC_Style.bubble_btn} key={index} onClick={() => handleDoctorClick(doctor)}>
                  {doctor.Name} ({doctor.Specialization})
                </button>
              ))} */}
            </div>
          </div>

          {transcription ? (
          <div className={VC_Style.bubble_container_right}>
            <p className={VC_Style.bubble_container_title}><b>You</b></p>
            <p>{transcription}</p>
          </div>
          ) : (<></>)}

          {predictedDisease ? (
            <div style={{marginTop:'15%' }} className={VC_Style.bubble_container_left}>
              <p className={VC_Style.bubble_container_title}><b>{strings.appName}</b></p>
              <p>The Chat Bot Predicted Your Disease as ,
              <span style={{fontWeight:600 , textAlign:'center'}}> {predictedDisease}</span></p>
            </div>
          ) : (<></>)}

          {predictedDisease ? (
          <div className={VC_Style.bubble_container_left} style={{marginBottom :'10%'}}>
            <p className={VC_Style.bubble_container_title}><b>{strings.appName}</b></p>
            <p>Select A Doctor and Create a Appoinment</p>
            <div className={VC_Style.bubble_btn_container}>
              {doctorNames.map((doctor, index) => (
                <button className={VC_Style.bubble_btn} key={index} onClick={() => handleDoctorClick(doctor)}>
                  {doctor.Name} ({doctor.Specialization})
                </button>
              ))}
            </div>
          </div>
          ) : (<></>)}
        </div>
        {/* <input type='text' placeholder='Type something...' /> */}
      </div>
    </section>
    
    <div className={VC_Style.footer}>
      <div className={VC_Style.footer_container}>
        <div style={{textAlign:'center' , marginBottom:'2%'}}>
          <button className={VC_Style.voice_btn} onClick={startRecording} disabled={recordingBtn}>
              {recording ? 'Recording... ' : 'Start Recording '}&#10687;
          </button>
          <button className={VC_Style.predit_btn} onClick={predictDisease} disabled={isVoiceDisabled}>
               Predict Disease
          </button>
        </div>
        <input
          type='text'
          id="symtoms"
          placeholder='Type and Press Enter...'
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyPress}
        />      
        </div>
    </div>
  </div>
);
}

export default VoiceChat;