const carModel = require("../model/carModel");
const userModel = require("../model/userModel")


exports.getUserCarData= async (req,res)=>{
    const pageNumber=Number(req.query.index);
    const pageSize =Number(req.query.limit);
    const skip= pageNumber*pageSize;
    const users= await userModel.find({}).skip(skip).limit(pageSize).lean();
    const cars= await carModel.find({}).lean();
    const carMap=new Map();
    cars.map(car=>carMap.set(car.user_id,car));

    const totalNumberofUsers= await userModel.countDocuments();
    const combinedData= users.map(user=>{
        const car=carMap.get(user.id);
        return {...user,...car};
    })
    // console.log(combinedData);
    res.status(200).json({data: combinedData , pageCount:Math.ceil(totalNumberofUsers/pageSize),totalRecords:totalNumberofUsers});
}

exports.getFilteredUserCarData = async(req,res)=>{
    const searchString = req.query.search;
    try {
        const users = await userModel.find({}).lean();
        const cars = await carModel.find({}).lean();

        const carMap= new Map();
        cars.map(car=> carMap.set(car.userId,car));


        const usersWithCars = users.map(user => {
            const car = carMap.get(user.userId) || {};
            return { ...user, ...car };
        });

        const filteredData = usersWithCars.filter(obj => {
            return Object.values(obj).some(value => value && value.toString().toLowerCase().includes(searchString.toLowerCase()));
        });
        
        res.json({data:filteredData});
    } catch (err) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}