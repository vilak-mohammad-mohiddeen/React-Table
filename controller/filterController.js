const UcarModel=require('../model/userCarModel');
const userModel=require('../model/userModel');
exports.getFilteredUsers = async (req, res) => {
    const users= await UcarModel.find({}).lean();
    
    const searchString = req.query.search;
    
    const reducedData = users.filter(currentObject =>
        Object.values(currentObject).some(value =>
            typeof value === 'string' && value.toLowerCase().includes(searchString.toLowerCase())
        )
    );
    
    
    // console.log(reducedData);
    
    res.json(reducedData);
};

exports.getFilteredUsers2 = async (req, res) => {
  const searchString = req.query.search;
  const my_pipeline=[
    {
        $lookup : {
            from : 'cars',
            localField:'userId',
            foreignField:'userId',
            as:'Car_Details'
        }
    },
    {
        $unwind: {
          path: '$Car_Details',
          preserveNullAndEmptyArrays: true
        }
    },
    
    {
        $match : {
            $or : [
                {
                    "full_name": {
                        $regex : searchString,
                        $options:'i'
                    }
                },
                {
                    "address": {
                        $regex : searchString,
                        $options:'i'
                    }
                },
                {
                    "email": {
                        $regex : searchString,
                        $options:'i'
                    }
                },
                {
                    "gender": {
                        $regex : searchString,
                        $options:'i'
                    }
                },
                {
                    "company": {
                        $regex : searchString,
                        $options:'i'
                    }
                },
                {
                    "pricing": {
                        $regex : searchString,
                        $options:'i'
                    }
                },{
                    "Car_Details.car_model": {
                        $regex : searchString,
                        $options:'i'
                    }
                },
                {
                    "Car_Details.car_make": {
                        $regex : searchString,
                        $options:'i'
                    }
                }
            ]
        }
    },{
        $project: {
            full_name:"$full_name",
            mail:"$email",
            gender: "$gender",
            phone_number:"$phone_number",
            address:"$address",
            bank_balance:"$bank_balance",
            credit_card:"$credit_card",
            car_model:"$Car_Details.car_model",
            company:"$Car_Details.car_make",
            pricing:"$pricing"
        }
    }
];
  
//   try {
//     const users = await UcarModel.aggregate(pipeline).exec();
//     console.log(users);
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: "Internal Server Error" });
//   }
    try{
        const users = await userModel.aggregate(my_pipeline).exec();
        console.log(users);
        res.json(users);
    }catch(err){
        console.log(err);
        res.status(500).send({message:"Internal Server Error"});
    }
};
