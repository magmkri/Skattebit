import {Transaction} from "../Transaction.js";

export function savePoloniexTransaction(data)
{

    //Poloniex:
    //0 Date
    //1 Market
    //2 Category
    //3 Type
    //4 Price
    //5 Amount
    //6 Total
    //7 Fee
    //8 Order Number
    //9 Base Total Less Fee
    //10 Quote Total Less Fee

    let transactions = [];
    data = data.split("\n");
    data = data.slice(1);
    while (data[data.length-1].length == 0)
    {
        data.splice(-1,1);
    }
    for (let index in data)
    {
        let lines = data[index].split(",");
        if (lines.length == 0)
        {
            continue;
        }
        if (lines == "Exchange")
        {
            let currencies = lines[1].split("/");
            let date = new Date(lines[0]);
            let type = lines[3]; //SELL/BUY
            if (type == "BUY")
            {
                let buyTransaction = new Transaction(currencies[0], lines[5], date, false, "Poloniex");
                let saleTransaction = new Transaction(currencies[1], lines[6], date, true, "Poloniex");
            }
            else
            {
                let buyTransaction = new Transaction(currencies[1], lines[6] , date, false, "Poloniex");
                let saleTransaction = new Transaction(currencies[0], lines[5], true, "Poloniex");
            }
        transactions.push(sellTransaction);
        transactions.push(buyTransaction);
        }
    //Transaction: name, quantity, date, isSale, site
    }
    return transactions;
}

