class example_ctrl{

    async example_func(){
        let data = await require('./../model/example_model');
    
        return data;
    }
    
    async render(req,res){
        let data = await this.example_func();
        
        res.write("<h1> Your APP! </h1><h4>It is an example page.</h4> <p>Results: " + data.toString() + "</p>");
        res.end();
    }
}

let example = new example_ctrl;

module.exports = example;

