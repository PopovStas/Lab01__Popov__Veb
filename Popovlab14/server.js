const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname));

// Головна сторінка (наприклад, може вести на перше завдання)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'PopovLab14-1.htm'));
});

// Окремі роути для наших сторінок
app.get('/task1', (req, res) => {
    res.sendFile(path.join(__dirname, 'PopovLab14-1.htm'));
});

app.get('/task2', (req, res) => {
    res.sendFile(path.join(__dirname, 'PopovLab14-2.htm'));
});

// Запуск сервера на порту 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущено! Відкрий http://localhost:${PORT}`);
});