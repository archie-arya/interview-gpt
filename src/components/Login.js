import React from 'react';
import Header from './Header';
import Input from '@mui/material/Input';
import Field from './Field';
import TypeRadio from './TypeRadio';
import DiscreteSlider from './Slider';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { saveUserResponse } from '../firebase';


const Login = () => {

    const[name, setName] = useState("");
    const [area, setArea] = useState('');
    const [interviewType, setInterviewType] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState(50);

    const navigate = useNavigate();


    const handleOnClick = async() => {

        await saveUserResponse(name, area, interviewType, difficultyLevel);


        navigate('/browse');

    };


  return (
    <div>
      <Header />
      <div style={{ background: 'linear-gradient(to bottom, #ccc, #f5f5f5, #fff)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="flex justify-center items-center mt-12 mb-12">
          <h1 className='font-bold font-mono text-xl mr-8'>Hi, what's your name?</h1>
          <Input className="w-80% rounded-md text-gray-800" type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='flex justify-center items-center mb-12'>
          <h1 className='font-bold font-mono text-xl py-2 mr-8'>Area you want to interview for</h1>
          <Field setArea={setArea}/>
        </div>
        <div className="flex justify-center items-center mb-12 text-center"> 
          <h1 className='font-bold font-mono text-lg py-2 mr-8'>Type of Interview</h1>
          <TypeRadio setInterviewType = {setInterviewType} />
        </div>
        <div className='flex justify-center items-center text-center mb-10'>
          <h1 className='font-bold font-mono text-lg py-2 mr-8'>Choose Difficulty Level</h1>
          <DiscreteSlider setDifficultyLevel = {setDifficultyLevel} />
        </div>
        <div>
                <Stack direction="row" spacing={2}>
                    <Button
                        onClick={handleOnClick}
                        variant="contained"
                        endIcon={<SendIcon />}
                        style={{ background: 'black', color: 'white' }}
                    >
                        Continue
                    </Button>
            </Stack>
        </div>
      </div>
    </div>
  );
};

export default Login;
