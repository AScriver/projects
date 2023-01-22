var friends = require("../data/friends.js");
module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var newFriend = {
            name: "",
            photo: "",
            scoreDifference: 500
        };

        // Get and parse user information
        var userData = req.body;
        var userScores = userData.scores;

        var totalDifference = 0;

        for (let i = 0; i < friends.length; i++) { // Loop through friends
            console.log(friends[i].name);
            totalDifference = 0;

            // loop through scores of each friends, since they're in a separate array.
            for (let j = 0; i < friends[i].scores[j]; j++) {
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                if (totalDifference <= newFriend.scoreDifference) {

                    newFriend.name = friends[i].name;
                    newFriend.photo = friends[i].photo;
                    newFriend.scoreDifference = totalDifference;

                }
            }
        }

        friends.push(userData);
        res.json(newFriend);

    });
}