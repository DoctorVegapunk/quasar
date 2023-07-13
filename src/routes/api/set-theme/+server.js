export async function POST(event) {
    const {theme} = await event.request.json()
    
    return new Response(JSON.stringify({ success: true }),{
            headers: {
                'set-cookie': `theme=${theme}; Path=/; HttpOnly`
            },
            body: {
                success: true
            }
        }
    )
    
}
