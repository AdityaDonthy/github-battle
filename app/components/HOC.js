const add = (x,y) => {
    return x+y;
}

add(2,2);

const addFive = (y, addReference) => {
    return addReference(y,5);
}

addFive(10,add);

const addTen = (y, addReference) => {
    return addReference(y,10);
}

addTen(20,add);

const makeAdder = (additive, addReference) => {
    return function(y) {
        return addReference(y,additive)
    }
}

addFifteen = makeAdder(15,add);
addFifteen(10);