import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { openai } from './openapi'; // Import your OpenAI instance here
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { orderBy } from 'firebase/firestore';
import { limit } from 'firebase/firestore';
const ChatInput = () => {
  const [messages, setMessages] = useState([]);
  const [answer, setAnswer] = useState('');


  const [userInfo, setUserInfo] = useState({
    name: '',
    area: '',
    interviewType: '',
    difficultyLevel: 50, // Default value if difficultyLevel is not available
  });


  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const responsesCollection = collection(db, 'userResponses');
        const q = query(responsesCollection, orderBy('timestamp', 'desc'), limit(1));

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Assuming there's only one user response document, you might need to handle multiple responses differently
          const userResponse = querySnapshot.docs[0].data();
          setUserInfo({
            name: userResponse.name,
            area: userResponse.area,
            interviewType: userResponse.interviewType,
            difficultyLevel: userResponse.difficultyLevel,
          });
          setAnswer(`Hi my name is ${userResponse.name} please take my ${userResponse.interviewType} of a ${userResponse.area} role of difficulty level ${userResponse.difficultyLevel}/100`);

        }
      } catch (error) {
        console.error('Error fetching user response:', error);
      }
    };

    fetchUserInfo();
  }, []);
  
  useEffect(() => {
  }, [userInfo]);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleOnChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleOnClick = async () => {
    setMessages((prevMessages) => [...prevMessages, { role: 'user', content: answer }]);
    setAnswer('');

    const simulatedApiResponse = await simulateApiResponse(answer);

    setMessages((prevMessages) => [...prevMessages, { role: 'assistant', content: simulatedApiResponse }]);
  };

  const simulateApiResponse = async (userMessage) => {
    const gptQuery = `Act as an interviewer for ${userMessage}.  Ask a single question at a time.`
    const gptResults = await openai.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    return gptResults.choices[0].message.content;
  };

  return (
    <div className = 'px-6 mt-32' style={{  }}>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '60vh',
          padding: '16px',
          overflowY: 'auto',
          alignItems: 'flex-end', // Align messages to the right
          borderRadius: '12px',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        {messages.map((message, index) => (
          <Message key={index} role={message.role} content={message.content} />
        ))}
        <div className = 'px-4' ref={messagesEndRef} />
      </Paper>
      <div className='px-4' style={{ display: 'flex', alignItems: 'center', marginTop: '16px', width: '100%' }}>
        <TextField
          value={answer}
          onChange={handleOnChange}
          variant="outlined"
          fullWidth
          placeholder="Type your message..."
          sx={{ borderRadius: '12px 0 0 12px', marginRight: '8px' }}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              e.preventDefault(); // Prevent the default behavior of the Enter key
              handleOnClick();
            }
          }}
        />
        <Button
          onClick={handleOnClick}
          variant="contained"
          endIcon={<SendIcon />}
          style={{
            backgroundColor: '#1976D2',
            color: 'white',
            borderRadius: '0 12px 12px 0',
            minWidth: '60px',
          }}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

const Message = ({ role, content }) => {
  const isUser = role === 'user';
  const backgroundColor = isUser ? '#1976D2' : 'black';
  const color = isUser ? 'white' : 'white';

  return (
    <div
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '16px',
        maxWidth: '70%',
        wordWrap: 'break-word',
      }}
    >
      <div
        style={{
          background: backgroundColor,
          color: color,
          padding: '12px',
          borderRadius: '12px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography>{content}</Typography>
      </div>
    </div>
  );
};

export default ChatInput;
