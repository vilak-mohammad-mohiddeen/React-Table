const userData=require('./users.json');
const carData=require('./CarsMer.json');
const fs = require('fs');

const finalData = userData.map((user) => {
    const car = carData.find(car => user.full_name === car.full_name && user.mail === car.mail);
    return { 
        ...user, 
        "car_model": car ? car.car_model : null,
        "company": car ? car.company : null,
        "pricing": car ? car.pricing : null 
    };
});

const jsonString = JSON.stringify(finalData, null, 2);

fs.writeFile('finalData.json', jsonString, (err) => {
    if (err) {
        console.error('Error writing to file', err);
    } else {
        console.log('Successfully wrote to finalData.json');
    }
});
