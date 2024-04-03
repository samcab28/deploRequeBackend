const { Router } = require('express');
const router = Router();

const { getAdmins, createAdmin, getAdminById, deleteAdmin, updateAdmin } = require('../controllers/Admin.controllers');

router.route('/')
    .get(getAdmins)
    //.get(getAdminsId)
    .post(createAdmin);

// En la ruta correspondiente
router.get('/ids', async (req, res) => {
    try {
        const adminIds = await adminCtrl.getAdminIds();
        res.json(adminIds);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get admin IDs', error: error.message });
    }
});

router.route('/:id')
    .get(getAdminById)
    .put(updateAdmin)
    .delete(deleteAdmin);

module.exports = router;
