//hw8
function matrixMul(A,B)
{
    let sum = [];
    for(let i = 0;i < 2;i++)
    {
        sum[i] = [];
        for(let j = 0;j < 2;j++)
        {
            sum[i][j] = 0;
            for(let k = 0;k < 2;k++)
            {
                sum[i][j] += A[i][k] * B[k][j];
            }
        }

    }
    return sum;
}

var a1 =[[1,2],[3,4]], a2 = [[5,6],[7,8]];
console.log(matrixMul(a1,a2));

