const Admin = require('../models/AdminModel');

const adminCtrl = {};

adminCtrl.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get admins prueba prueba', error: error.message });
    }
};
//----------------------------------------------
adminCtrl.getAdminIds = async () => {
    try {
        const admins = await Admin.find().select('_id');
        return admins.map(admin => admin._id);
    } catch (error) {
        throw new Error('Failed to get admin IDs');
    }
};
//----------------------------------------------
adminCtrl.getAdminById = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid Admin ID' });
        }
        res.status(500).json({ message: 'Failed to get admin', error: error.message });
    }
};

adminCtrl.createAdmin = async (req, res) => {
    const { nombre, cedula, correo, password, departamento, telefono, estado } = req.body;
    const newAdmin = new Admin({ nombre, cedula, correo, password, departamento, telefono, estado });

    try {
        await newAdmin.save();
        res.json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create admin', error: error.message });
    }
};

adminCtrl.deleteAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findByIdAndDelete(id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete admin', error: error.message });
    }
};

adminCtrl.updateAdmin = async (req, res) => {
    const { id } = req.params;
    const { nombre, cedula, correo, password, departamento, telefono, estado } = req.body;

    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(id, { nombre, cedula, correo, password, departamento, telefono, estado }, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({ message: 'Admin updated successfully', admin: updatedAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update admin', error: error.message });
    }
};

module.exports = adminCtrl;