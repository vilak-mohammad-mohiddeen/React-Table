
const UcarModel=require('../model/userCarModel');

exports.getUserById=async (req,res)=>{
    const user= await UcarModel.findById(req.params.id);
    res.json(user);
}

exports.getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page); 
        const limit = parseInt(req.query.limit); 
        const skip = (page )  * limit;
        console.log(page,limit);
        const allUsers = await UcarModel.find({}).skip(skip).limit(limit);
        const total=await UcarModel.find().countDocuments();
        
        console.log(total);
        res.json({data:allUsers,
            totalUsers:total,
            currentPage: page
    });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};



