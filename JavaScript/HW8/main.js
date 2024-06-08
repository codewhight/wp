const main = document.querySelector('main')

let key = "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"

async function groqChat(q,language) 
{
    try
    {
        const jsonResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", 
            {
                body: JSON.stringify({
                    "model": "llama3-8b-8192",
                    "messages": [{"role": "user", "content": "How to say "+ q + " in " + language}],
                    "temperature": 0.7
                }),
                method: 'POST',
                headers: 
                {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${key}`,
                }
            })
            const jsonData = await jsonResponse.json()
            console.log(JSON.stringify(jsonData, null, 2))
            return jsonData.choices[0].message.content
    }
    catch(error)
    {
        console.error("Error:",error);
        return "請求失敗,請稍後再試";
    }
    
}


async function chat() 
{
    let menu = document.getElementById('menu')
    let language = menu.value
    let qNode = document.querySelector('#question')
    let responseNode = document.querySelector('#response')
    responseNode.innerText = '翻譯中，請稍等幾秒鐘 ...'
    let answer = await groqChat(qNode.value,language)
    responseNode.innerText = answer
}
