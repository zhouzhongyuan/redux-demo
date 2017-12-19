const addCounter = list => list.concat([0]);
const removeCounter = (list, index) => {

    return list
        .slice(0, index)
        .concat(list.slice(index + 1))
};
const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];

    deepFreeze(listBefore);
    expect(addCounter(listBefore)).toEqual(listAfter);
};

const testRemoveCouner = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];
    deepFreeze(listBefore);
    expect(removeCounter(listBefore, 1)).toEqual(listAfter);
};
testAddCounter();
testRemoveCouner();

console.log('All test passed.');
