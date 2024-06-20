// (使用chatgpt)  function oFetch() 用於發起網路請求（HTTP fetch）'o' 含發起網路請求所需的各種資訊，如URL、HTTP方法、主體內容、標頭等
export async function oFetch(o) {// o ==json
    let r = await fetch(o.url, {
        body: o.method == 'GET'?undefined:o.body,
        //如果 o.method 為 'GET'，則設置 body 為 undefined 否則，使用 o.body 作為請求的主體。
        method: o.method || 'GET', // o.method 未定義 用'GET'
        headers: o.headers || {}, // o.headers 未定義 用{}
    })
    if (!r.ok) {
        console.log('webFetch:error! o=', o, 'r=', r)
        return null //失敗回傳 null
    }
    let text = await r.text()
    return text // 成功回傳 text
  }
  
