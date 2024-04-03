const AdminModel = require('../models/AdminModel');
const ColabModel = require('../models/ColaboradorModel');


const LoginCtrl = {};

LoginCtrl.isAdmin = async (req, res) => {
    const { nombre } = req.body; // Suponiendo que el nombre de usuario se envía en el cuerpo de la solicitud

    try {
        // Verificar si el usuario específico es un administrador
        const admin = await AdminModel.findOne({ nombre });
        // Devolver true si se encuentra el administrador, false si no
        const isAdmin = admin;
        
        // Verifica el valor de isAdmin y llama a la función de autenticación correspondiente
        if (isAdmin) {
            return true 
        } else {
            return false 
        }
    } catch (error) {
        console.error('Error al verificar si el usuario es admin:', error);
        res.status(500).json({ message: 'Error al verificar si el usuario es admin' });
    }
};

LoginCtrl.loginAdmin = async (req, res) => {
    const { nombre, password } = req.body;

    try {
        const admin = await AdminModel.findOne({ nombre }); 
        if (admin && admin.password === password) {
            const data = {
                nombre: admin.nombre,
                password: admin.password,
                role: 'admin',
                id: admin._id // Agrega el ID del usuario al objeto de respuesta
            };
            // Devolver la información como respuesta JSON
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error en el login de administrador:', error);
        return null;
    }
};

LoginCtrl.loginColab = async (req, res) => {
    const { nombre, password } = req.body;

    try {
        const colab = await ColabModel.findOne({ nombre }); 
        if (colab && colab.password === password) {
            const data = {
                nombre: colab.nombre,
                password: colab.password,
                role: 'usuario',
                id: colab._id // Agrega el ID del usuario al objeto de respuesta
            };
            // Devolver la información como respuesta JSON
            return data; 
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error en el login de colaborador:', error);
        return null;
    }
};
// Función para obtener el ID del usuario administrador
LoginCtrl.getIdAdmin = async (req, res) => {
    const { nombre } = req.body;
    try {
        const admin = await AdminModel.findOne({ nombre });
        if (admin) {
            console.log("ID administrador recientemente logeado:", admin._id.toString());
            return admin._id.toString(); // Devolver el ID del usuario administrador
        } else {
            res.status(404).json({ message: 'Usuario administrador no encontrado' }); // Devolver una respuesta si el usuario no se encuentra
            return null; // Devolver null si no se encuentra el usuario administrador
        }
    } catch (error) {
        console.error('Error al obtener el ID del usuario administrador:', error);
        res.status(500).json({ message: 'Error al obtener el ID del usuario administrador' }); // Devolver una respuesta si hay un error
        return null;
    }
};

LoginCtrl.getIdColab = async (req, res) => {
    const { nombre } = req.body;

    try {
        const colab = await ColabModel.findOne({ nombre });
        if (colab) {
            console.log("ID colaborador recientemente logeado:", colab._id.toString());
            return colab._id.toString(); // Devolver el ID del usuario colaborador
        } else {
            res.status(404).json({ message: 'Usuario colaborador no encontrado' }); // Devolver una respuesta si el usuario no se encuentra
            return null; // Devolver null si no se encuentra el usuario colaborador
        }
    } catch (error) {
        console.error('Error al obtener el ID del usuario colaborador:', error);
        res.status(500).json({ message: 'Error al obtener el ID del usuario colaborador' }); // Devolver una respuesta si hay un error
        return null;
    }
};
//------------------------------------------------------------


module.exports = LoginCtrl;