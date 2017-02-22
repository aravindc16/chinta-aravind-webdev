/**
 * Created by aravindchinta on 2/22/17.
 */
module.exports = function (app) {

    var websites = [
        { "_id": "1", "name": "Facebook",    "developerId": "4", "description": "This is the Facebook Website" },
        { "_id": "2", "name": "Twitter",     "developerId": "4", "description": "This is Twitter Website" },
        { "_id": "3", "name": "Gizmodo",     "developerId": "4", "description": "Yo, this is Gizmodo!" },
        { "_id": "4", "name": "Tic Tac Toe", "developerId": "1", "description": "Wanna play some games?" },
        { "_id": "5", "name": "Checkers",    "developerId": "1", "description": "Chinese checkers! :D" },
        { "_id": "6", "name": "Chess",       "developerId": "2", "description": "I am the king in this game" }
    ];

    app.get('/api/website/:websiteId', findWebsiteById);
    app.get('/api/user/:userId/website', findWebsiteByUser);
    app.post('/api/user/:userId/website', createWebsite);
    app.put('/api/website/:websiteId', updateWebsite);
    app.delete('/api/website/:websiteId', deleteWebsite);

    function deleteWebsite(req, res){
        var websiteId = req.params.websiteId;
        for(var w in websites){
            if(websites[w]._id == websiteId){
                websites.splice(w, 1);
                res.sendStatus(200);
            }
        }
    }

    function updateWebsite(req, res){
        var websiteId = req.params.websiteId;
        var website = req.body;
        for(var w in websites){
            if(websites[w]._id == websiteId){
                websites[w].name = website.name;
                websites[w].description = website.description;
                res.send(websites[w]);
                return;
            }
        }
    }

    function createWebsite(req, res){
        var userId = req.params.userId;
        var website = req.body;
        website.developerId = userId;
        website._id = (new Date()).getTime();
        websites.push(website);
        res.send(website);
    }

    function findWebsiteByUser(req, res){
        var userId = req.params.userId;
        var localWebsites = websites.filter(function(w){
            return w.developerId == userId;
        })
        res.send(localWebsites);
    }

    function findWebsiteById(req, res){
        var websiteId = req.params.websiteId;
        var website = websites.find(function (w){
            return w._id == websiteId;
        })

        res.send(website);
    }
}