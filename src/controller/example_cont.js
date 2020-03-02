class example_cont{

    example_func(req){
        let data = require('../model/example_model')(req.query.name);
    
        return data;
    }
    
    async render(req,res){
        let data = await this.example_func(req);
        res.write("<h1> WEB APP! </h1><h4>It is an example page.</h4> <p>Results: " + data.toString() + "</p>");
        res.end();

    }
}

let example = new example_cont;

module.exports = example;

