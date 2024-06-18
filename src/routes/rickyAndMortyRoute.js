const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    // Obtenemos los datos de la API de Ricky and Morty
    fetch("https://rickandmortyapi.com/api/character")
    .then(response => response.json())
    .then(data => {
        // Devolvemos los datos
        res.json(data.results)
    })
    .catch(error => {
        res.status(500).json({ error: "Error al obtener los datos de la API" })
        console.error(error)
    })
})


module.exports = router