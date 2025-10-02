const express = require('express');
const {schedule, getByBusinessId, getByClientId, getByEmployeeId} = require('../../controller/scheduleController');

const router = express.Router();

router.post('/', schedule);
router.get('/get_schedule_by_business_id', getByBusinessId);
router.get('/get_schedule_by_client_id', getByClientId);
router.get('/get_schedule_by_employee_id', getByEmployeeId);

module.exports = {router};