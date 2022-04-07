const Edit = require('../Edit/Edit');
const bcrypt = require('bcryptjs');
const EmployeeModel = require("../../MongoSchema/Employee/employeeModel");

class Employee extends Edit {
    constructor(Model) {
        super(Model)
        this.checkEmailAndPhoneAvailabilty = this.checkEmailAndPhoneAvailabilty.bind(this)
    }

    async bcryptPassword(req, res, next) {
        try {
            const { password } = req.body;
            if (password.length >= 8) {
                const hashPassword = await bcrypt.hashSync(password, 10);
                req.body.password = hashPassword;
                return next();
            } else
                res.status(406).send("Invalid Password");
        } catch (error) {
            res.sendStatus(400);

        }
    }

    async checkEmailAndPhoneAvailabilty(req, res, next) {
        const { _id, email, phone_number, nationalIdNumber, } = req.body;
        const employeeExist = await this.Model.findOne({ _id: { $ne: _id }, $or: [{ email }, { phone_number }, { nationalIdNumber }] });
        if (employeeExist && employeeExist._id !== _id) {
            res.status(406).send("This Email , phone or nationalIdNumber Is already Exist");
        } else
            next();
    }
    async getManyEmployees(req, res) {
        const { limit } = req.params;
        const getEmployees = await this.Model.find().limit(parseInt(limit));
        const result = getEmployees.map((element) => {
            const { _id, firstName, lastName, jobTitle, personalPicture } = element;
            return { _id, firstName, lastName, jobTitle, personalPicture };
        });
        return res.json({ result });
    }

}

const employee = new Employee(EmployeeModel);
module.exports = employee;