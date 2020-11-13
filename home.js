const express=require("express");
const app=express();
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/home.html");
});

app.post("/",function(req,res){
    const email=req.body.useremail;
    // const password=req.body.userpassword;

    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                // password:"password"    
            }
        ]
    }
    const jsondata=JSON.stringify(data);
    const url="https://us2.api.mailchimp.com/3.0/lists/4b6c57615d";

    const options={
        method:"POST",
        auth:"Roshan:423838340b06fcf6fedc9894fbeffd8f-us2"
    }

    const request=https.request(url,options,function(response){
        if (response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsondata);
    request.end();
    

});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Yeah! it's working");
});
