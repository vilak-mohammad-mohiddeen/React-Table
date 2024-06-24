const UcarModel=require('../model/userCarModel');

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
