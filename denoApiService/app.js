//(這塊程式碼使用chatgpt) 導入函式
import { Application, Router} from "https://deno.land/x/oak/mod.ts"; // 從 deno ./oak/mod.ts 導入 Application, RouterOak oak是 Deno HTTP 服務器的中間框架
import { oakCors } from "https://deno.land/x/cors/mod.ts"; //從 deno ./cors/mod.ts 導入 oakCors oakCors是用來啟用 CORS（跨域資源共享）的中間件
import { sqlHandler, fetchHandler, uploadHandler } from './handler.js'

const app = new Application()//建立新的app
const router = new Router()//建立新的路由
//設置路由
router.post('/fetch', fetchHandler)
router.post('/sqlite', sqlHandler)
router.post('/upload', uploadHandler)

app.use(oakCors()); // Enable CORS for All Rou , 啟用oakCors
app.use(router.routes()) // (使用chatgpt) 使用router的路由
app.use(router.allowedMethods()) // (使用chatgpt) 使用路由器允許的方法
// (這塊程式碼使用chatgpt) 啟動伺服器
console.log('Server run at http://127.0.0.1:6789')// 監聽伺服器回傳資料
await app.listen({ port: 6789 }) // 在端口 6789 上啟動伺服器
