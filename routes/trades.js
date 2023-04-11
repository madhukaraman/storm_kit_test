const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');

let trades = []

// router.get('/', verify, (req,res)=>{
//     res.send(trades);
// });

router.get('/:id', verify,(req, res) => {
    const { id } = req.params;
    const foundTrade = trades.find((trade) => trade.id == id);
    if(foundTrade){
        res.send(foundTrade);
    }
    else {
        res.status(404).send("Not Found");
    }
});

router.get('*', verify,(req, res)=> {
    if(Object.keys(req.query).length === 0){
        res.send(trades);
    }
    else{
        const filtered = trades.filter(a => a.type == req.query.type & a.user_id == req.query.user_id);
        res.send(filtered);
    }
});

router.post('/', verify, (req,res)=>{
    const trade = req.body;
    if (!(trade.type && trade.user_id && trade.symbol && trade.shares && trade.price)) {
        res.status(400).send("All input is required");
      }
    else if(!(trade.shares>1 && trade.shares<101)){
        res.status(400).send("Range issue");   
    }
    else if(!(trade.type=="buy" || trade.type=="sell")){
        res.status(400).send("Check the trade type");   
    }
    else{
        trades.push(trade);
        trades.forEach((myId, index) => {
            myId.id = index + 1;
        });
        trades.forEach((date) => {
            date.timestamp = Date.now();
        });     
        res.status(201).send(`Trade with the name ${trade.symbol} added to the database.`);
    }

});

router.delete('/:id', verify, (req,res) => {
    res.status(405).send("Not Allowed");
})

router.put('/:id', verify, (req,res) => {
    res.status(405).send("Not Allowed");
})

router.patch('/:id', verify, (req,res) => {
    res.status(405).send("Not Allowed");
})

module.exports = router;