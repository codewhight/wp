function matrixAdd(m1, m2)
{
    if(m1.length != m2.length)
        console.log("Vectors must be of the same length");
    else
    {
        let mNew = [];
        for(let i = 0;i < m1.length;i++)
            mNew.push(m1[i] + m2[i]); 
        return mNew;
    }
}
