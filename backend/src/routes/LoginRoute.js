//LoginRoute.js
const { Router } = require('express');
const router = Router();
let id;
const { loginAdmin, loginColab, isAdmin, getIdAdmin, getIdColab } = require('../controllers/Login.controllers');

router.route('/')
    .post(async (req, res) => {
        try {
            // Verifica si el usuario es administrador
            const isAdminResult = await isAdmin(req, res);

            if (isAdminResult) {
                // Si el usuario es administrador, intenta hacer login como administrador
                const loginResult = await loginAdmin(req, res);
                if (loginResult) {
                    // Si el login como administrador tiene éxito, obtén el ID del usuario administrador
                    const userId = await getIdAdmin(req, res);
                    id = userId;
                    loginResult.userId = userId; // Agrega el ID del usuario a los resultados del login
                }
                res.json(loginResult);
            } else {
                // Si el usuario no es administrador, intenta hacer login como colaborador
                const loginResult = await loginColab(req, res);
                if (loginResult) {
                    // Si el login como administrador tiene éxito, obtén el ID del usuario colaborador
                    const userId = await getIdColab(req, res);
                    id = userId;
                    loginResult.userId = userId; // Agrega el ID del usuario a los resultados del login
                }
                res.json(loginResult);
            }
        } catch (error) {
            console.error('Error al verificar el usuario', error);
            res.status(500).json({ message: 'Error al verificar el usuario' });
        }
});


module.exports = router;