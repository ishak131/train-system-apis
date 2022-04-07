const employee = require("../../BusinessLogic/Employee/Employee");
const express = require('express');
const employeeRouter = express.Router();

////////////////////////  create user account //////////////////////////////

employeeRouter.post("/new", employee.checkEmailAndPhoneAvailabilty, async(req, res) => {
    try {
        console.log(req.body);
        return employee.createModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});
/*
employeeRouter.put("/edit", employee.checkEmailAndPhoneAvailabilty, user.getDepartment, async(req, res) => {
    try {
        return employee.EditModel(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});
*/
employeeRouter.delete("/delete/:_ids", async(req, res) => {
    try {
        return employee.deleteModelsById(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

employeeRouter.get("/showOne/:_id", async(req, res) => {
    try {
        return employee.getOneModelById(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});


employeeRouter.get("/showMany/:limit", async(req, res) => {
    try {
        return employee.getManyEmployees(req, res);
    } catch (error) {
        return res.sendStatus(400);
    }
});

module.exports = employeeRouter;