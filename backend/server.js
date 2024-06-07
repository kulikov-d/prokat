require('dotenv').config();
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { Bot } = require('grammy');
const validator = require('validator');
const Filter = require('bad-words');

const app = express();
const port = 3001;
const filter = new Filter();

// Middleware для обработки CORS и JSON-запросов
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Настройка сервера для обслуживания статических файлов
app.use('/motorcycles_img', express.static(path.join(__dirname, '/data/motorcycles_img')));
app.use('/route_img', express.static(path.join(__dirname, '/data/route_img')));

// Telegram Bot
const bot = new Bot(process.env.BOT_API_KEY);
bot.command('start', async (ctx) => {
  await ctx.reply('Привет! Я - Бот Руслан🤖');
});

bot.start();

// Маршрут для обработки данных формы
app.post('/submit', (req, res) => {
  const { firstName, lastName, phone } = req.body;

  // Проверка на нецензурную лексику
  if (filter.isProfane(firstName) || filter.isProfane(lastName)) {
    res.status(400).send('Имя или фамилия содержат запрещенные слова.');
    return;
  }

  // Проверка номера телефона
  if (!validator.isMobilePhone(phone, 'any', { strictMode: true })) {
    res.status(400).send('Некорректный номер телефона.');
    return;
  }

  const message = `Новая заявка:\nИмя: ${firstName}\nФамилия: ${lastName}\nТелефон: <a href="tel:${phone}">${phone}</a>`;

  // Отправляем сообщение в Telegram-бот
  bot.api.sendMessage(process.env.CHAT_ID, message, { parse_mode: 'HTML' })
    .then(() => {
      res.status(200).send('Form submitted successfully');
    })
    .catch(error => {
      console.error('Error sending message to Telegram', error);
      res.status(500).send('Error submitting form');
    });
});


// Маршрут для получения данных о маршрутах
app.get('/routes', (req, res) => {
  const filePath = path.join(__dirname, '/data/route.json');
  console.log(`Reading file: ${filePath}`);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    try {
      const routes = JSON.parse(data);
      res.json(routes);
    } catch (jsonError) {
      console.error(`Error parsing JSON from file ${filePath}:`, jsonError);
      res.status(500).send('Ошибка сервера');
    }
  });
});

// Маршрут для получения данных о ценах
app.get('/prices', (req, res) => {
  const filePath = path.join(__dirname, '/data/prices.json');
  console.log(`Reading file: ${filePath}`);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    try {
      const prices = JSON.parse(data);
      res.json(prices);
    } catch (jsonError) {
      console.error(`Error parsing JSON from file ${filePath}:`, jsonError);
      res.status(500).send('Ошибка сервера');
    }
  });
});

// Маршрут для получения данных о мотоциклах
app.get('/motorcycles', (req, res) => {
  const filePath = path.join(__dirname, '/data/motorcycles.json');
  console.log(`Reading file: ${filePath}`);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      res.status(500).send('Ошибка сервера');
      return;
    }
    try {
      const motorcycles = JSON.parse(data);
      res.json(motorcycles);
    } catch (jsonError) {
      console.error(`Error parsing JSON from file ${filePath}:`, jsonError);
      res.status(500).send('Ошибка сервера');
    }
  });
});



app.listen(port, () => {
  console.log(`Сервер запущен на порте ${port}`);
});
