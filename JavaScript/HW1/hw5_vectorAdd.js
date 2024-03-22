function vectorAdd(vector1, vector2)
{
    if(vector1.length != vector2.length)
        console.log("Vectors must be of the same length");
    else
    {
        let vectorNew = [];
        for(let i = 0;i < vector1.length;i++)
            vectorNew.push(vector1[i] + vector2[i]); 
        return vectorNew;
    }
       

}
var v1 = [2,4], v2 = [3,6], v3 = [];
v3 = vectorAdd(v1,v2)
console.log('vectorAdd',v3); 
