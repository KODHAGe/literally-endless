export async function generateContent(data, chat, msg) {
    const response = await fetch('/api/generate/attributes', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    msg.messages.push({"role": "assistant", "content": await response.text()})
    console.log("msg 3")
    console.log(msg.messages)
    chat.set({
        messages: msg.messages
    })
}

export function promptFormatter(prompt) {
    return {"role": "user", "content": prompt}
}