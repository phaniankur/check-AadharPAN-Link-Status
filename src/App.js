import { useEffect, useState } from 'react';
import './App.css';
import ReactGA from 'react-ga';

function App() {
  const [data, setData] = useState("");
  const [inputData, setInputData] = useState({
    pan: '',
    aadhar: ''
  });

  useEffect(() => {
    ReactGA.initialize("UA-249696688-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
   }, []);

  const handlecheck = (e)=>{
    e.preventDefault();
    console.log(inputData)
    let body = {
      aadhaarNumber: inputData.aadhar,
      createdBy: "linkAadhaarValidationService",
      createdByUser: inputData.pan,
      pan: inputData.pan,
      preLoginFlag: "Y",
      serviceName: "linkAadhaarValidationService",
      updatedBy: "linkAadhaarValidationService",
      updatedByUser: inputData.pan
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body) 
    };
    fetch('https://eportal.incometax.gov.in/iec/servicesapi/saveEntity', requestOptions )
    .then(res=> res.json())
    .then(json=> {
      console.log(json)
      setData(json.messages)
    })
    .catch(err=> console.log(err))
  }

  return (
    <form className="App">
      
      <div className='inputFlex'>
        <label className='label'>Enter your PAN</label>
        <input
        className='inputBox'
        placeholder='PAN NAME'
        value={inputData.pan}
        onChange={(e)=> setInputData({...inputData, pan: e.target.value.toUpperCase()})}
        />
      </div>
      <div className='inputFlex'>
        <label className='label'>Enter your Aadhar</label>
        <input
        className='inputBox'
        placeholder='Aadhar Number'
        value={inputData.aadhar}
        onChange={(e)=> setInputData({...inputData, aadhar: e.target.value})}
        />
      </div>
      <button className='button' onClick={handlecheck}>Check</button>
      {
        data &&
        <div className='message'>{data[0].desc}</div>
      }
      <div className='secured'>This website is secured with <b>https://eportal.incometax.gov.in</b> API </div>
    </form>
  );
}

export default App;
