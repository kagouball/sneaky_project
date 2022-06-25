module.exports = {
    isOnFood
}

function isOnFood(food, coordinate)
{
    if(food[0] === coordinate[0] && food[1] === coordinate[1]){
        return true;
    }
    return false;
}