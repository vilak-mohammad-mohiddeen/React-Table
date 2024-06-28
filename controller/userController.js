
const UcarModel = require('../model/userCarModel');
const userModel = require('../model/userModel');
exports.getUserById = async (req, res) => {
    const user = await UcarModel.findById(req.params.id);
    res.json(user);
}

exports.getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page) * limit;
        console.log(page, limit);
        const allUsers = await UcarModel.find({}).skip(skip).limit(limit);
        const total = await UcarModel.find().countDocuments();

        console.log(allUsers);
        res.json({
            data: allUsers,
            totalUsers: total,
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });

    }
};

exports.getAllUsers2 = async (req, res) => {
    const page = parseInt(req.query.page) || 0; 
    const limit = parseInt(req.query.limit) || 10; 

    const my_pipeline = [
        {
            $lookup: {
                from: 'cars',
                localField: 'userId',
                foreignField: 'userId',
                as: 'Car_Details'
            }
        },
        {
            $unwind: {
                path: '$Car_Details',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                full_name: "$full_name",
                mail: "$email",
                gender: "$gender",
                phone_number: "$phone_number",
                address: "$address",
                bank_balance: "$bank_balance",
                credit_card: "$credit_card",
                car_model: "$Car_Details.car_model",
                company: "$Car_Details.car_make",
                pricing: "$pricing"
            }
        },
        {
            $skip: page * limit
        },
        {
            $limit: limit
        }
    ];

    try {
        const users = await userModel.aggregate(my_pipeline).exec();
        const total = await userModel.countDocuments();

        res.json({
            data: users,
            totalUsers: total,
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}




