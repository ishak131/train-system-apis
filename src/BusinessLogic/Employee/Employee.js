const BasicOperation = require('../BasicOperation/BasicOperation');

const EmployeeModel = require("../../MongoSchema/Employee/employeeModel");

class Employee extends BasicOperation {
    constructor(Model) {
        super(Model)
        this.checkEmailAndPhoneAvailabilty = this.checkEmailAndPhoneAvailabilty.bind(this)
    }

    async checkEmailAndPhoneAvailabilty(req, res, next) {
        const { _id, email, phone_number, nationalIdNumber, } = req.body;
        const employeeExist = await this.Model.findOne({ _id: { $ne: _id }, $or: [{ email }, { phone_number }, { nationalIdNumber }] });
        console.log(employeeExist);
        if (employeeExist && employeeExist._id !== _id) {
            res.sendStatus(406);
        } else
            next();
    }
    async getManyEmployees(req, res) {
        const { limit } = req.params;
        const { department } = req.body;
        const getEmployees = await this.Model.find((department ? { department: department } : { _id: { $ne: null } })).limit(parseInt(limit));
        const result = getEmployees.map((element) => {
            const { _id, firstName, lastName, jobTitle, personalPicture } = element;
            return { _id, firstName, lastName, jobTitle, personalPicture };
        });
        return res.json({ result });
    }

}

const employee = new Employee(EmployeeModel);
module.exports = employee;