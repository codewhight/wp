import { DB } from "https://deno.land/x/sqlite/mod.ts"; //從 deno ./sqlite/mod.ts 導入 DB
import { oFetch } from "./lib.js"
//(這塊程式碼使用chatgpt)
export async function sqlHandler(ctx) {
    const body = ctx.request.body(); // content type automatically detected
    console.log('body = ', body)
    if (body.type === "json") {
        let json = await body.value  //等待解析
        console.log('json=', json)
        let db = json.db // 提取資料庫名稱 
        let sql = json.sql // 提取SQL查詢語句（sql）
        const dbo = new DB(`db/${db}.db`) //使用提取的數據庫名稱（db）創建一個新的數據庫連接對象（DB對象）。
        let result = sql ? dbo.query(sql) : '[]' //檢查 sql 是否存在 存在則執行 dbo.query(sql) 來執行SQL查詢，不存在（則將 result 設置為一個空數組（'[]'）。
        dbo.close() //關閉
        ctx.response.body = result //更新
    }
}

export async function fetchHandler(ctx) {
    const body = ctx.request.body(); // content type automatically detected
    console.log('body = ', body)
    if (body.type === "json") {
        let json = await body.value 
        console.log('json=', json)
        let result = await oFetch(json) // 呼叫oFetch(json) 並等待
        console.log('result=', result)
        ctx.response.body = result //更新
    }
}

export async function uploadHandler(ctx) {
    const body = await ctx.request.body({ type: 'form-data' }) / 等待解析表單數據
    const data = await body.value.read() //讀取
    console.log(data)//輸出
    console.log("fields=", data.fields)
    let r = []
    //(這塊程式碼使用chatgpt)
    for (let f of data.files) {
        console.log("filename=", f.filename)
        console.log("originalName=", f.originalName)
        await Deno.copyFile(f.filename, `./upload/${f.originalName}`) // 將文件從臨時位置移動到指定的上傳目錄
        await Deno.remove(f.filename) // 刪除臨時文件
        r.push({file:f.originalName}) // 將上傳成功的文件名添加到結果數組中
    }
    ctx.response.body = r // 設置HTTP回應的主體為上傳成功的文件名數組
}
