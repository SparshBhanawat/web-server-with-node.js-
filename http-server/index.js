const { prototype } = require('events');
const http = require('http');

const PORT = 3000;

const server = http.createServer();

const friends = [
    {
        id:0,
        name:'elon musk',
    },
    {
        id:1,
        name:'mark zuckerberg',
    },
    {
        id:2,
        name:'sparsh bhanawat',
    }
]

server.on('request',(req,res)=>{
    const items = req.url.split('/');
    // /friends/2 => ['','friends','2']
    if(req.method === 'POST' && items[1] === 'friends'){
        req.on('data',(data)=>{
            const friend = data.toString(); 
            console.log(`request: ${friend}`);
            friends.push(JSON.parse(friend));
        });
        req.pipe(res);
    }else if(req.method === 'GET' && items[1] === 'friends'){
        // res.writeHead(200,{
        //     'Content-Type':'application/json',
        // });
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        if(items.length ===3 ){
            const friendIndex = Number(items[2]);
            res.end(JSON.stringify(friends[friendIndex]));
        }else{
            res.end(JSON.stringify(friends));
        }
    }else if(req.method === 'GET' && items[1] === 'messages'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>hello sparsh</li>');
        res.write('<li> what are your thoughts on astronomy?</li>');
        res.write('</html>');
        res.write('</body>');
        res.end();
    }else{
        res.statusCode = 404;
        res.end();  
    }
    
});

server.listen(PORT,()=>{
    console.log(`listening in port ${PORT}...`);
});


                                ////write in browser's console ////
// //fetch('http://localhost:3000/friends',{
//     method:'POST',
//     body: JSON.stringify({
//         id:3,
//         name:'grace hopper'})}).then(response => response.json()).then(friend => console.log(friend));
                                ////          end             ////