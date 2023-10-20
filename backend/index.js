const express = require('express');
const app = express();
require('dotenv').config();
const apiKey = process.env.API_KEY; 

app.use(express.json());
app.listen(3333, () => console.log('Server running on port 3000'));

const cors = require('cors');
app.use(cors());
app.options('*', cors());

const {Configuration, OpenAI} = require('openai')

const config = new Configuration ({
  apiKey: apiKey,
})

// GET DE TESTE
app.get('/api/call', (request,response) => {
  return response.send({'message': 'Hello World'});
});


app.post('/api/call', async (req, res) =>{

const runPrompt = async () =>{
    const response = await OpenAI.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.prompt,
        max_tokens: 200,
        temperature: 0,
      });
      return response.data;
};

const responseFromAPI = await runPrompt();

console.log(responseFromAPI.choices[0].text);
res.send(responseFromAPI.choices[0].text);

} );
