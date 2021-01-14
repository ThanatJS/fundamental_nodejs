const first = () => {
    setTimeout(() => {
        console.log('first');
    }, 2000);
}
const second = () => {
    console.log('second');
}

first();
second();