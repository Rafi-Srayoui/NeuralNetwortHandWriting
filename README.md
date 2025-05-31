# Neural Letter Trainer 🧠✍️

## 🧾 Overview

**Neural Letter Trainer** is a browser-based educational project that simulates a basic neural network to **recognize hand-drawn characters** on a 200x200 canvas. The system allows users to train a character by drawing it multiple times, and then test the system's ability to recognize future inputs.

This project demonstrates one of the earliest ideas behind neural networks — pattern recognition via **grid-based weight matrices** — implemented in **vanilla JavaScript** without external libraries.

---

## 🛠️ Features

- 🎨 Freehand drawing on canvas
- 🧠 Letter training with grid-based neural recognition
- ✅ Requires 3 training samples per letter
- 🔁 Guess correction system: fix wrong guesses by re-training
- 🧮 Basic weight matrix logic (not ML libraries)

---

## 🚀 How It Works

1. **Training Phase**
   - Enter a letter in the "Letter to train for" textbox
   - Draw that letter on the canvas
   - Press **"Train pattern"**
   - Repeat until the same letter has been drawn 3 times

2. **Guessing Phase**
   - Draw a new letter on the canvas
   - Press **"Guess Letter"**
   - The system will log its guess in the browser console

3. **Correction Phase**
   - If the guess is incorrect, enter the correct letter in the "Enter supposed Letter" box
   - Press **"Correct Output!"**
   - The system will adjust its weights until it correctly guesses the drawn input

---

## 🖱️ UI Layout

| Element                    | Description                              |
|----------------------------|------------------------------------------|
| Canvas                     | 200x200 grid for drawing letters         |
| Train Pattern Button       | Trains the neural net with input letter  |
| Guess Letter Button        | Predicts the current drawing             |
| Correct Output Button      | Fixes incorrect predictions              |
| Console                    | Displays guesses and correction status   |

---

## Screenshots
![image](https://github.com/user-attachments/assets/94323c9a-1ded-49f6-8cc0-c32d541493a1)
![image](https://github.com/user-attachments/assets/8548120d-42e2-48cf-b0d9-27e506a15d04)
![image](https://github.com/user-attachments/assets/d3603994-8d32-4310-94f2-0a3fdb33da35)
![image](https://github.com/user-attachments/assets/f0c3743f-39a1-4e46-9cb7-953d18fea302)
![image](https://github.com/user-attachments/assets/4b2262ec-6e7c-4504-8bc0-9d465c7544c3)
![image](https://github.com/user-attachments/assets/da34d78c-a85b-4885-80e3-aaa9f1449c9a)





