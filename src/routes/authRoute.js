const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { login, register } = require('../services/authService');

const router = express.Router();
const saltRounds = 10;
const secretKey = 'secret';



router.post('/login', (req, res) => {
    try {
        // Obtenemos los datos de la request
        const { username, password } = req.body;

        // Comprobamos que los datos no estan vacios
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Obtenemos los datos de la base de datos
        login(username).then(rows => {
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Username not found' });
            } else {
                // Si se ha encontrado un usuario con el username introducido
                // Comprobamos que la contrasenya sea correcta
                const user  = rows[0];
                bcrypt.compare(password, user.password, function (err, result) {
                    if (result) {
                        // Si la contrasenya es correcta, generamos un token
                        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
                        res.json({ token });
                    } else {
                        res.status(401).json({ error: 'Incorrect password' });
                    }
                })
            }
        }).catch(error => console.log(error));
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/register', (req, res) => {
    try {
        // Obtenemos los datos de la request
        let { username, password } = req.body;

        // Comprobamos que los datos no estan vacios
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        bcrypt.hash(password, saltRounds, function (err, hash) {
            // Guardamos en la base de datos
            register(username, hash).then(rows => {
                if (rows.affectedRows === 1) {
                    res.status(201).json({ message: 'User created successfully' });
                }
            }).catch(error => {
                if (error.code === 'ER_DUP_ENTRY') {
                    res.status(409).json({ error: 'Username already exists' });
                }
            });
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router;