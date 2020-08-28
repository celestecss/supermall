arr.sort((x, y) => {
    for(let i=3;i<arr.length;i--){
        if(i>=0){
            this.arr[0]=arr[i];
        }
    }
});
console.log(arr); // [1, 2, 10, 20]