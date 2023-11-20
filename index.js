const fetch = require('node-fetch');
const express = require('express')

const PORT = 9001
const app = express()
app.use(express.json());

// Setup headers CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Acces to any origin
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.post("/clean-uri", (req, res) => {
    const cleanUriUrl = "https://cleanuri.com/api/v1/shorten";
  
    fetch(cleanUriUrl, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    })
        .then((response) => response.json())
        .then((result) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.json(result);
        })
        .catch((error) => {
            console.error("Error requesting cleanuri.com:", error);
            res.status(500).json({ error: "Intermediate server error" });
        });
});


app.get('/', (req, res) => {
    res.json(
        { 
            name: 'Sever to avoid cors of CleanURI', 
            author: 'eliandev',
            url: '/clean-uri',
            method: 'POST'
        })
})

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`))
